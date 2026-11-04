import React, { useEffect } from 'react';
import { X, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { GameProject } from '../data/studioData';
import { ResilientGameArtwork } from './ResilientGameArtwork';

interface ProjectDetailModalProps {
  project: GameProject | null;
  onClose: () => void;
  onInquireProject: (projectTitle: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onInquireProject,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="relative w-full max-w-4xl rounded-2xl bg-[#12141A] border border-white/10 p-6 sm:p-8 shadow-2xl my-auto max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
              <span>{project.genre}</span>
              <span aria-hidden="true">·</span>
              <span>{project.platforms}</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-400">{project.releaseStatus}</span>
            </div>
            <h2
              id="modal-project-title"
              className="font-display text-2xl sm:text-3xl font-bold text-zinc-100 mt-1"
            >
              {project.title}
            </h2>
            <p className="text-sm text-zinc-400 mt-0.5">{project.englishSubtitle}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng cửa sổ chi tiết"
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.06] transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive Artwork with Render Pass Switcher & Hotspots */}
        <div className="mt-6">
          <ResilientGameArtwork
            src={project.imageUrl}
            alt={project.title}
            title={project.title}
            subtitle={project.englishSubtitle}
            aspectClass="aspect-video"
            hotspots={project.sceneHotspots}
            enableRenderPassToggle={true}
          />
          <p className="text-xs text-zinc-400 mt-2">
            Mẹo: Nhấn vào các điểm đánh số trên hình để xem chú thích kỹ thuật đồ họa hoặc chuyển đổi chế độ kết xuất ở góc phải.
          </p>
        </div>

        {/* Lore & Gameplay Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-display text-lg font-semibold text-zinc-100">
              Bối Cảnh & Tầm Nhìn Sáng Tạo
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {project.shortSummary}
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {project.loreDescription}
            </p>

            <div className="pt-2">
              <h4 className="font-display text-sm font-semibold text-zinc-200 mb-3">
                Trụ Cột Gameplay Cốt Lõi
              </h4>
              <ul className="space-y-2.5">
                {project.gameplayPillars.map((pillar) => (
                  <li key={pillar} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{pillar}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Technical Benchmarks Box */}
          <div className="lg:col-span-5 rounded-xl bg-[#0A0B0E] border border-white/[0.08] p-5 space-y-4 self-start">
            <h3 className="font-display text-base font-semibold text-zinc-100">
              Thông Số Kỹ Thuật & Engine
            </h3>
            <div className="space-y-3 text-xs divide-y divide-white/[0.06]">
              <div className="pt-2 first:pt-0">
                <p className="text-zinc-500">Nền tảng Công nghệ</p>
                <p className="font-mono tabular-nums text-zinc-200 font-medium mt-0.5">
                  {project.engine}
                </p>
              </div>
              <div className="pt-3">
                <p className="text-zinc-500">Hiệu năng Mục tiêu</p>
                <p className="font-mono tabular-nums text-zinc-200 font-medium mt-0.5">
                  {project.techSpecs.targetFps}
                </p>
              </div>
              <div className="pt-3">
                <p className="text-zinc-500">Luồng Kết xuất Ánh sáng</p>
                <p className="text-zinc-200 font-medium mt-0.5">
                  {project.techSpecs.lightingPipeline}
                </p>
              </div>
              <div className="pt-3">
                <p className="text-zinc-500">Ngân sách Đa giác</p>
                <p className="font-mono tabular-nums text-zinc-200 font-medium mt-0.5">
                  {project.techSpecs.polyBudget}
                </p>
              </div>
              <div className="pt-3">
                <p className="text-zinc-500">Kiến trúc Mạng</p>
                <p className="text-zinc-200 font-medium mt-0.5">
                  {project.techSpecs.networkArchitecture}
                </p>
              </div>
              <div className="pt-3">
                <p className="text-zinc-500">Dấu ấn Thực tế</p>
                <p className="font-mono tabular-nums text-amber-400 font-medium mt-0.5">
                  {project.keyHighlightMetric}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Action */}
        <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-zinc-400">
            EntenalSmp · Sáng tạo thế giới không giới hạn · Chất lượng tạo nên đẳng cấp
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white border border-white/15 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              Đóng
            </button>
            <button
              type="button"
              onClick={() => {
                onInquireProject(project.title);
                onClose();
              }}
              className="px-4 py-2 text-xs font-semibold text-zinc-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              Yêu Cầu Bản Dựng Thử Nghiệm
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
