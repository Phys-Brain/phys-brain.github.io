import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Play, FileText, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation - word by word
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll('.word');
        gsap.fromTo(
          words,
          { y: 100, opacity: 0, rotateX: 90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            stagger: 0.08,
            ease: 'power3.out',
            delay: 0.3,
          }
        );
      }

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.8 }
      );

      // Buttons animation
      gsap.fromTo(
        buttonsRef.current?.children || [],
        { y: 20, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          delay: 1,
        }
      );

      // Visual element animation
      gsap.fromTo(
        visualRef.current,
        { scale: 0, opacity: 0, rotate: -20 },
        {
          scale: 1,
          opacity: 1,
          rotate: 0,
          duration: 1.5,
          ease: 'elastic.out(1, 0.5)',
          delay: 0.5,
        }
      );

      // Decorative elements
      gsap.fromTo(
        decorRef.current?.children || [],
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(2)',
          delay: 1.2,
        }
      );

      // Scroll-triggered parallax for visual
      gsap.to(visualRef.current, {
        y: 100,
        rotate: 15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Title blur on scroll
      gsap.to(titleRef.current, {
        filter: 'blur(10px)',
        opacity: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '50% top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Continuous floating animation for visual
  useEffect(() => {
    if (visualRef.current) {
      gsap.to(visualRef.current, {
        y: '+=15',
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
  }, []);

  const titleWords = '打破数据依赖，激活物理智能'.split('');

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-white"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-br from-cyan-300/20 to-blue-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-br from-purple-300/20 to-pink-400/20 rounded-full blur-3xl" />

      {/* Decorative Elements */}
      <div ref={decorRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-20 w-3 h-3 bg-indigo-500 rounded-full" />
        <div className="absolute top-48 right-32 w-2 h-2 bg-cyan-500 rounded-full" />
        <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-purple-500 rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-4 h-4 border-2 border-indigo-300 rounded-full" />
        <div className="absolute bottom-1/3 right-20 w-3 h-3 border-2 border-cyan-300 rotate-45" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="relative z-10 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full border border-indigo-100 mb-6">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-700">
                PhysBrain 1.0 正式发布
              </span>
            </div>

            {/* Title */}
            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
              style={{ perspective: '1000px' }}
            >
              <span className="block overflow-hidden">
                {titleWords.map((char, i) => (
                  <span
                    key={i}
                    className="word inline-block"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {char === '，' ? <span className="inline-block">，</span> : char}
                  </span>
                ))}
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 mt-2">
                引领具身智能新范式
              </span>
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              从动作模仿到物理常识的跨越，构建全球首个可规模化将海量人类视频
              转化为多模态大模型训练数据的物理智能数据引擎
            </p>

            {/* Author Info */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                研究团队
              </span>
              <span className="hidden sm:inline">·</span>
              <span>具身智能实验室</span>
              <span className="hidden sm:inline">·</span>
              <span>2024年12月</span>
            </div>

            {/* CTA Buttons */}
            <div
              ref={buttonsRef}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              <a
                href="#overview"
                className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                <Play className="w-5 h-5" />
                观看演示
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-8 py-4 bg-white text-gray-700 font-semibold rounded-full border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300"
              >
                <FileText className="w-5 h-5" />
                阅读论文
              </a>
            </div>

            {/* Quick Links */}
            <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm">
              <a
                href="#"
                className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg">
                  🤖
                </span>
                模型下载
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg">
                  📊
                </span>
                数据集
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg">
                  💻
                </span>
                代码仓库
              </a>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div
              ref={visualRef}
              className="relative w-full max-w-lg aspect-square"
            >
              {/* Main Visual Image */}
              <img
                src="/hero-visual.png"
                alt="PhysBrain Visual"
                className="w-full h-full object-contain drop-shadow-2xl"
              />

              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-gray-100 animate-pulse">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">SOTA</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">空间智能</p>
                    <p className="text-sm font-semibold text-gray-800">业界最优</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">3K+</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">训练视频</p>
                    <p className="text-sm font-semibold text-gray-800">小时语料</p>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 -right-8 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">VLA</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">控制模型</p>
                    <p className="text-sm font-semibold text-gray-800">端到端</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
