import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Cpu, Zap, ArrowRight, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const architectureModules = [
  {
    id: 'physbrain',
    icon: Brain,
    title: 'PhysBrain 1.0',
    subtitle: '基座模型',
    description: '构建全球首个物理智能数据引擎，将海量人类视频转化为多模态大模型训练数据，激发出模型的"类人"物理智能。',
    features: [
      '3000+ 小时人类视频语料',
      '多维度精准数据标注',
      '空间关系与动作可行性理解',
      '多步逻辑推理能力',
    ],
    color: 'from-indigo-500 to-blue-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    image: '/PhysBrain-arch.png',
  },
  {
    id: 'twinbrain',
    icon: Cpu,
    title: 'TwinBrainVLA',
    subtitle: '"双脑融合"架构',
    description: '原创性提出"双脑融合"架构，实现通用大脑与具身大脑协同赋能，达成"通专融合"，兼顾通用性与专业性。',
    features: [
      '通用大脑保留语义理解',
      '具身大脑专项训练',
      '解决灾难性遗忘难题',
      '高效领域适配',
    ],
    color: 'from-purple-500 to-pink-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    image: '/TwinBrainVLA-arch.svg',
    blend: true,
  },
  {
    id: 'langforce',
    icon: Zap,
    title: 'LangForce',
    subtitle: '训练策略',
    description: '从贝叶斯统计视角打破 VLA 学习中的视觉捷径困境，推动训练逻辑从"模仿动作"向"习得物理常识"深度迁移。',
    features: [
      '贝叶斯统计视角优化',
      '打破视觉捷径困境',
      '物理常识习得',
      '大幅提升学习效率',
    ],
    image: '/LangForce-arch.png',
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
  },
];

export default function Architecture() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const modulesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Diagram animation
      gsap.fromTo(
        diagramRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: diagramRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Modules animation
      if (modulesRef.current) {
        const modules = modulesRef.current.querySelectorAll('.arch-module');
        modules.forEach((module, index) => {
          gsap.fromTo(
            module,
            { x: index % 2 === 0 ? -50 : 50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: module,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }

      // SVG path drawing animation
      const paths = document.querySelectorAll('.connection-path');
      paths.forEach((path) => {
        const pathElement = path as SVGPathElement;
        const length = pathElement.getTotalLength();
        gsap.set(pathElement, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(pathElement, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: diagramRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="architecture"
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-white"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-indigo-50/30 via-purple-50/30 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Title */}
        <div ref={titleRef} className="mb-16 text-center">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium rounded-full bg-amber-50 text-amber-700">
            模型架构
          </span>
          <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            三大核心技术<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">深度融合</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            以 PhysBrain 1.0 为基座、TwinBrainVLA 为架构、LangForce 为策略，
            助力具身通用智能的持续提升
          </p>
        </div>

        {/* Architecture Diagram */}
        <div ref={diagramRef} className="mb-20">
          <div className="relative p-8 border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl lg:p-12">
            {/* SVG Connections */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 0 }}
            >
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="url(#lineGradient)" />
                </marker>
              </defs>
              {/* Connection lines will be drawn here */}
              <path
                className="connection-path"
                d="M 200 100 Q 400 50 600 100"
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
              <path
                className="connection-path"
                d="M 600 100 Q 800 150 1000 100"
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
            </svg>

            {/* Architecture Flow */}
            <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
              {architectureModules.map((module, index) => (
                <div
                  key={module.id}
                  className={`relative ${index < 2 ? 'lg:after:content-[""] lg:after:absolute lg:after:top-1/2 lg:after:-right-4 lg:after:w-8 lg:after:h-0.5 lg:after:bg-gradient-to-r lg:after:from-indigo-300 lg:after:to-purple-300' : ''}`}
                >
                  <div
                    className={`${module.bgColor} rounded-2xl p-6 border ${module.borderColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                  >
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`w-14 h-14 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center shadow-lg`}
                      >
                        <module.icon className="text-white w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {module.title}
                        </h3>
                        <p className={`text-sm font-medium bg-gradient-to-r ${module.color} bg-clip-text text-transparent`}>
                          {module.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mb-4 text-sm leading-relaxed text-gray-600">
                      {module.description}
                    </p>

                    {/* Arrow for flow */}
                    {index < 2 && (
                      <div className="absolute z-20 hidden -translate-y-1/2 lg:flex -right-4 top-1/2">
                        <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-md">
                          <ArrowRight className="w-4 h-4 text-indigo-500" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Output Label */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-3 px-8 py-4 text-white rounded-full shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600">
                <span className="font-semibold">具身通用智能</span>
                <span className="w-px h-4 bg-white/30" />
                <span className="text-sm opacity-90">Embodied General Intelligence</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Modules */}
        <div ref={modulesRef} className="space-y-8">
          {architectureModules.map((module, index) => (
            <div
              key={module.id}
              className={`arch-module grid lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center`}
                  >
                    <module.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {module.title}
                    </h3>
                    <p className={`text-sm font-medium bg-gradient-to-r ${module.color} bg-clip-text text-transparent`}>
                      {module.subtitle}
                    </p>
                  </div>
                </div>

                <p className="mb-6 leading-relaxed text-gray-600">
                  {module.description}
                </p>

                <ul className="space-y-3">
                  {module.features.map((feature, fIndex) => (
                    <li
                      key={fIndex}
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <CheckCircle
                        className={`w-5 h-5 flex-shrink-0 bg-gradient-to-br ${module.color}`}
                        style={{
                          background: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual */}
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div
                  className={`relative aspect-video ${module.bgColor} rounded-2xl border ${module.borderColor} overflow-hidden`}
                >
                  {'image' in module && module.image ? (
                    <img
                      src={module.image as string}
                      alt={`${module.title} 架构图`}
                      className="object-contain w-full h-full"
                      style={'blend' in module && module.blend ? { mixBlendMode: 'multiply' } : undefined}
                    />
                  ) : (
                    <>
                      {/* Abstract Pattern */}
                      <div className="absolute inset-0 opacity-20">
                        <div
                          className="w-full h-full"
                          style={{
                            backgroundImage: `
                              linear-gradient(to right, currentColor 1px, transparent 1px),
                              linear-gradient(to bottom, currentColor 1px, transparent 1px)
                            `,
                            backgroundSize: '30px 30px',
                          }}
                        />
                      </div>

                      {/* Center Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className={`w-24 h-24 bg-gradient-to-br ${module.color} rounded-2xl flex items-center justify-center shadow-xl`}
                        >
                          <module.icon className="w-12 h-12 text-white" />
                        </div>
                      </div>

                      {/* Floating Elements */}
                      <div className="absolute w-8 h-8 rounded-lg top-4 left-4 bg-white/50" />
                      <div className="absolute w-6 h-6 rounded-full bottom-4 right-4 bg-white/50" />
                      <div className="absolute w-4 h-4 rotate-45 top-1/2 right-8 bg-white/50" />
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
