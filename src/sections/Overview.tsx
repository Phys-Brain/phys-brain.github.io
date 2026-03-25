import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Database, Brain, Cpu, Lightbulb, Target, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    icon: Database,
    title: '3000+ 小时',
    description: '人类视频语料',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Brain,
    title: '物理智能',
    description: '多模态大模型',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Cpu,
    title: 'TwinBrainVLA',
    description: '双脑融合架构',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Lightbulb,
    title: 'LangForce',
    description: '创新训练策略',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Target,
    title: 'SOTA 性能',
    description: '多项基准最优',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Zap,
    title: '零成本注入',
    description: '开源视频数据',
    color: 'from-rose-500 to-red-500',
  },
];

export default function Overview() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards stagger animation
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { y: 60, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="overview"
      ref={sectionRef}
      className="relative py-24 bg-white overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-indigo-50/50 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-full mb-4">
            项目概述
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            从<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">动作模仿</span>
            到<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600">物理常识</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            PhysBrain 1.0 构建了全球首个可规模化将海量人类视频转化为多模态大模型训练数据的物理智能数据引擎
          </p>
        </div>

        {/* Main Content */}
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left: Description */}
          <div className="space-y-6">
            <div className="prose prose-lg text-gray-600">
              <p className="leading-relaxed">
                在全球具身智能技术加速突破的背景下，作为通用人工智能（AGI）在物理世界的核心表现形式，
                具身智能正从"动作模仿"向"物理常识习得"实现关键范式迁移。
              </p>
              <p className="leading-relaxed">
                <strong className="text-gray-900">PhysBrain 1.0</strong> 正是这一范式变革的核心推动者——
                其构建了全球首个可规模化将海量人类视频转化为多模态大模型训练数据的
                <span className="text-indigo-600 font-medium">物理智能数据引擎</span>，
                成功突破了具身智能数据获取与模型训练的核心瓶颈。
              </p>
              <p className="leading-relaxed">
                该数据引擎将三千小时人类视频从真实三维环境中的空间关系、动作可行性以及多步逻辑推理等多维度完成精准的数据标注，
                生产出规模化、高可扩展的具身训练语料。
              </p>
            </div>

            {/* Key Achievement */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">核心突破</h4>
                  <p className="text-gray-600 text-sm">
                    不再局限于简单的动作复刻，而是深度挖掘视频背后蕴含的
                    <span className="text-indigo-600 font-medium">物理规律与常识逻辑</span>，
                    成功激发出模型的"类人"物理智能。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Video Placeholder */}
          <div className="relative">
            <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl">
              {/* Video Placeholder Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white/20 transition-colors group">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1 group-hover:scale-110 transition-transform" />
                  </div>
                  <p className="text-white/80 text-sm">观看 PhysBrain 1.0 演示视频</p>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 left-4 flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>

              {/* Grid Overlay */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, #fff 1px, transparent 1px),
                      linear-gradient(to bottom, #fff 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                  }}
                />
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">↑</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">性能提升</p>
                  <p className="text-lg font-bold text-gray-800">+35%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {highlights.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
              >
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
              <p className="text-xs text-gray-500 mt-1">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
