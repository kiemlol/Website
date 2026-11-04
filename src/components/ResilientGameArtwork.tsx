import React, { useState } from 'react';
import { Eye, Layers, Sparkles } from 'lucide-react';

interface Hotspot {
  x: number;
  y: number;
  label: string;
  detail: string;
}

interface ResilientGameArtworkProps {
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
  aspectClass?: string;
  hotspots?: Hotspot[];
  enableRenderPassToggle?: boolean;
  onInspectClick?: () => void;
}

export type RenderPassMode = 'final' | 'lighting' | 'wireframe';

export const ResilientGameArtwork: React.FC<ResilientGameArtworkProps> = ({
  src,
  alt,
  title,
  subtitle,
  aspectClass = 'aspect-video',
  hotspots = [],
  enableRenderPassToggle = false,
  onInspectClick,
}) => {
  const [imgFailed, setImgFailed] = useState(false);
  const [renderPass, setRenderPass] = useState<RenderPassMode>('final');
  const [activeHotspotIndex, setActiveHotspotIndex] = useState<number | null>(null);

  const filterClass =
    renderPass === 'lighting'
      ? 'contrast-125 brightness-110 saturate-150'
      : renderPass === 'wireframe'
        ? 'grayscale contrast-150 brightness-90'
        : '';

  return (
    <div className={`relative w-full overflow-hidden rounded-xl bg-[#12141A] border border-white/[0.08] group ${aspectClass}`}>
      {!imgFailed ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          onError={() => setImgFailed(true)}
          className={`w-full h-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02] ${filterClass}`}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#141824] via-[#1c1917] to-[#0A0B0E] text-center">
          <Layers className="w-10 h-10 text-amber-400 mb-3 opacity-80" />
          <p className="font-display text-base font-semibold text-zinc-100">{title}</p>
          {subtitle && <p className="text-xs text-zinc-400 mt-1">{subtitle}</p>}
        </div>
      )}

      {/* Wireframe Grid Overlay when in wireframe mode */}
      {renderPass === 'wireframe' && (
        <div
          className="absolute inset-0 pointer-events-none opacity-45"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(245, 158, 11, 0.28) 1px, transparent 1px), linear-gradient(to bottom, rgba(245, 158, 11, 0.28) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
      )}

      {/* Volumetric Lighting Overlay when in lighting mode */}
      {renderPass === 'lighting' && (
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-amber-500/20 via-transparent to-sky-400/20 mix-blend-screen" />
      )}

      {/* Measured Contrast Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

      {/* Interactive Technical Hotspots */}
      {hotspots.map((spot, idx) => {
        const isOpen = activeHotspotIndex === idx;
        return (
          <div
            key={spot.label}
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveHotspotIndex(isOpen ? null : idx);
              }}
              aria-label={`Chi tiết kỹ thuật: ${spot.label}`}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-semibold transition-transform duration-150 focus-visible:outline-2 focus-visible:outline-amber-400 ${
                isOpen
                  ? 'bg-amber-500 text-zinc-950 scale-110 shadow-lg'
                  : 'bg-zinc-950/85 text-amber-400 border border-amber-400/60 hover:bg-amber-500 hover:text-zinc-950'
              }`}
            >
              {idx + 1}
            </button>

            {isOpen && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute left-1/2 -translate-x-1/2 bottom-9 w-64 p-3 rounded-lg bg-zinc-950/95 border border-white/15 text-left shadow-xl z-30"
              >
                <p className="text-xs font-semibold text-amber-400">{spot.label}</p>
                <p className="text-xs text-zinc-300 mt-1 leading-relaxed">{spot.detail}</p>
              </div>
            )}
          </div>
        );
      })}

      {/* Render Pass Controls Bar (Optional for flagship / detail views) */}
      {enableRenderPassToggle && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1 p-1 rounded-lg bg-zinc-950/85 border border-white/10 backdrop-blur-sm">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setRenderPass('final');
            }}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              renderPass === 'final'
                ? 'bg-amber-500 text-zinc-950 font-semibold'
                : 'text-zinc-300 hover:text-white'
            }`}
          >
            Bản Dựng Hoàn Chỉnh
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setRenderPass('lighting');
            }}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 ${
              renderPass === 'lighting'
                ? 'bg-amber-500 text-zinc-950 font-semibold'
                : 'text-zinc-300 hover:text-white'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            Ánh Sáng
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setRenderPass('wireframe');
            }}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              renderPass === 'wireframe'
                ? 'bg-amber-500 text-zinc-950 font-semibold'
                : 'text-zinc-300 hover:text-white'
            }`}
          >
            Khung Lưới 3D
          </button>
        </div>
      )}

      {/* Optional Quick Inspect Trigger */}
      {onInspectClick && (
        <button
          type="button"
          onClick={onInspectClick}
          className="absolute bottom-3 right-3 z-20 px-3 py-1.5 rounded-lg bg-zinc-950/85 hover:bg-amber-500 text-zinc-200 hover:text-zinc-950 border border-white/15 text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
        >
          <Eye className="w-3.5 h-3.5" />
          Xem Hồ Sơ Kỹ Thuật
        </button>
      )}
    </div>
  );
};
