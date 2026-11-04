export interface GameProject {
  id: string;
  title: string;
  englishSubtitle: string;
  category: 'aaa-console' | 'scifi-tactical' | 'vietnam-myth';
  categoryLabel: string;
  genre: string;
  platforms: string;
  engine: string;
  releaseStatus: string;
  imageUrl: string;
  aspectRatio: '16:9' | '4:3';
  shortSummary: string;
  loreDescription: string;
  keyHighlightMetric: string;
  gameplayPillars: string[];
  techSpecs: {
    targetFps: string;
    lightingPipeline: string;
    polyBudget: string;
    networkArchitecture: string;
  };
  sceneHotspots: {
    x: number;
    y: number;
    label: string;
    detail: string;
  }[];
}

export interface StudioService {
  index: string;
  id: string;
  title: string;
  subtitle: string;
  colSpan: 'lg:col-span-7' | 'lg:col-span-5';
  description: string;
  deliverables: string[];
  proofMetric: string;
  proofContext: string;
  estimatedTimeline: string;
  coreTechnologies: string[];
}

export interface PartnerTestimonial {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  organization: string;
  projectDelivered: string;
  quantifiedOutcome: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: 'direction' | 'engineering' | 'art';
  departmentLabel: string;
  yearsExperience: number;
  shippedTitlesCount: number;
  signatureFocus: string;
  bio: string;
  previousCredits: string;
}

export const STUDIO_METRICS = [
  {
    value: '14+',
    unit: 'Tựa Game Đa Nền Tảng',
    context: 'Phát hành trên PC, PS5, Xbox Series X|S từ 2019–2026',
  },
  {
    value: '6.8M',
    unit: 'Người Chơi Toàn Cầu',
    context: 'Tổng lượt tải và sở hữu bản quyền trên Steam & Console',
  },
  {
    value: '125',
    unit: 'Kỹ Sư & Nghệ Sĩ 3D',
    context: 'Làm việc tại studio TP. Hồ Chí Minh và văn phòng Tokyo',
  },
  {
    value: '99.4%',
    unit: 'Độ Ổn Định Máy Chủ',
    context: 'Vận hành hệ thống thực tế với hơn 420.000 CCU đỉnh điểm',
  },
];

export const GAME_PROJECTS: GameProject[] = [
  {
    id: 'aethelgard',
    title: 'Biên Niên Sử Aethelgard',
    englishSubtitle: 'Chronicles of Aethelgard: The Sunken Crown',
    category: 'aaa-console',
    categoryLabel: 'AAA & Console',
    genre: 'Hành Động Nhập Vai (Action RPG)',
    platforms: 'PC · PlayStation 5 · Xbox Series X|S',
    engine: 'Unreal Engine 5.4',
    releaseStatus: 'Phát hành Quý 4/2026',
    imageUrl: '/images/hero-aethelgard.svg',
    aspectRatio: '16:9',
    shortSummary:
      'Bước vào lục địa Aethelgard bị chia cắt bởi nhật thực vĩnh cửu, nơi những pháo đài đá cổ đại lơ lửng giữa vực thẳm sương mù và các hiệp sĩ cuối cùng chiến đấu giành lại ngai vàng đã mất.',
    loreDescription:
      'Được phát triển trong suốt 4 năm bởi đội ngũ cốt cán tại EntenalSmp, Biên Niên Sử Aethelgard kết hợp hệ thống chiến đấu cận chiến chuẩn xác theo từng khung hình với thế giới mở liền mạch rộng 64 km². Mọi thành trì, hầm ngục và quần xã sinh vật đều được chế tác thủ công không qua tạo sinh ngẫu nhiên lặp lại.',
    keyHighlightMetric: '680.000+ lượt thêm vào Wishlist trên Steam sau 60 ngày công bố',
    gameplayPillars: [
      'Hệ thống đỡ đòn và phản công dựa trên vật lý va chạm thực tế của từng loại vũ khí hạng nặng.',
      'Chu kỳ ánh sáng Nhật Thực động làm biến đổi hành vi kẻ địch và mở ra các lối đi ẩn trên pháo đài bay.',
      'Hợp tác 3 người chơi liền mạch không giới hạn vùng lãnh thổ.',
    ],
    techSpecs: {
      targetFps: '60 FPS ổn định ở 4K TSR / DLSS 3.7 (16.6ms/frame)',
      lightingPipeline: 'Lumen Global Illumination + Volumetric Dusk Fog tùy biến',
      polyBudget: '18.5 triệu đa giác/khung hình qua Nanite Virtualized Geometry',
      networkArchitecture: 'Dedicated Server 60Hz kèm Rollback vị trí cận chiến',
    },
    sceneHotspots: [
      {
        x: 62,
        y: 42,
        label: 'Nhật Thực Vĩnh Cửu & Volumetric Ray',
        detail: 'Hệ thống tán xạ khí quyển tính toán theo thời gian thực trên GPU chỉ tốn 1.1ms mỗi khung hình.',
      },
      {
        x: 56,
        y: 28,
        label: 'Thành Trì Đá Lơ Lửng Nanite',
        detail: 'Kiến trúc cổ đại gồm 4.2 triệu đa giác nguyên bản, truyền tải liền mạch không có hiện tượng pop-in LOD.',
      },
      {
        x: 24,
        y: 68,
        label: 'Hệ Thống Giáp & Vải Mô Phỏng Chaos',
        detail: 'Áo choàng và giáp thép đa lớp phản ứng trực tiếp với hướng gió hẻm núi và lực vung kiếm.',
      },
    ],
  },
  {
    id: 'valkyrie-void',
    title: 'Valkyrie: Hồi Ức Hư Không',
    englishSubtitle: 'Valkyrie: Echoes of the Outer Rim',
    category: 'scifi-tactical',
    categoryLabel: 'Sci-Fi Tactical',
    genre: 'Bắn Súng Chiến Thuật Không Gian',
    platforms: 'PC · PlayStation 5',
    engine: 'Unreal Engine 5 & Custom Vulkan Renderer',
    releaseStatus: 'Đã phát hành · 1.42M bản bán ra',
    imageUrl: '/images/game-valkyrie-void.svg',
    aspectRatio: '4:3',
    shortSummary:
      'Chỉ huy biệt đội trinh sát quỹ đạo xâm nhập các trạm không gian bị bỏ hoang quanh hành tinh khí khổng lồ, thu hồi lõi năng lượng cổ vật trước khi bão bức xạ xóa sổ toàn bộ khu vực.',
    loreDescription:
      'Valkyrie: Hồi Ức Hư Không định hình lại dòng game bắn súng chiến thuật góc nhìn thứ nhất với môi trường trọng lực biến thiên. Người chơi có thể tắt từ trường giày để di chuyển tự do ngoài vỏ trạm vũ trụ hoặc phá hủy cửa khoang để tạo chênh lệch áp suất cuốn phăng kẻ địch.',
    keyHighlightMetric: '1.42 triệu bản bán ra trong 90 ngày đầu · 91% đánh giá Rất Tích Cực',
    gameplayPillars: [
      'Cơ chế chiến đấu chuyển tiếp mượt mà giữa hành lang có trọng lực và không gian chân không 360 độ.',
      'Hệ thống âm thanh mô phỏng truyền dẫn qua kết cấu kim loại khi chiến đấu trong môi trường chân không.',
      'Tùy biến vũ khí mô-đun với hơn 140 linh kiện quang học, nòng giảm thanh từ trường và đạn đạo vật lý.',
    ],
    techSpecs: {
      targetFps: '120 FPS trên PC & chế độ Performance PS5 (8.3ms/frame)',
      lightingPipeline: 'Ray-Traced Hard-Surface Reflections trên bề mặt kim loại trạm vũ trụ',
      polyBudget: '12 triệu đa giác/khung hình với hệ thống phá hủy cục bộ',
      networkArchitecture: 'Máy chủ cụm khu vực độ trễ dưới 24ms tại Đông Nam Á, Bắc Mỹ và Châu Âu',
    },
    sceneHotspots: [
      {
        x: 64,
        y: 41,
        label: 'Vành Đai Hành Tinh Khí Khổng Lồ',
        detail: 'Hàng chục nghìn thiên thạch băng trong vành đai phản chiếu ánh sáng mặt trời theo góc quay quỹ đạo.',
      },
      {
        x: 50,
        y: 62,
        label: 'Khoang Đáp Chiến Đấu Cơ Valkyrie-09',
        detail: 'Mô hình cơ khí hard-surface chi tiết cao với hệ thống đèn dẫn đường tungsten tương phản cao.',
      },
    ],
  },
  {
    id: 'son-tinh',
    title: 'Sơn Tinh: Huyền Thoại Tản Viên',
    englishSubtitle: 'Son Tinh: Legends of the Sacred Peak',
    category: 'vietnam-myth',
    categoryLabel: 'Sử Thi Việt Nam',
    genre: 'Phiêu Lưu Hành Động Thần Thoại',
    platforms: 'PC · Console',
    engine: 'Unreal Engine 5.4',
    releaseStatus: 'Đang phát triển · Vertical Slice hoàn tất',
    imageUrl: '/images/game-son-tinh.svg',
    aspectRatio: '4:3',
    shortSummary:
      'Lấy cảm hứng từ truyền thuyết Sơn Tinh – Thủy Tinh và văn hóa Đông Sơn rực rỡ, trò chơi đưa người chơi vào hành trình trấn giữ non thiêng Tản Viên trước những cơn đại hồng thủy dữ dội.',
    loreDescription:
      'EntenalSmp hợp tác cùng các nhà nghiên cứu mỹ thuật cổ truyền Việt Nam để tái hiện kiến trúc đền đài mái cong, hoa văn trống đồng Ngọc Lũ và vũ khí thời Hùng Vương bằng ngôn ngữ đồ họa 3D đương đại. Hệ thống mặt nước và dòng chảy lũ quét được mô phỏng vật lý thời gian thực, trực tiếp thay đổi địa hình chiến đấu.',
    keyHighlightMetric: 'Giải Nhất Thiết Kế Mỹ Thuật Xuất Sắc tại Asia Game Dev Showcase 2026',
    gameplayPillars: [
      'Điều khiển quyền năng đất đá và địa chấn để dựng lũy, nâng cầu đá hoặc triệu hồi cổ thụ giữa trận đánh.',
      'Thủy chiến động chống lại các thủy quái khổng lồ với hệ thống sóng thần tương tác trực tiếp với địa hình.',
      'Âm nhạc giao hưởng kết hợp nhạc cụ dân tộc (đàn đá, sáo trúc, trống đồng) biến chuyển theo nhịp độ giao tranh.',
    ],
    techSpecs: {
      targetFps: '60 FPS ổn định với mô phỏng chất lỏng Fluid Grid thời gian thực',
      lightingPipeline: 'Ánh sáng bình minh nhiệt đới xuyên qua sương mù núi đá vôi nhiều lớp',
      polyBudget: '15 triệu đa giác cùng hệ thống thảm thực vật rừng nhiệt đới mật độ cao',
      networkArchitecture: 'Chơi đơn cốt truyện chuyên sâu kèm chế độ Co-op 2 người bảo vệ thành trì',
    },
    sceneHotspots: [
      {
        x: 50,
        y: 36,
        label: 'Thái Dương Đông Sơn Cổ Ngữ',
        detail: 'Hiệu ứng vầng thái dương kết hợp họa tiết trống đồng cổ đại khắc họa chu kỳ thời tiết thần thoại.',
      },
      {
        x: 54,
        y: 48,
        label: 'Đền Thượng Tản Viên Trên Đỉnh Đá Vôi',
        detail: 'Kiến trúc gỗ và đá xanh được phục dựng tỉ mỉ từ tư liệu mỹ thuật cổ Việt Nam.',
      },
    ],
  },
  {
    id: 'iron-bastion',
    title: 'Pháo Đài Sắt: Kỷ Nguyên Tro Tàn',
    englishSubtitle: 'Iron Bastion: Age of Cinders',
    category: 'aaa-console',
    categoryLabel: 'AAA & Console',
    genre: 'Chiến Thuật Công Thành & Sinh Tồn Co-op',
    platforms: 'PC · Steam Deck · Xbox Series X|S',
    engine: 'Entenal Core C++ & Vulkan',
    releaseStatus: 'Đã phát hành · 94% Đánh Giá Tích Cực',
    imageUrl: '/images/game-iron-bastion.svg',
    aspectRatio: '4:3',
    shortSummary:
      'Vận hành một pháo đài cơ khí khổng lồ di chuyển trên những cây cầu đá cổ đại, điều phối lò phản ứng nhiệt luyện và phòng thủ trước hàng vạn sinh vật bóng đêm.',
    loreDescription:
      'Sử dụng nhánh engine C++ tùy biến của EntenalSmp để xử lý đồng thời hơn 25.000 đơn vị quân trên màn hình mà không làm giảm tốc độ khung hình, Pháo Đài Sắt mang lại cảm giác choáng ngợp của những trận công thành quy mô đại chiến.',
    keyHighlightMetric: '94% đánh giá Cực Kỳ Tích Cực từ hơn 38.000 người chơi trên Steam',
    gameplayPillars: [
      'Mô phỏng đồng thời 25.000 thực thể kẻ địch sử dụng kiến trúc Data-Oriented ECS (Entity Component System).',
      'Xây dựng và nâng cấp hệ thống bánh răng, pháo đài nhiệt luyện và cầu cạn ngay trong lúc giao tranh.',
      'Hỗ trợ Steam Deck Verified với thời lượng pin tối ưu và giao diện điều khiển tay cầm chuyên biệt.',
    ],
    techSpecs: {
      targetFps: '90 FPS trên PC / 60 FPS ổn định trên Steam Deck OLED',
      lightingPipeline: 'Clustered Forward+ Rendering hỗ trợ 4.096 nguồn sáng động từ lò luyện kim',
      polyBudget: 'GPU Instancing cho hàng vạn đơn vị cơ khí và mảnh vỡ vật lý',
      networkArchitecture: 'Deterministic Lockstep đồng bộ trạng thái 8 người chơi chỉ với băng thông 45 KB/s',
    },
    sceneHotspots: [
      {
        x: 50,
        y: 48,
        label: 'Lò Phản Ứng Nhiệt Luyện Trung Tâm',
        detail: 'Cung cấp năng lượng cho toàn bộ hệ thống bánh răng phòng thủ và sưởi ấm thành trì.',
      },
    ],
  },
];

export const STUDIO_SERVICES: StudioService[] = [
  {
    index: '01',
    id: 'full-cycle',
    title: 'Phát Triển Game Trọn Gói (Full-Cycle Production)',
    subtitle: 'Từ ý tưởng nguyên bản đến phát hành toàn cầu trên PC & Console',
    colSpan: 'lg:col-span-7',
    description:
      'Chúng tôi đồng hành cùng các nhà phát hành và chủ sở hữu IP xây dựng trọn vẹn tựa game từ giai đoạn tiền kỳ (Pre-production), chế tác bản dựng mẫu (Vertical Slice), sản xuất đại trà cho đến khi đạt chứng nhận Lotcheck/TRC trên PlayStation, Xbox, Nintendo Switch và Steam.',
    deliverables: [
      'Tài liệu thiết kế hệ thống (GDD), kịch bản phân nhánh và nguyên mẫu gameplay có thể chơi thử trong 8 tuần.',
      'Xây dựng toàn bộ mã nguồn, tài nguyên mỹ thuật 3D, âm thanh tương tác và bản địa hóa 12 ngôn ngữ.',
      'Kiểm thử QA tự động, cân bằng độ khó và hỗ trợ vận hành bản vá ngày đầu phát hành (Day-1 Patch).',
    ],
    proofMetric: '100% dự án vượt qua kiểm duyệt chứng chỉ Sony PS5 & Microsoft Xbox ngay lần đệ trình đầu tiên',
    proofContext: 'Dựa trên 9 dự án Full-Cycle đã bàn giao giai đoạn 2022–2026',
    estimatedTimeline: '14 – 28 tháng tùy quy mô thế giới',
    coreTechnologies: ['Unreal Engine 5.4', 'Unity 6 LTS', 'C++20', 'Wwise Audio'],
  },
  {
    index: '02',
    id: 'co-dev-engineering',
    title: 'Đồng Phát Triển & Tối Ưu Hóa Engine (Co-Development)',
    subtitle: 'Mở rộng năng lực kỹ thuật đồ họa, C++ và mạng thời gian thực',
    colSpan: 'lg:col-span-5',
    description:
      'Đội ngũ kỹ sư đồ họa và hệ thống của EntenalSmp tích hợp trực tiếp vào quy trình Perforce/Git của đối tác để giải quyết các bài toán kỹ thuật khó nhất: tối ưu hóa tốc độ khung hình, viết custom shader HLSL và chuyển đổi hệ thống (Porting) sang thế hệ phần cứng mới.',
    deliverables: [
      'Tối ưu hóa CPU/GPU giảm thời gian dựng hình từ 28ms xuống dưới 16.6ms (chuẩn 60 FPS ổn định).',
      'Xây dựng kiến trúc mạng Dedicated Server, Rollback Netcode và chống gian lận cấp độ máy chủ.',
      'Chuyển hệ (Porting) nguyên bản giữa PC, PS5, Xbox Series X|S và thiết bị cầm tay Steam Deck.',
    ],
    proofMetric: '-38% thời gian dựng khung hình GPU trung bình trong vòng 16 tuần tối ưu hóa',
    proofContext: 'Đo lường thực tế trên 5 dự án hành động thế giới mở sử dụng Unreal Engine 5',
    estimatedTimeline: '3 – 12 tháng tích hợp linh hoạt',
    coreTechnologies: ['HLSL / Vulkan / DirectX 12', 'RenderDoc & Unreal Insights', 'Perforce Helix'],
  },
  {
    index: '03',
    id: '3d-art-cinematics',
    title: 'Mỹ Thuật 3D Thế Hệ Mới, Concept Art & Cinematics',
    subtitle: 'Định hình bản sắc thị giác độc bản và chuỗi cắt cảnh điện ảnh',
    colSpan: 'lg:col-span-5',
    description:
      'Phòng lab mỹ thuật của EntenalSmp quy tụ các nghệ sĩ Concept Art, điêu khắc nhân vật ZBrush và đạo diễn diễn hoạt sở hữu phòng thu Motion Capture quang học riêng biệt, đảm bảo từng nhân vật và công trình kiến trúc đều mang hồn cốt riêng.',
    deliverables: [
      'Concept Art định hướng thế giới, thiết kế nhân vật, quái vật và vũ khí cơ khí độ chi tiết cao.',
      'Mô hình 3D chuẩn PBR/Nanite, rigging khuôn mặt (Facial Rigging) và diễn hoạt chuyển động thực tế.',
      'Dựng phim cắt cảnh (In-engine Cinematics) và trailer quảng bá chuẩn 4K/60FPS.',
    ],
    proofMetric: '450+ tài nguyên nhân vật & môi trường chuẩn AAA bàn giao mỗi quý',
    proofContext: 'Quy trình kiểm soát chất lượng 3 bước với tỷ lệ duyệt ngay đạt 96.8%',
    estimatedTimeline: 'Theo từng gói Milestone 4 – 8 tuần',
    coreTechnologies: ['ZBrush & Maya', 'Substance 3D Painter', 'Houdini Procedural', 'Optical Mocap'],
  },
  {
    index: '04',
    id: 'live-ops-systems',
    title: 'Kiến Trúc Máy Chủ & Vận Hành Live-Ops Đa Nền Tảng',
    subtitle: 'Hạ tầng đám mây chịu tải cao, ghép trận thông minh và kinh tế trong game',
    colSpan: 'lg:col-span-7',
    description:
      'Một tựa game nhiều người chơi thành công đòi hỏi nền tảng hạ tầng không bao giờ gián đoạn. Chúng tôi thiết kế hệ thống tài khoản liên thông (Cross-progression), ghép trận dựa trên kỹ năng (SBMM) và công cụ quản trị sự kiện trực tiếp.',
    deliverables: [
      'Hệ thống Cross-play và đồng bộ hồ sơ người chơi tức thì giữa Steam, PlayStation và Xbox.',
      'Hạ tầng cụm máy chủ tự động mở rộng (Auto-scaling Kubernetes/Agones) theo lưu lượng người chơi.',
      'Bảng điều khiển phân tích hành vi người chơi (Telemetry) và cân bằng nền kinh tế vật phẩm.',
    ],
    proofMetric: '420.000+ người chơi đồng thời (CCU) vận hành ổn định trong tuần lễ ra mắt không sập nguồn',
    proofContext: 'Hạ tầng thực chiến trên dòng game bắn súng chiến thuật Valkyrie',
    estimatedTimeline: '4 – 10 tháng thiết kế & vận hành',
    coreTechnologies: ['Go & Rust Backend', 'Kubernetes & Agones', 'PostgreSQL & Redis', 'PlayFab / EOS'],
  },
];

export const PARTNER_TESTIMONIALS: PartnerTestimonial[] = [
  {
    id: 'nordic-interactive',
    quote:
      'Trước khi hợp tác với EntenalSmp, bản dựng PS5 của chúng tôi thường xuyên tụt xuống 38 FPS ở các phân cảnh công thành đông quân. Đội ngũ kỹ sư đồ họa của EntenalSmp đã viết lại toàn bộ luồng xử lý bóng đổ và hiệu ứng hạt trên GPU, giúp trò chơi khóa cứng ở 60 FPS chỉ sau 14 tuần.',
    authorName: 'Henrik Lindqvist',
    authorRole: 'Giám Đốc Kỹ Thuật (CTO)',
    organization: 'Vanguard Nordic Studios (Thụy Điển)',
    projectDelivered: 'Tối ưu hóa đồ họa & Đồng phát triển Console',
    quantifiedOutcome: 'Tăng từ 38 FPS lên 60 FPS cố định ở độ phân giải 4K Upscaled trước hạn phát hành 6 tuần',
  },
  {
    id: 'akatsuki-entertainment',
    quote:
      'Chất lượng mỹ thuật 3D và diễn hoạt vũ khí mà EntenalSmp bàn giao vượt xa tiêu chuẩn thông thường. Họ không chỉ làm theo bản vẽ có sẵn mà còn chủ động đề xuất cải tiến cấu trúc khớp xương giúp các đòn đánh cận chiến trong game có sức nặng và độ phản hồi thuyết phục hơn hẳn.',
    authorName: 'Kenjiro Takahashi',
    authorRole: 'Đạo Diễn Sản Xuất (Executive Producer)',
    organization: 'Kurogane Digital Entertainment (Tokyo)',
    projectDelivered: 'Sản xuất 180 mô hình nhân vật, giáp trụ & chuỗi diễn hoạt chiến đấu',
    quantifiedOutcome: 'Rút ngắn 32% thời gian sản xuất tài nguyên mỹ thuật cho bản mở rộng toàn cầu',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'minh-tran',
    name: 'Trần Hoàng Minh',
    role: 'Nhà Sáng Lập & Đạo Diễn Trò Chơi (Game Director)',
    department: 'direction',
    departmentLabel: 'Đạo Diễn & Thiết Kế',
    yearsExperience: 14,
    shippedTitlesCount: 9,
    signatureFocus: 'Thiết kế thế giới mở liền mạch & nhịp độ chiến đấu cận chiến',
    bio: 'Từng tham gia điều phối phát triển nhiều tựa game hành động nhập vai tại Tokyo và Montreal trước khi sáng lập EntenalSmp. Anh trực tiếp định hướng tầm nhìn "Sáng tạo thế giới không giới hạn" cho toàn bộ các IP gốc của studio.',
    previousCredits: 'Cựu Lead Level Designer tại các dự án Action RPG đa nền tảng',
  },
  {
    id: 'lan-nguyen',
    name: 'Nguyễn Phương Lan',
    role: 'Giám Đốc Kỹ Thuật Engine (Principal Graphics Architect)',
    department: 'engineering',
    departmentLabel: 'Kỹ Thuật Engine',
    yearsExperience: 12,
    shippedTitlesCount: 11,
    signatureFocus: 'Kiến trúc kết xuất Vulkan/DirectX 12 & Tối ưu hóa thời gian thực',
    bio: 'Chuyên gia tối ưu hóa phần cứng cấp thấp và lập trình shader. Cô là tác giả của bộ khung kết xuất ánh sáng khí quyển giúp Biên Niên Sử Aethelgard đạt chuẩn 60 FPS ổn định trên cả PC lẫn Console.',
    previousCredits: 'Chuyên gia C++ Graphics & Hệ thống mô phỏng vật lý đám đông',
  },
  {
    id: 'khanh-le',
    name: 'Lê Vũ Quốc Khánh',
    role: 'Giám Đốc Mỹ Thuật (Studio Art Director)',
    department: 'art',
    departmentLabel: 'Mỹ Thuật & Thế Giới',
    yearsExperience: 13,
    shippedTitlesCount: 8,
    signatureFocus: 'Kiến trúc giả tưởng đen tối & chuyển thể mỹ thuật dân gian Việt Nam',
    bio: 'Người đặt nền móng cho triết lý thẩm mỹ tại EntenalSmp: kết hợp tỷ lệ kiến trúc đồ sộ với ánh sáng tương phản giàu cảm xúc điện ảnh, từ trạm vũ trụ lạnh giá đến đỉnh núi Tản Viên hùng vĩ.',
    previousCredits: 'Giải Nhất Concept Art Quốc Tế & Đạo diễn hình ảnh 3D',
  },
  {
    id: 'bao-vo',
    name: 'Võ Gia Bảo',
    role: 'Trưởng Bộ Phận Kiến Trúc Mạng & Live-Ops',
    department: 'engineering',
    departmentLabel: 'Kỹ Thuật Engine',
    yearsExperience: 10,
    shippedTitlesCount: 7,
    signatureFocus: 'Hệ thống máy chủ phân tán độ trễ thấp & đồng bộ trạng thái vật lý',
    bio: 'Chịu trách nhiệm thiết kế hạ tầng mạng chịu tải hơn 420.000 người chơi đồng thời cho dòng game Valkyrie, đảm bảo mọi pha đấu súng và phản đòn diễn ra chính xác tới từng mili-giây.',
    previousCredits: 'Kỹ sư trưởng hệ thống Backend cụm máy chủ toàn cầu',
  },
];
