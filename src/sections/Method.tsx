import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Film, Layers, Atom, Cog, Box, GitMerge } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const methodCards = [
  {
    icon: Film,
    title: '大规模视频语料库',
    description:
      '将三千小时人类视频从真实三维环境中的空间关系、动作可行性以及多步逻辑推理等多维度完成精准的数据标注，生产出规模化、高可扩展的具身训练语料。',
    image: '/card-video-corpus.jpg',
    color: 'from-cyan-500 to-blue-600',
    size: 'large',
  },
  {
    icon: Layers,
    title: '多模态学习',
    description:
      '将高质量语料注入多模态大模型，成功激发出模型的"类人"物理智能，推动模型从"模仿动作"升级为"理解物理"。',
    image: '/card-multimodal.jpg',
    color: 'from-purple-500 to-pink-600',
    size: 'medium',
  },
  {
    icon: Atom,
    title: '物理常识',
    description:
      '深度挖掘视频背后蕴含的物理规律与常识逻辑，让具身智能真正具备理解物理世界、自主应对复杂场景的能力。',
    image: '/card-physics.jpg',
    color: 'from-indigo-500 to-purple-600',
    size: 'medium',
  },
  {
    icon: Cog,
    title: '数据引擎',
    description:
      '构建了全球首个可规模化将海量人类视频转化为多模态大模型训练数据的物理智能数据引擎，突破数据获取瓶颈。',
    image: '/card-data-engine.jpg',
    color: 'from-amber-500 to-orange-600',
    size: 'medium',
  },
  {
    icon: Box,
    title: '空间智能',
    description:
      '在空间智能、具身交互等多项权威评测中，全面实现 SOTA（业界最优）性能，彰显了具身通用智能的核心竞争力。',
    image: '/card-spatial.jpg',
    color: 'from-emerald-500 to-teal-600',
    size: 'medium',
  },
  {
    icon: GitMerge,
    title: 'VLA 集成',
    description:
      '基于领先的 PhysBrain 基座模型，攻坚机器人控制核心技术，研发 Vision-Language-Action（VLA）机器人控制模型。',
    image: '/card-vla.jpg',
    color: 'from-rose-500 to-red-600',
    size: 'large',
  },
];

export default function Method() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      // Cards animation with 3D flip
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.method-card');
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              rotateX: 45,
              y: 100,
              opacity: 0,
            },
            {
              rotateX: 0,
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              },
              delay: index * 0.1,
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="method"
      ref={sectionRef}
      className="relative py-24 bg-gray-50 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-purple-50 text-purple-700 text-sm font-medium rounded-full mb-4">
            核心技术
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            我们的<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">方法</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            三大核心技术深度融合，从第一性原理出发缓解传统 VLA 训练导致的通用能力衰退难题
          </p>
        </div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: '1000px' }}
        >
          {methodCards.map((card, index) => (
            <div
              key={index}
              className={`method-card group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                card.size === 'large' ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Icon Badge */}
                <div
                  className={`absolute top-4 left-4 w-10 h-10 bg-gradient-to-br ${card.color} rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <card.icon className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Hover Glow Effect */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br ${card.color} opacity-5`}
              />

              {/* Border Glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.color} opacity-20 blur-sm`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Summary */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 bg-white rounded-full px-8 py-4 shadow-lg border border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-600">数据引擎</span>
            </div>
            <div className="w-px h-4 bg-gray-300" />
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-600">基座模型</span>
            </div>
            <div className="w-px h-4 bg-gray-300" />
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-600">VLA 控制</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
