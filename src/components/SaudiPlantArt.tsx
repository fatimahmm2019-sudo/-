import React from "react";
import { SaudiPlantId } from "../data/saudiFlora";

interface SaudiPlantArtProps {
  plantId: SaudiPlantId;
  progress: number; // 0..1
  wilted?: boolean;
  stageOverride?: 0 | 1 | 2 | 3;
  unplanted?: boolean;
  className?: string;
}

export function getGrowthStage(progress: number): 0 | 1 | 2 | 3 {
  if (progress >= 0.95) return 3;
  if (progress >= 0.55) return 2;
  if (progress >= 0.2) return 1;
  return 0;
}

export const SaudiPlantArt: React.FC<SaudiPlantArtProps> = ({
  plantId,
  progress,
  wilted = false,
  stageOverride,
  unplanted = false,
  className = "w-28 h-28",
}) => {
  const stage = stageOverride !== undefined ? stageOverride : getGrowthStage(progress);

  // Shared desert dune / oasis soil base
  const SoilBase = (
    <g>
      <path
        d="M18 104 Q60 91 102 104 L102 110 Q60 114 18 110 Z"
        fill={wilted ? "#8c7355" : unplanted ? "#c8b79d" : "#d4a373"}
        opacity={unplanted ? "0.65" : "0.9"}
      />
      <path
        d="M28 106 Q60 98 92 106"
        fill="none"
        stroke={wilted ? "#6b5740" : "#b07d4f"}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </g>
  );

  if (unplanted) {
    return (
      <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
        {SoilBase}
        <ellipse cx="60" cy="98" rx="6.5" ry="4.2" fill="#9c7a54" opacity="0.75" />
        <path
          d="M60 94 Q60 88 63 85"
          fill="none"
          stroke="#a18a6c"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="2 2"
          opacity="0.7"
        />
      </svg>
    );
  }

  if (wilted) {
    return (
      <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
        {SoilBase}
        <path
          d="M60 100 Q58 76 66 58 Q72 48 80 54"
          fill="none"
          stroke="#785a3c"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M61 76 Q49 70 43 79"
          fill="none"
          stroke="#785a3c"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M78 53 Q86 60 83 68"
          fill="none"
          stroke="#a1805d"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <ellipse cx="42" cy="82" rx="4" ry="2.2" transform="rotate(28 42 82)" fill="#9c7a54" />
        <ellipse cx="83" cy="69" rx="4" ry="2" transform="rotate(-35 83 69)" fill="#9c7a54" />
      </svg>
    );
  }

  // Stage 0: Seed & Sprout (shared gentle sprouting look with species tint)
  if (stage === 0) {
    return (
      <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
        {SoilBase}
        <ellipse cx="60" cy="99" rx="6" ry="3.8" fill="#8b5e34" />
        <path
          d="M60 97 Q60 80 60 72"
          fill="none"
          stroke="#16a34a"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M60 81 Q47 72 44 80 Q51 86 60 83 Z"
          fill="#22c55e"
        />
        <path
          d="M60 76 Q73 67 76 75 Q69 81 60 78 Z"
          fill={plantId === "lavender" ? "#a855f7" : "#4ade80"}
        />
      </svg>
    );
  }

  // Stage 1: Young Sapling
  if (stage === 1) {
    return (
      <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
        {SoilBase}
        <path
          d="M60 100 Q58 76 60 54"
          fill="none"
          stroke="#7c532d"
          strokeWidth="3.8"
          strokeLinecap="round"
        />
        <path d="M60 78 Q41 64 36 73 Q46 82 60 80 Z" fill="#15803d" />
        <path d="M60 71 Q79 57 84 66 Q74 75 60 73 Z" fill="#16a34a" />
        <path d="M60 58 Q46 42 48 36 Q59 44 60 58 Z" fill="#22c55e" />
        <path d="M60 58 Q74 42 72 36 Q61 44 60 58 Z" fill="#4ade80" />
        {plantId === "lavender" && (
          <circle cx="60" cy="40" r="4" fill="#9333ea" />
        )}
      </svg>
    );
  }

  // Stage 2 & Stage 3: Species-specific Saudi trees & flora
  const isMature = stage === 3;

  switch (plantId) {
    case "palm":
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          {SoilBase}
          {/* Textured palm trunk */}
          <path
            d={isMature ? "M56 101 Q53 68 61 38 L66 38 Q61 68 64 101 Z" : "M57 101 Q56 76 60 50 L64 50 Q62 76 63 101 Z"}
            fill="#8b5e34"
          />
          <path
            d="M57 88 L63 86 M56 76 L63 74 M57 64 L64 62 M58 52 L65 50"
            stroke="#5c3d20"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Date clusters when mature */}
          {isMature && (
            <g fill="#d97706">
              <circle cx="56" cy="44" r="3" />
              <circle cx="53" cy="48" r="2.6" />
              <circle cx="69" cy="44" r="3" />
              <circle cx="72" cy="48" r="2.6" />
            </g>
          )}
          {/* Graceful palm fronds */}
          <g transform={isMature ? "translate(0,0)" : "translate(0,12) scale(0.86)"} style={{ transformOrigin: "62px 42px" }}>
            <path d="M63 39 Q36 22 22 44 Q40 35 63 41 Z" fill="#15803d" />
            <path d="M63 39 Q34 38 25 58 Q44 46 63 42 Z" fill="#166534" />
            <path d="M63 39 Q90 22 104 44 Q86 35 63 41 Z" fill="#16a34a" />
            <path d="M63 39 Q92 38 101 58 Q82 46 63 42 Z" fill="#15803d" />
            <path d="M63 39 Q46 14 38 18 Q52 24 63 39 Z" fill="#22c55e" />
            <path d="M63 39 Q80 14 88 18 Q74 24 63 39 Z" fill="#22c55e" />
            <path d="M63 39 Q63 12 63 14 Q67 25 63 39 Z" fill="#4ade80" />
          </g>
        </svg>
      );

    case "ghada":
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          {SoilBase}
          {/* Gnarled silver-brown Ghada branches */}
          <path
            d="M60 101 Q58 82 50 68 Q43 56 36 46"
            fill="none"
            stroke="#7c634a"
            strokeWidth="4.2"
            strokeLinecap="round"
          />
          <path
            d="M59 84 Q68 70 76 56 Q83 45 88 38"
            fill="none"
            stroke="#7c634a"
            strokeWidth="3.8"
            strokeLinecap="round"
          />
          <path
            d="M57 73 Q60 56 60 36"
            fill="none"
            stroke="#8d7257"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Feathery desert-sage foliage clouds */}
          <g opacity={isMature ? 1 : 0.85}>
            <ellipse cx="37" cy="47" rx={isMature ? 17 : 12} ry={isMature ? 12 : 9} fill="#10b981" />
            <ellipse cx="60" cy="34" rx={isMature ? 20 : 14} ry={isMature ? 14 : 10} fill="#059669" />
            <ellipse cx="85" cy="43" rx={isMature ? 17 : 12} ry={isMature ? 12 : 9} fill="#34d399" />
            <ellipse cx="51" cy="54" rx={isMature ? 15 : 11} ry={isMature ? 10 : 8} fill="#047857" />
            <ellipse cx="73" cy="54" rx={isMature ? 14 : 10} ry={isMature ? 10 : 8} fill="#059669" />
          </g>
          {isMature && (
            <g fill="#fde68a" opacity="0.9">
              <circle cx="48" cy="34" r="1.8" />
              <circle cx="67" cy="29" r="2" />
              <circle cx="82" cy="40" r="1.8" />
            </g>
          )}
        </svg>
      );

    case "talh":
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          {SoilBase}
          {/* Iconic V-shaped Najdi Acacia trunk */}
          <path
            d="M60 101 L60 72 M60 74 L38 48 M60 74 L82 48 M60 66 L60 44"
            fill="none"
            stroke="#6d4c2f"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          {/* Flat umbrella canopy */}
          <ellipse
            cx="60"
            cy={isMature ? 40 : 46}
            rx={isMature ? 40 : 28}
            ry={isMature ? 12 : 9}
            fill="#3f6212"
          />
          <ellipse
            cx="42"
            cy={isMature ? 44 : 49}
            rx={isMature ? 22 : 16}
            ry={isMature ? 9 : 7}
            fill="#4d7c0f"
          />
          <ellipse
            cx="78"
            cy={isMature ? 44 : 49}
            rx={isMature ? 22 : 16}
            ry={isMature ? 9 : 7}
            fill="#65a30d"
          />
          <ellipse
            cx="60"
            cy={isMature ? 34 : 41}
            rx={isMature ? 28 : 19}
            ry={isMature ? 9 : 7}
            fill="#84cc16"
            opacity="0.85"
          />
          {/* Golden Talh acacia blossoms when mature */}
          {isMature && (
            <g fill="#facc15">
              <circle cx="34" cy="40" r="2.2" />
              <circle cx="52" cy="33" r="2.4" />
              <circle cx="71" cy="36" r="2.2" />
              <circle cx="86" cy="41" r="2" />
            </g>
          )}
        </svg>
      );

    case "juniper":
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          {SoilBase}
          <rect x="56" y="76" width="8" height="26" rx="2" fill="#5c3d24" />
          {/* Layered Sarawat mountain evergreen tiers */}
          <polygon
            points={isMature ? "60,16 32,54 88,54" : "60,28 38,58 82,58"}
            fill="#0f766e"
          />
          <polygon
            points={isMature ? "60,34 26,74 94,74" : "60,44 32,76 88,76"}
            fill="#115e59"
          />
          <polygon
            points={isMature ? "60,52 22,90 98,90" : "60,58 28,90 92,90"}
            fill="#134e4a"
          />
          {isMature && (
            <g fill="#5eead4" opacity="0.85">
              <circle cx="50" cy="44" r="2" />
              <circle cx="70" cy="60" r="2.2" />
              <circle cx="44" cy="74" r="2" />
            </g>
          )}
        </svg>
      );

    case "sidr":
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          {SoilBase}
          <path
            d="M57 101 Q58 76 59 54 L63 54 Q63 76 64 101 Z"
            fill="#6b4423"
          />
          <path d="M60 70 L45 55 M62 66 L76 52" stroke="#6b4423" strokeWidth="3" strokeLinecap="round" />
          <g>
            <circle cx="60" cy="42" r={isMature ? 22 : 16} fill="#166534" />
            <circle cx="41" cy="52" r={isMature ? 17 : 12} fill="#15803d" />
            <circle cx="79" cy="52" r={isMature ? 17 : 12} fill="#16a34a" />
            <circle cx="60" cy="30" r={isMature ? 15 : 11} fill="#22c55e" opacity="0.9" />
          </g>
          {/* Golden Sidr / Nabk berries */}
          {isMature && (
            <g fill="#f59e0b">
              <circle cx="44" cy="49" r="2.5" />
              <circle cx="58" cy="39" r="2.5" />
              <circle cx="75" cy="53" r="2.5" />
              <circle cx="65" cy="29" r="2.2" />
            </g>
          )}
        </svg>
      );

    case "lavender":
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          {SoilBase}
          {/* Green desert stems */}
          <g stroke="#15803d" strokeWidth="2.4" strokeLinecap="round">
            <path d="M60 100 Q52 72 44 42" fill="none" />
            <path d="M60 100 Q60 68 60 28" fill="none" />
            <path d="M60 100 Q68 72 76 42" fill="none" />
            {isMature && <path d="M60 100 Q44 78 32 54" fill="none" />}
            {isMature && <path d="M60 100 Q76 78 88 54" fill="none" />}
          </g>
          {/* Purple Saudi Khuzama flower spikes */}
          {[
            { x: 60, y: 28 },
            { x: 44, y: 42 },
            { x: 76, y: 42 },
            ...(isMature ? [{ x: 32, y: 54 }, { x: 88, y: 54 }] : []),
          ].map((stem, idx) => (
            <g key={idx}>
              <ellipse cx={stem.x} cy={stem.y} rx="5" ry="9" fill="#7e22ce" />
              <ellipse cx={stem.x - 3} cy={stem.y + 6} rx="3.5" ry="5" fill="#9333ea" />
              <ellipse cx={stem.x + 3} cy={stem.y + 6} rx="3.5" ry="5" fill="#a855f7" />
              <circle cx={stem.x} cy={stem.y - 7} r="3" fill="#c084fc" />
            </g>
          ))}
        </svg>
      );
  }
};
