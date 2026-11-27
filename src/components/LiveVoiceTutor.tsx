import React, { useCallback, useEffect, useRef, useState } from "react";
import { Mic, MicOff, PhoneOff, Radio, X, AlertCircle } from "lucide-react";
import { Language, UI_COPY } from "../i18n/translations";
import { TutorRoleId } from "../services/midadApi";

interface VoiceTurn {
  id: string;
  speaker: "user" | "model";
  text: string;
}

interface LiveVoiceTutorProps {
  language: Language;
  selectedCourseTitle: string;
  tutorRole: TutorRoleId;
  onClose: () => void;
}

function pcmFloat32ToBase64(float32: Float32Array): string {
  const int16 = new Int16Array(float32.length);
  for (let i = 0; i < float32.length; i++) {
    const clamped = Math.max(-1, Math.min(1, float32[i]));
    int16[i] = clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff;
  }
  const bytes = new Uint8Array(int16.buffer);
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

function decodeBase64Pcm24k(base64: string, ctx: AudioContext): AudioBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  const sampleCount = Math.floor(bytes.byteLength / 2);
  const int16 = new Int16Array(bytes.buffer, bytes.byteOffset, sampleCount);
  const float32 = new Float32Array(sampleCount);
  for (let i = 0; i < sampleCount; i++) {
    float32[i] = int16[i] / 32768;
  }
  const audioBuffer = ctx.createBuffer(1, sampleCount, 24000);
  audioBuffer.copyToChannel(float32, 0);
  return audioBuffer;
}

export const LiveVoiceTutor: React.FC<LiveVoiceTutorProps> = ({
  language,
  selectedCourseTitle,
  tutorRole,
  onClose,
}) => {
  const [status, setStatus] = useState<"idle" | "connecting" | "live">("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [turns, setTurns] = useState<VoiceTurn[]>([]);

  const wsRef = useRef<WebSocket | null>(null);
  const inputCtxRef = useRef<AudioContext | null>(null);
  const outputCtxRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const activeSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef<number>(0);
  const isMutedRef = useRef<boolean>(false);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [turns]);

  const stopPlaybackQueue = useCallback(() => {
    for (const src of activeSourcesRef.current) {
      try {
        src.stop();
      } catch {
        // already stopped
      }
    }
    activeSourcesRef.current.clear();
    if (outputCtxRef.current) {
      nextStartTimeRef.current = outputCtxRef.current.currentTime;
    } else {
      nextStartTimeRef.current = 0;
    }
  }, []);

  const cleanupSession = useCallback(() => {
    stopPlaybackQueue();

    if (processorRef.current) {
      try {
        processorRef.current.disconnect();
      } catch {
        // ignore
      }
      processorRef.current.onaudioprocess = null;
      processorRef.current = null;
    }

    if (sourceRef.current) {
      try {
        sourceRef.current.disconnect();
      } catch {
        // ignore
      }
      sourceRef.current = null;
    }

    if (streamRef.current) {
      for (const track of streamRef.current.getTracks()) {
        track.stop();
      }
      streamRef.current = null;
    }

    if (wsRef.current) {
      try {
        wsRef.current.close();
      } catch {
        // ignore
      }
      wsRef.current = null;
    }

    if (inputCtxRef.current) {
      void inputCtxRef.current.close().catch(() => {});
      inputCtxRef.current = null;
    }

    if (outputCtxRef.current) {
      void outputCtxRef.current.close().catch(() => {});
      outputCtxRef.current = null;
    }

    setStatus("idle");
    setIsMuted(false);
  }, [stopPlaybackQueue]);

  useEffect(() => {
    return () => {
      cleanupSession();
    };
  }, [cleanupSession]);

  const appendTranscript = useCallback((speaker: "user" | "model", delta: string) => {
    const trimmed = delta;
    if (!trimmed) return;
    setTurns((prev) => {
      const last = prev[prev.length - 1];
      if (last && last.speaker === speaker) {
        return [
          ...prev.slice(0, -1),
          { ...last, text: `${last.text}${last.text.endsWith(" ") || trimmed.startsWith(" ") ? "" : " "}${trimmed}`.trimStart() },
        ];
      }
      return [...prev, { id: `${speaker}-${Date.now()}-${prev.length}`, speaker, text: trimmed.trimStart() }];
    });
  }, []);

  const startSession = async () => {
    if (status !== "idle") return;
    setErrorMsg(null);
    setTurns([]);
    setStatus("connecting");

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });
    } catch {
      setStatus("idle");
      setErrorMsg(UI_COPY.tutor.voiceMicDenied[language]);
      return;
    }

    streamRef.current = stream;

    try {
      const inputCtx = new AudioContext({ sampleRate: 16000 });
      const outputCtx = new AudioContext({ sampleRate: 24000 });
      inputCtxRef.current = inputCtx;
      outputCtxRef.current = outputCtx;
      nextStartTimeRef.current = outputCtx.currentTime;

      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const wsUrl = `${protocol}//${window.location.host}/api/live?lang=${language}&role=${encodeURIComponent(
        tutorRole
      )}&course=${encodeURIComponent(selectedCourseTitle)}`;

      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        if (inputCtx.state === "suspended") {
          void inputCtx.resume();
        }
        const source = inputCtx.createMediaStreamSource(stream);
        const processor = inputCtx.createScriptProcessor(4096, 1, 1);
        sourceRef.current = source;
        processorRef.current = processor;

        processor.onaudioprocess = (event) => {
          if (isMutedRef.current) return;
          if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
          const samples = event.inputBuffer.getChannelData(0);
          const base64 = pcmFloat32ToBase64(samples);
          wsRef.current.send(JSON.stringify({ audio: base64 }));
        };

        source.connect(processor);
        processor.connect(inputCtx.destination);
      };

      ws.onmessage = async (event) => {
        try {
          const msg = JSON.parse(event.data as string) as {
            type?: string;
            data?: string;
            text?: string;
            error?: string;
          };

          if (msg.type === "ready") {
            setStatus("live");
            return;
          }

          if (msg.type === "audio" && msg.data && outputCtxRef.current) {
            setStatus("live");
            const ctx = outputCtxRef.current;
            if (ctx.state === "suspended") {
              await ctx.resume();
            }
            const audioBuffer = decodeBase64Pcm24k(msg.data, ctx);
            const startAt = Math.max(ctx.currentTime, nextStartTimeRef.current);
            const bufSource = ctx.createBufferSource();
            bufSource.buffer = audioBuffer;
            bufSource.connect(ctx.destination);
            bufSource.onended = () => {
              activeSourcesRef.current.delete(bufSource);
            };
            activeSourcesRef.current.add(bufSource);
            bufSource.start(startAt);
            nextStartTimeRef.current = startAt + audioBuffer.duration;
            return;
          }

          if (msg.type === "interrupted") {
            stopPlaybackQueue();
            return;
          }

          if (msg.type === "inputTranscript" && msg.text) {
            appendTranscript("user", msg.text);
            return;
          }

          if (msg.type === "outputTranscript" && msg.text) {
            appendTranscript("model", msg.text);
            return;
          }

          if (msg.type === "error") {
            setErrorMsg(msg.error || UI_COPY.tutor.voiceConnectionError[language]);
            cleanupSession();
          }
        } catch {
          // ignore unparseable frames
        }
      };

      ws.onerror = () => {
        setErrorMsg(UI_COPY.tutor.voiceConnectionError[language]);
        cleanupSession();
      };

      ws.onclose = () => {
        cleanupSession();
      };
    } catch {
      setErrorMsg(UI_COPY.tutor.voiceConnectionError[language]);
      cleanupSession();
    }
  };

  return (
    <div className="border-b border-saudi-border bg-saudi-sand-soft/70 px-4 sm:px-6 py-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              status === "live"
                ? "bg-saudi-palm text-white animate-pulse"
                : "bg-saudi-surface border border-saudi-border text-saudi-palm"
            }`}
          >
            <Radio className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-saudi-ink truncate">
              {UI_COPY.tutor.voicePanelTitle[language]}
            </h3>
            <p className="text-xs text-saudi-muted truncate">
              {status === "connecting"
                ? UI_COPY.tutor.voiceConnecting[language]
                : status === "live"
                  ? isMuted
                    ? UI_COPY.tutor.voiceMutedState[language]
                    : UI_COPY.tutor.voiceListening[language]
                  : UI_COPY.tutor.voicePanelSubtitle[language]}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {status === "idle" ? (
            <button
              type="button"
              onClick={() => void startSession()}
              className="min-h-[40px] px-4 py-1.5 rounded-xl bg-saudi-palm hover:bg-saudi-palm-hover text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>{UI_COPY.tutor.voiceStart[language]}</span>
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setIsMuted((prev) => !prev)}
                className={`min-h-[40px] px-3 py-1.5 rounded-xl border text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isMuted
                    ? "bg-saudi-sand-accent text-white border-saudi-sand-accent"
                    : "bg-saudi-surface text-saudi-ink border-saudi-border hover:bg-saudi-subtle"
                }`}
              >
                {isMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                <span>
                  {isMuted ? UI_COPY.tutor.voiceUnmute[language] : UI_COPY.tutor.voiceMute[language]}
                </span>
              </button>

              <button
                type="button"
                onClick={cleanupSession}
                className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <PhoneOff className="w-3.5 h-3.5" />
                <span>{UI_COPY.tutor.voiceEnd[language]}</span>
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => {
              cleanupSession();
              onClose();
            }}
            aria-label={UI_COPY.tutor.voiceClose[language]}
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl border border-saudi-border bg-saudi-surface text-saudi-muted hover:text-saudi-ink cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {errorMsg && (
        <div
          role="alert"
          className="rounded-xl border border-red-300 dark:border-red-800/70 bg-red-50 dark:bg-red-950/40 px-3.5 py-2.5 flex items-start gap-2 text-xs text-red-800 dark:text-red-200"
        >
          <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="rounded-xl border border-saudi-border bg-saudi-surface/90 p-3 max-h-36 overflow-y-auto space-y-2 text-xs">
        {turns.length === 0 ? (
          <p className="text-saudi-muted">{UI_COPY.tutor.voiceEmptyTranscript[language]}</p>
        ) : (
          turns.map((turn) => (
            <div key={turn.id} className="leading-relaxed">
              <span
                className={`font-bold ${
                  turn.speaker === "user" ? "text-saudi-sand-text" : "text-saudi-palm-text"
                }`}
              >
                {turn.speaker === "user"
                  ? UI_COPY.tutor.voiceUserLabel[language]
                  : UI_COPY.tutor.voiceTutorLabel[language]}
                {": "}
              </span>
              <span className="text-saudi-ink">{turn.text}</span>
            </div>
          ))
        )}
        <div ref={transcriptEndRef} />
      </div>
    </div>
  );
};
