/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Sliders,
  Send,
  Compass,
  Award,
  MapPin,
  Mail,
  Phone,
} from 'lucide-react';
import {
  GAME_PROJECTS,
  STUDIO_SERVICES,
  PARTNER_TESTIMONIALS,
  TEAM_MEMBERS,
  STUDIO_METRICS,
  GameProject,
} from './data/studioData';
import { ResilientGameArtwork } from './components/ResilientGameArtwork';
import { ProjectDetailModal } from './components/ProjectDetailModal';

type ProjectFilter = 'all' | 'aaa-console' | 'scifi-tactical' | 'vietnam-myth';
type DepartmentFilter = 'all' | 'direction' | 'engineering' | 'art';
type ScopeGenre = 'arpg' | 'shooter' | 'strategy' | 'adventure';
type ScopePlatform = 'pc-console' | 'pc-first' | 'cross-platform';

const GENRE_ESTIMATES: Record<
  ScopeGenre,
  { label: string; baseTeam: number; baseMonths: number; techFocus: string; targetFps: string }
> = {
  arpg: {
    label: 'Hành Động Nhập Vai (Action RPG)',
    baseTeam: 45,
    baseMonths: 22,
    techFocus: 'Unreal Engine 5.4 · Nanite & Hệ thống cận chiến vật lý',
    targetFps: '60 FPS @ 4K Upscaled (16.6ms)',
  },
  shooter: {
    label: 'Bắn Súng Chiến Thuật (Tactical Shooter)',
    baseTeam: 38,
    baseMonths: 18,
    techFocus: 'Dedicated Server 120Hz · Rollback Netcode & Ray-Traced Audio',
    targetFps: '120 FPS @ 1440p / PS5 Performance (8.3ms)',
  },
  strategy: {
    label: 'Chiến Thuật Quy Mô Lớn (Co-op Siege)',
    baseTeam: 28,
    baseMonths: 16,
    techFocus: 'Data-Oriented ECS C++ · Mô phỏng 25.000+ thực thể đồng thời',
    targetFps: '90 FPS @ PC / 60 FPS Steam Deck',
  },
  adventure: {
    label: 'Phiêu Lưu Sử Thi & Thần Thoại',
    baseTeam: 34,
    baseMonths: 20,
    techFocus: 'Môi trường 3D thủ công · Tán xạ khí quyển & mô phỏng mặt nước',
    targetFps: '60 FPS ổn định đa nền tảng',
  },
};

const PLATFORM_MULTIPLIERS: Record<
  ScopePlatform,
  { label: string; teamAddon: number; monthsAddon: number }
> = {
  'pc-first': {
    label: 'PC (Steam / Epic) & Steam Deck',
    teamAddon: 0,
    monthsAddon: 0,
  },
  'pc-console': {
    label: 'PC + PlayStation 5 + Xbox Series X|S',
    teamAddon: 12,
    monthsAddon: 4,
  },
  'cross-platform': {
    label: 'Đa nền tảng kèm Cloud & Hệ thống Cross-play',
    teamAddon: 18,
    monthsAddon: 6,
  },
};

export default function App() {
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>('all');
  const [deptFilter, setDeptFilter] = useState<DepartmentFilter>('all');
  const [selectedProject, setSelectedProject] = useState<GameProject | null>(null);
  const [selectedMemberId, setSelectedMemberId] = useState<string>(TEAM_MEMBERS[0].id);

  // Interactive Production Estimator State
  const [scopeGenre, setScopeGenre] = useState<ScopeGenre>('arpg');
  const [scopePlatform, setScopePlatform] = useState<ScopePlatform>('pc-console');
  const [includeMocapAndCinematics, setIncludeMocapAndCinematics] = useState<boolean>(true);

  // Contact / Partnership Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactOrg, setContactOrg] = useState('');
  const [contactService, setContactService] = useState('Phát Triển Game Trọn Gói (Full-Cycle Production)');
  const [contactMessage, setContactMessage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const flagshipProject = GAME_PROJECTS[0];

  const filteredProjects =
    projectFilter === 'all'
      ? GAME_PROJECTS
      : GAME_PROJECTS.filter((p) => p.category === projectFilter);

  const filteredTeam =
    deptFilter === 'all'
      ? TEAM_MEMBERS
      : TEAM_MEMBERS.filter((m) => m.department === deptFilter);

  const activeTeamMember =
    TEAM_MEMBERS.find((m) => m.id === selectedMemberId) || TEAM_MEMBERS[0];

  // Computed Estimator Values
  const genreConfig = GENRE_ESTIMATES[scopeGenre];
  const platformConfig = PLATFORM_MULTIPLIERS[scopePlatform];
  const estimatedTeamSize =
    genreConfig.baseTeam + platformConfig.teamAddon + (includeMocapAndCinematics ? 8 : 0);
  const estimatedMonths =
    genreConfig.baseMonths + platformConfig.monthsAddon + (includeMocapAndCinematics ? 2 : 0);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrefillInquiry = (subjectNote: string, serviceTitle?: string) => {
    if (serviceTitle) {
      setContactService(serviceTitle);
    }
    setContactMessage(subjectNote);
    setFormSubmitted(false);
    scrollToSection('lien-he');
  };

  const handleApplyEstimateToForm = () => {
    const summary = `Yêu cầu tư vấn sản xuất: Thể loại ${genreConfig.label} trên hệ máy ${platformConfig.label}${
      includeMocapAndCinematics ? ', bao gồm Motion Capture & Cinematics' : ''
    }. Quy mô ước tính: ~${estimatedTeamSize} nhân sự trong ${estimatedMonths} tháng.`;
    handlePrefillInquiry(summary, 'Phát Triển Game Trọn Gói (Full-Cycle Production)');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!contactName.trim() || contactName.trim().length < 2) {
      setFormError('Vui lòng nhập họ và tên người liên hệ (tối thiểu 2 ký tự).');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail.trim())) {
      setFormError('Vui lòng nhập địa chỉ email doanh nghiệp hợp lệ.');
      return;
    }
    if (!contactMessage.trim() || contactMessage.trim().length < 15) {
      setFormError('Vui lòng mô tả ngắn gọn yêu cầu dự án hoặc mục tiêu hợp tác (tối thiểu 15 ký tự).');
      return;
    }

    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0B0E] text-zinc-100 flex flex-col">
      {/* Top Bar Contract: Strictly 1 row, 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-40 bg-[#0A0B0E]/90 backdrop-blur-md border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="font-display text-xl font-bold tracking-tight text-zinc-100 whitespace-nowrap shrink-0 hover:text-amber-400 transition-colors"
          >
            EntenalSmp
          </a>

          {/* Zone 2: 4-5 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-400">
            <a
              href="#du-an"
              className="hover:text-zinc-100 hover:underline underline-offset-8 decoration-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              Dự Án Game
            </a>
            <a
              href="#dich-vu"
              className="hover:text-zinc-100 hover:underline underline-offset-8 decoration-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              Dịch Vụ
            </a>
            <a
              href="#uoc-tinh"
              className="hover:text-zinc-100 hover:underline underline-offset-8 decoration-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              Công Nghệ
            </a>
            <a
              href="#doi-ngu"
              className="hover:text-zinc-100 hover:underline underline-offset-8 decoration-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              Đội Ngũ
            </a>
            <a
              href="#lien-he"
              className="hover:text-zinc-100 hover:underline underline-offset-8 decoration-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              Liên Hệ
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => scrollToSection('lien-he')}
              className="px-4 py-2 text-xs font-semibold text-zinc-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              Hợp Tác Dự Án
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* 1. HERO SECTION */}
        <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-6">
            {/* 2-Column Split with items-stretch */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Left Column: Core Proposition & Motto */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
                <div className="space-y-5">
                  <div className="flex items-center gap-2 text-xs text-amber-400 font-medium tracking-wide">
                    <span>Studio Phát Triển Game Đa Nền Tảng</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-zinc-400">Chất lượng tạo nên đẳng cấp</span>
                  </div>

                  <h1
                    className="font-display font-bold text-zinc-100 tracking-tight leading-[1.1]"
                    style={{
                      fontSize: 'clamp(2.25rem, 4vw, 3.6rem)',
                      textWrap: 'balance',
                    }}
                  >
                    Sáng tạo thế giới không giới hạn
                  </h1>

                  <p className="text-base text-zinc-300 leading-relaxed max-w-[65ch]">
                    Tại <strong className="text-zinc-100 font-semibold">EntenalSmp</strong>, chúng tôi kiến tạo những vũ trụ trò chơi điện tử nguyên bản trên PC và Console. Với phương châm{' '}
                    <span className="text-amber-400 font-medium">
                      “Chất lượng tạo nên đẳng cấp”
                    </span>
                    , mỗi dự án là sự giao thoa giữa chiều sâu mỹ thuật điện ảnh và kỹ thuật tối ưu hóa phần cứng chuẩn xác.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Single Primary CTA + Quiet Secondary Link */}
                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => scrollToSection('du-an')}
                      className="px-6 py-3 text-sm font-semibold text-zinc-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
                    >
                      Khám Phá Dự Án Mới Nhất
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedProject(flagshipProject)}
                      className="px-5 py-3 text-sm font-medium text-zinc-200 hover:text-white border border-white/15 hover:border-white/30 rounded-lg transition-colors whitespace-nowrap shrink-0"
                    >
                      Phân Tích Kỹ Thuật Aethelgard
                    </button>
                  </div>

                  {/* Quiet Unboxed Metadata */}
                  <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-400">
                    <span>Trụ sở: TP. Hồ Chí Minh & Tokyo</span>
                    <span aria-hidden="true">·</span>
                    <span>Đối tác chứng nhận PlayStation 5, Xbox Series X|S & Steam</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Flagship 16:9 Interactive Game World Showcase */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div className="relative h-full flex flex-col">
                  <ResilientGameArtwork
                    src={flagshipProject.imageUrl}
                    alt={flagshipProject.title}
                    title={flagshipProject.title}
                    subtitle={flagshipProject.englishSubtitle}
                    aspectClass="aspect-video lg:h-full"
                    hotspots={flagshipProject.sceneHotspots}
                    enableRenderPassToggle={true}
                    onInspectClick={() => setSelectedProject(flagshipProject)}
                  />

                  {/* Caption Bar Below Artwork */}
                  <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-zinc-400 px-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-zinc-200 font-medium">
                        Tiêu điểm: {flagshipProject.title}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{flagshipProject.engine}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-amber-400">{flagshipProject.releaseStatus}</span>
                    </div>
                    <span className="text-zinc-500">
                      Nhấn vào số (1, 2, 3) trên ảnh để xem cấu trúc đồ họa
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column KPI Proof Strip Below Hero Split */}
            <div className="mt-14 pt-10 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {STUDIO_METRICS.map((metric) => (
                <div key={metric.unit} className="space-y-1.5">
                  <p className="font-mono tabular-nums text-3xl sm:text-4xl font-semibold text-zinc-100">
                    {metric.value}
                  </p>
                  <p className="font-display text-sm font-semibold text-amber-400">
                    {metric.unit}
                  </p>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {metric.context}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. FEATURED GAME PROJECTS SHOWCASE (DỰ ÁN GAME MỚI NHẤT) */}
        <section id="du-an" className="py-20 lg:py-24 border-b border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-6">
            {/* Section Header & Interactive Filter Controls */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-white/[0.08]">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
                  <span>Danh Mục Tác Phẩm</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-zinc-400">Sáng tạo thế giới không giới hạn</span>
                </div>
                <h2
                  className="font-display text-2xl sm:text-4xl font-bold text-zinc-100 tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Các Dự Án Game Mới Nhất Từ EntenalSmp
                </h2>
                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                  Mỗi thế giới ảo được chế tác thủ công với hệ thống ánh sáng thời gian thực, cơ chế chiến đấu có chiều sâu và bản sắc văn hóa riêng biệt.
                </p>
              </div>

              {/* Interactive Segmented Filter Bar */}
              <div
                role="tablist"
                aria-label="Lọc dự án theo dòng game"
                className="flex flex-wrap items-center gap-1 p-1 bg-[#12141A] border border-white/[0.08] rounded-lg self-start lg:self-auto"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={projectFilter === 'all'}
                  onClick={() => setProjectFilter('all')}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    projectFilter === 'all'
                      ? 'bg-amber-500 text-zinc-950 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-100'
                  }`}
                >
                  Tất Cả Dự Án ({GAME_PROJECTS.length})
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={projectFilter === 'aaa-console'}
                  onClick={() => setProjectFilter('aaa-console')}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    projectFilter === 'aaa-console'
                      ? 'bg-amber-500 text-zinc-950 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-100'
                  }`}
                >
                  AAA & Console
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={projectFilter === 'scifi-tactical'}
                  onClick={() => setProjectFilter('scifi-tactical')}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    projectFilter === 'scifi-tactical'
                      ? 'bg-amber-500 text-zinc-950 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-100'
                  }`}
                >
                  Sci-Fi Tactical
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={projectFilter === 'vietnam-myth'}
                  onClick={() => setProjectFilter('vietnam-myth')}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    projectFilter === 'vietnam-myth'
                      ? 'bg-amber-500 text-zinc-950 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-100'
                  }`}
                >
                  Sử Thi Việt Nam
                </button>
              </div>
            </div>

            {/* Game Projects Grid (Single-Elevation Cards, Zero-Pill Metadata) */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer rounded-2xl bg-[#12141A] border border-white/[0.08] hover:border-amber-500/40 transition-colors p-6 flex flex-col justify-between"
                >
                  <div>
                    {/* Artwork Container */}
                    <ResilientGameArtwork
                      src={project.imageUrl}
                      alt={project.title}
                      title={project.title}
                      subtitle={project.englishSubtitle}
                      aspectClass="aspect-video"
                      hotspots={project.sceneHotspots}
                    />

                    {/* Unboxed Metadata Line (Zero-Pill Rule) */}
                    <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                      <span>{project.genre}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.platforms}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-amber-400">{project.releaseStatus}</span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-zinc-100 mt-2 group-hover:text-amber-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-0.5">{project.englishSubtitle}</p>

                    <p className="text-sm text-zinc-300 mt-3 leading-relaxed">
                      {project.shortSummary}
                    </p>
                  </div>

                  {/* Card Footer: Concrete Metric & Action */}
                  <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-4">
                    <div className="text-xs text-zinc-400">
                      <span className="text-zinc-500">Dấu ấn: </span>
                      <span className="font-mono tabular-nums text-zinc-200 font-medium">
                        {project.keyHighlightMetric}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 group-hover:translate-x-0.5 transition-transform whitespace-nowrap shrink-0">
                      Khám Phá Thế Giới
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 3. CORE SERVICES BENTO GRID & ADJACENT PROOF (DỊCH VỤ CHUYÊN NGHIỆP) */}
        <section id="dich-vu" className="py-20 lg:py-24 border-b border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl space-y-3">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
                <span>Dịch Vụ Phát Triển Chuyên Nghiệp</span>
                <span aria-hidden="true">·</span>
                <span className="text-zinc-400">Chất lượng tạo nên đẳng cấp</span>
              </div>
              <h2
                className="font-display text-2xl sm:text-4xl font-bold text-zinc-100 tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Chất Lượng Tạo Nên Đẳng Cấp Trong Từng Khung Hình
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                Bên cạnh các IP tự phát triển, EntenalSmp cung cấp dịch vụ sản xuất trọn gói và đồng phát triển kỹ thuật cao cho các nhà phát hành game hàng đầu tại Châu Âu, Bắc Mỹ và Nhật Bản.
              </p>
            </div>

            {/* Asymmetric Bento Grid (7 / 5 and 5 / 7 spans) */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
              {STUDIO_SERVICES.map((service) => (
                <div
                  key={service.id}
                  className={`${service.colSpan} rounded-2xl bg-[#12141A] border border-white/[0.08] p-7 sm:p-8 flex flex-col justify-between space-y-6`}
                >
                  <div className="space-y-4">
                    {/* Clean Editorial Numbering */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
                      <span className="font-mono tabular-nums text-amber-400 font-semibold">
                        {service.index}. Năng Lực Cốt Lõi
                      </span>
                      <span>Thời gian triển khai: {service.estimatedTimeline}</span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-bold text-zinc-100">
                      {service.index}. {service.title}
                    </h3>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Deliverables List */}
                    <ul className="space-y-2.5 pt-2">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-300">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Quantified Proof & Direct Inquiry Trigger */}
                  <div className="pt-6 border-t border-white/[0.08] space-y-4">
                    <div>
                      <p className="font-mono tabular-nums text-sm font-semibold text-zinc-100">
                        {service.proofMetric}
                      </p>
                      <p className="text-xs text-zinc-400 mt-0.5">{service.proofContext}</p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                        {service.coreTechnologies.map((tech, idx) => (
                          <React.Fragment key={tech}>
                            {idx > 0 && <span aria-hidden="true">·</span>}
                            <span>{tech}</span>
                          </React.Fragment>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          handlePrefillInquiry(
                            `Tôi muốn trao đổi về dịch vụ: ${service.title}.`,
                            service.title
                          )
                        }
                        className="px-3.5 py-2 text-xs font-semibold text-zinc-200 hover:text-zinc-950 bg-white/[0.06] hover:bg-amber-500 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
                      >
                        Nhận Hồ Sơ Kỹ Thuật
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Adjacent Claim-to-Proof Testimonials (Distance <= 1 Section) */}
            <div className="mt-12 pt-12 border-t border-white/[0.08]">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-zinc-100">
                    Đánh Giá Thực Tế Từ Đối Tác Phát Hành Quốc Tế
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                    Minh chứng định lượng từ các dự án đồng phát triển và tối ưu hóa phần cứng đã bàn giao.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {PARTNER_TESTIMONIALS.map((item) => (
                  <blockquote
                    key={item.id}
                    className="rounded-2xl bg-[#12141A] border border-white/[0.08] p-7 flex flex-col justify-between space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-amber-400 font-mono tabular-nums">
                        <span>Kết quả kiểm chứng: {item.quantifiedOutcome}</span>
                      </div>
                      <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">
                        “{item.quote}”
                      </p>
                    </div>

                    <footer className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div>
                        <p className="font-semibold text-zinc-100">{item.authorName}</p>
                        <p className="text-zinc-400">
                          {item.authorRole} · {item.organization}
                        </p>
                      </div>
                      <span className="text-zinc-500">{item.projectDelivered}</span>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. INTERACTIVE PRODUCTION SCOPE ESTIMATOR (CÔNG NGHỆ & ƯỚC TÍNH QUY MÔ) */}
        <section id="uoc-tinh" className="py-20 lg:py-24 border-b border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Hoạch Định Kỹ Thuật & Nguồn Lực</span>
                </div>
                <h2
                  className="font-display text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Công Cụ Ước Tính Lộ Trình & Cấu Hình Sản Xuất Game
                </h2>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Lựa chọn thể loại trò chơi và hệ máy mục tiêu để tham khảo định mức nhân sự, thời gian phát triển tiêu chuẩn cũng như kiến trúc engine khuyến nghị từ đội ngũ kỹ sư EntenalSmp.
                </p>

                <div className="pt-4 space-y-3 text-xs text-zinc-400 border-t border-white/[0.08]">
                  <p className="font-semibold text-zinc-200">
                    Cam kết kỹ thuật tại EntenalSmp:
                  </p>
                  <p>
                    1. Bàn giao bản dựng chơi thử (Playable Milestone) định kỳ mỗi 4 tuần qua hệ thống phân phối nội bộ.
                  </p>
                  <p>
                    2. Kiểm tra hiệu năng khung hình tự động hàng đêm (Nightly Automated Frame-Time Profiling) trên devkit thực tế.
                  </p>
                </div>
              </div>

              {/* Interactive Calculator Panel */}
              <div className="lg:col-span-7 rounded-2xl bg-[#12141A] border border-white/[0.08] p-6 sm:p-8 space-y-6">
                {/* Step 1: Genre Selection */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-semibold text-zinc-300">
                    1. Chọn Dòng Game Mục Tiêu
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {(Object.keys(GENRE_ESTIMATES) as ScopeGenre[]).map((key) => {
                      const item = GENRE_ESTIMATES[key];
                      const active = scopeGenre === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setScopeGenre(key)}
                          className={`p-3.5 rounded-xl border text-left transition-colors ${
                            active
                              ? 'bg-amber-500/10 border-amber-500 text-zinc-100'
                              : 'bg-[#0A0B0E] border-white/[0.08] text-zinc-400 hover:text-zinc-200 hover:border-white/20'
                          }`}
                        >
                          <p className="text-xs font-semibold text-zinc-100">{item.label}</p>
                          <p className="text-[11px] text-zinc-400 mt-1 line-clamp-1">
                            {item.techFocus}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Target Platforms */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-semibold text-zinc-300">
                    2. Phạm Vi Nền Tảng Phát Hành
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {(Object.keys(PLATFORM_MULTIPLIERS) as ScopePlatform[]).map((key) => {
                      const item = PLATFORM_MULTIPLIERS[key];
                      const active = scopePlatform === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setScopePlatform(key)}
                          className={`p-3 rounded-xl border text-left transition-colors ${
                            active
                              ? 'bg-amber-500/10 border-amber-500 text-zinc-100'
                              : 'bg-[#0A0B0E] border-white/[0.08] text-zinc-400 hover:text-zinc-200'
                          }`}
                        >
                          <p className="text-xs font-medium">{item.label}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3: Mocap Toggle */}
                <div className="flex items-center justify-between gap-4 pt-2">
                  <div>
                    <p className="text-xs font-semibold text-zinc-200">
                      3. Tích hợp Phòng Thu Motion Capture & Dựng Phim Cắt Cảnh
                    </p>
                    <p className="text-xs text-zinc-400">
                      Bổ sung tổ đạo diễn hình ảnh, diễn viên Mocap quang học và Facial Rigging
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={includeMocapAndCinematics}
                    onClick={() => setIncludeMocapAndCinematics(!includeMocapAndCinematics)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                      includeMocapAndCinematics
                        ? 'bg-amber-500 text-zinc-950'
                        : 'bg-[#0A0B0E] text-zinc-400 border border-white/15'
                    }`}
                  >
                    {includeMocapAndCinematics ? 'Đã Bao Gồm' : 'Không Bao Gồm'}
                  </button>
                </div>

                {/* Computed Output Readout */}
                <div className="rounded-xl bg-[#0A0B0E] border border-white/[0.08] p-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-white/[0.06]">
                    <div>
                      <p className="text-xs text-zinc-500">Quy mô Đội ngũ Đề xuất</p>
                      <p className="font-mono tabular-nums text-2xl font-bold text-amber-400 mt-0.5">
                        {estimatedTeamSize} nhân sự
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Lộ trình Sản xuất Dự kiến</p>
                      <p className="font-mono tabular-nums text-2xl font-bold text-zinc-100 mt-0.5">
                        {estimatedMonths} tháng
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Chuẩn Khung hình Cam kết</p>
                      <p className="font-mono tabular-nums text-sm font-semibold text-zinc-200 mt-1.5">
                        {genreConfig.targetFps}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-xs text-zinc-400">
                      <span className="text-zinc-500">Kiến trúc khuyến nghị: </span>
                      <span className="text-zinc-200">{genreConfig.techFocus}</span>
                    </div>

                    <button
                      type="button"
                      onClick={handleApplyEstimateToForm}
                      className="px-4 py-2 text-xs font-semibold text-zinc-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors whitespace-nowrap shrink-0"
                    >
                      Gửi Cấu Hình Này Tới Ban Giám Đốc
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. STUDIO TEAM & WORKSPACE (ĐỘI NGŨ CỐT CÁN) */}
        <section id="doi-ngu" className="py-20 lg:py-24 border-b border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-6">
            {/* Section Header & Department Filter */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-white/[0.08]">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
                  <span>Con Người & Văn Hóa Kỹ Thuật</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-zinc-400">EntenalSmp Studio</span>
                </div>
                <h2
                  className="font-display text-2xl sm:text-4xl font-bold text-zinc-100 tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Đội Ngũ Kiến Tạo Thế Giới Ảo
                </h2>
                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                  Quy tụ những đạo diễn trò chơi, kiến trúc sư đồ họa C++ và nghệ sĩ 3D dày dạn kinh nghiệm từng góp mặt trong nhiều dự án phát hành toàn cầu.
                </p>
              </div>

              {/* Department Filter Buttons */}
              <div className="flex flex-wrap items-center gap-1 p-1 bg-[#12141A] border border-white/[0.08] rounded-lg self-start lg:self-auto">
                <button
                  type="button"
                  onClick={() => setDeptFilter('all')}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    deptFilter === 'all'
                      ? 'bg-amber-500 text-zinc-950 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-100'
                  }`}
                >
                  Tất Cả Ban
                </button>
                <button
                  type="button"
                  onClick={() => setDeptFilter('direction')}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    deptFilter === 'direction'
                      ? 'bg-amber-500 text-zinc-950 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-100'
                  }`}
                >
                  Đạo Diễn & Thiết Kế
                </button>
                <button
                  type="button"
                  onClick={() => setDeptFilter('engineering')}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    deptFilter === 'engineering'
                      ? 'bg-amber-500 text-zinc-950 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-100'
                  }`}
                >
                  Kỹ Thuật Engine
                </button>
                <button
                  type="button"
                  onClick={() => setDeptFilter('art')}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    deptFilter === 'art'
                      ? 'bg-amber-500 text-zinc-950 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-100'
                  }`}
                >
                  Mỹ Thuật & Thế Giới
                </button>
              </div>
            </div>

            {/* Team Roster Cards */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredTeam.map((member) => {
                const isSelected = member.id === activeTeamMember.id;
                return (
                  <div
                    key={member.id}
                    onClick={() => setSelectedMemberId(member.id)}
                    className={`cursor-pointer rounded-2xl p-6 border transition-colors flex flex-col justify-between space-y-5 ${
                      isSelected
                        ? 'bg-[#12141A] border-amber-500/60'
                        : 'bg-[#12141A]/70 border-white/[0.08] hover:border-white/20'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-zinc-400">
                        <span>{member.departmentLabel}</span>
                        <span className="font-mono tabular-nums text-amber-400">
                          {member.yearsExperience} năm KN
                        </span>
                      </div>

                      <h3 className="font-display text-lg font-bold text-zinc-100">
                        {member.name}
                      </h3>
                      <p className="text-xs font-medium text-zinc-300">{member.role}</p>
                      <p className="text-xs text-zinc-400 leading-relaxed pt-1">
                        {member.bio}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/[0.06] space-y-1.5 text-xs">
                      <p className="text-zinc-500">Chuyên môn trọng tâm:</p>
                      <p className="text-zinc-200 font-medium">{member.signatureFocus}</p>
                      <p className="font-mono tabular-nums text-zinc-400 pt-1">
                        Đã phát hành: {member.shippedTitlesCount} tựa game thương mại
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Studio Workspace & Motion Capture Lab Showcase */}
            <div className="mt-12 rounded-2xl bg-[#12141A] border border-white/[0.08] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <ResilientGameArtwork
                  src="/images/studio-entenalsmp.svg"
                  alt="Không gian làm việc và phòng thu Motion Capture tại EntenalSmp Studio"
                  title="Phòng Lab Đồ Họa & Sân Khấu Motion Capture EntenalSmp"
                  subtitle="Khu Công Nghệ Cao, TP. Hồ Chí Minh"
                  aspectClass="aspect-video"
                  hotspots={[
                    {
                      x: 50,
                      y: 35,
                      label: 'Phòng Thu Optical Motion Capture 24 Camera',
                      detail: 'Ghi hình chuyển động võ thuật và biểu cảm khuôn mặt diễn viên ở tần số 240Hz.',
                    },
                    {
                      x: 28,
                      y: 58,
                      label: 'Trạm Dựng Hình Unreal Engine 5 Thời Gian Thực',
                      detail: 'Màn hình chuẩn màu HDR10 phục vụ cân chỉnh ánh sáng khí quyển và shader.',
                    },
                  ]}
                />
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Cơ Sở Vật Chất Tiêu Chuẩn Quốc Tế</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-zinc-100">
                  Môi Trường R&D Tối Tân Cho Nghệ Sĩ & Kỹ Sư Game
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Tọa lạc tại TP. Hồ Chí Minh, tổ hợp sản xuất của EntenalSmp được trang bị phòng thu Motion Capture quang học, phòng hòa âm chuẩn Dolby Atmos 7.1.4 và hệ thống máy chủ biên dịch phân tán Incredibuild giúp rút ngắn 70% thời gian chờ đợi build shader.
                </p>

                <div className="pt-2 space-y-2 text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Bảo mật hạ tầng đạt chuẩn ISO/IEC 27001 cho các dự án IP chưa công bố</span>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() =>
                      handlePrefillInquiry(
                        'Tôi muốn đăng ký tham quan phòng thu EntenalSmp hoặc ứng tuyển vị trí phát triển game.',
                        'Mỹ Thuật 3D Thế Hệ Mới, Concept Art & Cinematics'
                      )
                    }
                    className="px-4 py-2.5 text-xs font-semibold text-zinc-200 hover:text-white border border-white/15 hover:border-amber-400 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    Đặt Lịch Tham Quan Studio & Tuyển Dụng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. INTERACTIVE LEAD CAPTURE / CONTACT (LIÊN HỆ HỢP TÁC) */}
        <section id="lien-he" className="py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Info Column */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
                    <span>Kết Nối Cùng EntenalSmp</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-zinc-400">B2B & Phát Hành Toàn Cầu</span>
                  </div>
                  <h2
                    className="font-display text-2xl sm:text-4xl font-bold text-zinc-100 tracking-tight"
                    style={{ textWrap: 'balance' }}
                  >
                    Khởi Đầu Dự Án Game Tiếp Theo Của Bạn
                  </h2>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Dù bạn đang tìm kiếm một studio đảm nhận trọn gói tựa game mới, mở rộng quy mô mỹ thuật 3D hay giải quyết nút thắt kỹ thuật đồ họa trên Console, đội ngũ sản xuất của chúng tôi luôn sẵn sàng phản hồi trong vòng 24 giờ làm việc.
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/[0.08] text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-zinc-200">Trụ sở Studio Chính</p>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        Tầng 18, Tòa nhà Sáng Tạo Công Nghệ, Quận 1, TP. Hồ Chí Minh, Việt Nam
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-zinc-200">Liên Hệ Hợp Tác & Phát Hành</p>
                      <p className="font-mono text-xs text-zinc-400 mt-0.5">
                        partnerships@entenalsmp.studio
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-zinc-200">Điện Thoại Văn Phòng</p>
                      <p className="font-mono tabular-nums text-xs text-zinc-400 mt-0.5">
                        (+84) 28 3910 8868
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Validated Contact Form */}
              <div className="lg:col-span-7 rounded-2xl bg-[#12141A] border border-white/[0.08] p-6 sm:p-8">
                {formSubmitted ? (
                  <div className="py-10 text-center space-y-4">
                    <CheckCircle2 className="w-12 h-12 text-amber-400 mx-auto" />
                    <h3 className="font-display text-2xl font-bold text-zinc-100">
                      Đã Tiếp Nhận Yêu Cầu Hợp Tác
                    </h3>
                    <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                      Cảm ơn <strong className="text-zinc-100">{contactName}</strong>. Bộ phận Sản Xuất của EntenalSmp đã ghi nhận yêu cầu về{' '}
                      <span className="text-amber-400">{contactService}</span> và sẽ gửi phản hồi kèm thỏa thuận bảo mật (NDA) tới{' '}
                      <span className="font-mono text-zinc-100">{contactEmail}</span> trong 24 giờ.
                    </p>
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setFormSubmitted(false);
                          setContactMessage('');
                        }}
                        className="px-4 py-2 text-xs font-semibold text-zinc-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors"
                      >
                        Gửi Thêm Yêu Cầu Khác
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-medium text-zinc-300 mb-2"
                        >
                          Họ và Tên Người Liên Hệ *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="Nguyễn Văn A"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0B0E] border border-white/10 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-medium text-zinc-300 mb-2"
                        >
                          Email Doanh Nghiệp *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="name@studio.com"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0B0E] border border-white/10 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="contact-org"
                          className="block text-xs font-medium text-zinc-300 mb-2"
                        >
                          Công Ty / Nhà Phát Hành
                        </label>
                        <input
                          id="contact-org"
                          type="text"
                          value={contactOrg}
                          onChange={(e) => setContactOrg(e.target.value)}
                          placeholder="Tên Studio hoặc Nhà đầu tư"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0B0E] border border-white/10 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-service"
                          className="block text-xs font-medium text-zinc-300 mb-2"
                        >
                          Hạng Mục Quan Tâm
                        </label>
                        <select
                          id="contact-service"
                          value={contactService}
                          onChange={(e) => setContactService(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0B0E] border border-white/10 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                        >
                          {STUDIO_SERVICES.map((s) => (
                            <option key={s.id} value={s.title}>
                              {s.title}
                            </option>
                          ))}
                          <option value="Hợp tác Phát hành IP Game của EntenalSmp">
                            Hợp tác Phát hành IP Game của EntenalSmp
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-medium text-zinc-300 mb-2"
                      >
                        Tóm Tắt Dự Án & Mục Tiêu Kỹ Thuật *
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Chia sẻ về thể loại game, nền tảng mục tiêu (PC/PS5/Xbox) và lộ trình dự kiến..."
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0B0E] border border-white/10 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    {formError && (
                      <p role="alert" className="text-xs font-medium text-amber-400">
                        {formError}
                      </p>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                      <p className="text-xs text-zinc-500">
                        Mọi thông tin dự án đều được bảo vệ theo cam kết bảo mật NDA tiêu chuẩn.
                      </p>

                      <button
                        type="submit"
                        className="px-6 py-3 text-xs font-semibold text-zinc-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Gửi Đề Xuất Hợp Tác
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 7. QUIET EDITORIAL FOOTER */}
      <footer className="border-t border-white/[0.08] bg-[#0A0B0E] py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-2">
            <a
              href="#top"
              className="font-display text-lg font-bold tracking-tight text-zinc-100"
            >
              EntenalSmp
            </a>
            <p className="text-xs text-zinc-400">
              Sáng tạo thế giới không giới hạn · Chất lượng tạo nên đẳng cấp
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-400">
            <a href="#du-an" className="hover:text-zinc-100 transition-colors">
              Dự Án Game
            </a>
            <a href="#dich-vu" className="hover:text-zinc-100 transition-colors">
              Dịch Vụ Sản Xuất
            </a>
            <a href="#uoc-tinh" className="hover:text-zinc-100 transition-colors">
              Ước Tính Quy Mô
            </a>
            <a href="#doi-ngu" className="hover:text-zinc-100 transition-colors">
              Đội Ngũ Cốt Cán
            </a>
            <a href="#lien-he" className="hover:text-zinc-100 transition-colors">
              Liên Hệ
            </a>
          </div>

          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} EntenalSmp Interactive Entertainment. Bảo lưu mọi quyền.
          </p>
        </div>
      </footer>

      {/* Interactive Game Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquireProject={(projectTitle) =>
          handlePrefillInquiry(
            `Tôi quan tâm đến bản dựng thử nghiệm và cơ hội hợp tác liên quan tới dự án "${projectTitle}".`,
            'Hợp tác Phát hành IP Game của EntenalSmp'
          )
        }
      />
    </div>
  );
}
