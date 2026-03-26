import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, BarChart3, ChevronDown, ChevronUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Multimodal QA Results Data
const qaResults = [
  {
    model: 'PhysBrain 8B (Ours)',
    erqa: 0.455, physbench: 0.5024, mme: 2431.07, mmmu: 0.5522, ocrbench: 0.857, realworldqa: 0.6876, textvqa: 0.8329,
    isBest: true, isOurs: true,
  },
  {
    model: 'PhysBrain 4B (Ours)',
    erqa: 0.410, physbench: 0.4810, mme: 2385.07, mmmu: 0.4989, ocrbench: 0.830, realworldqa: 0.7268, textvqa: 0.8114,
    isBest: false, isOurs: true,
  },
  {
    model: 'Qwen3-VL-8B (Base)',
    erqa: 0.430, physbench: 0.4851, mme: 2373.27, mmmu: 0.5322, ocrbench: 0.844, realworldqa: 0.6941, textvqa: 0.8211,
    isBest: false,
  },
  {
    model: 'Qwen3-VL-4B (Base)',
    erqa: 0.3975, physbench: 0.4574, mme: 2297.47, mmmu: 0.4844, ocrbench: 0.828, realworldqa: 0.7046, textvqa: 0.8013,
    isBest: false,
  },
  {
    model: 'RynnBrain-8B',
    erqa: 0.4325, physbench: 0.4656, mme: 2456.54, mmmu: 0.5611, ocrbench: 0.833, realworldqa: 0.5320, textvqa: 0.8196,
    isBest: false,
  },
  {
    model: 'RoboBrain2.5-8B',
    erqa: 0.4325, physbench: 0.4923, mme: 2410.04, mmmu: 0.5456, ocrbench: 0.844, realworldqa: 0.7007, textvqa: 0.8079,
    isBest: false,
  },
  {
    model: 'VST-7B-RL',
    erqa: 0.4025, physbench: 0.4641, mme: 2036.62, mmmu: 0.4789, ocrbench: 0.827, realworldqa: 0.6732, textvqa: 0.8193,
    isBest: false,
  },
  {
    model: 'MiMo-VL-7B-RL',
    erqa: 0.3850, physbench: 0.3940, mme: 2413.61, mmmu: 0.4100, ocrbench: 0.814, realworldqa: 0.2980, textvqa: 0.7637,
    isBest: false,
  },
];

// VLA Results Data
const vlaResults = [
  {
    model: 'PhysBrain 1.0',
    widowx: 80.2,
    google: 91.3,
    libero: 98.8,
    robocasa: 64.50,
    avg: 89.4,
    isBest: true,
  },
  {
    model: 'Xiaomi-Robotics-0',
    widowx: 79.2,
    google: 89.0,
    libero: 98.7,
    robocasa: "---",
    avg: 73.7,
    isBest: false,
  },
  {
    model: 'ABot-0',
    widowx: "---",
    google: "---",
    libero: 98.6,
    robocasa: 58.30,
    avg: 78.2,
    isBest: false,
  },
  {
    model: 'GR00T-N1.6',
    widowx: 57.1,
    google: 76.13,
    libero: 96.99,
    robocasa: 47.60,
    avg: 59.3,
    isBest: false,
  },
  {
    model: 'π0.5',
    widowx: 57.1,
    google: "---",
    libero: 96.9,
    robocasa: 41.4,
    avg: 66.7,
    isBest: false,
  },
  {
    model: 'π0',
    widowx: 27.1,
    google: 54.8,
    libero: 94.2,
    robocasa: "---",
    avg: 63.6,
    isBest: false,
  },
];

interface TableRow {
  model: string;
  params?: string;
  [key: string]: string | number | boolean | undefined;
}

interface ResultTableProps {
  title: string;
  subtitle: string;
  data: TableRow[];
  columns: { key: string; label: string; width?: string; scale?: number }[];
  highlightColumn?: string;
}

function ResultTable({ title, subtitle, data, columns, highlightColumn }: ResultTableProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = tableRef.current?.querySelectorAll('tbody tr');
      if (rows) {
        gsap.fromTo(
          rows,
          { rotateX: -30, y: 30, opacity: 0 },
          {
            rotateX: 0,
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: tableRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, tableRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl">
      {/* Header */}
      <div
        className="flex items-center justify-between p-6 transition-colors border-b border-gray-100 cursor-pointer bg-gradient-to-r from-gray-50 to-white hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            {title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
        </div>
        <button className="p-2 transition-colors rounded-lg hover:bg-gray-100">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>
      </div>

      {/* Table */}
      <div
        ref={tableRef}
        className={`overflow-x-auto transition-all duration-500 ${
          isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ perspective: '1000px' }}
      >
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/80">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${
                    col.width || ''
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((row, index) => (
              <tr
                key={index}
                className={`group hover:bg-indigo-50/50 transition-colors ${
                  row.isBest ? 'bg-gradient-to-r from-amber-50/50 to-transparent' : ''
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {columns.map((col) => {
                  const raw = row[col.key];
                  const value = typeof raw === 'number' ? raw * (col.scale ?? 1) : raw;
                  const isHighlight = col.key === highlightColumn;
                  const isModel = col.key === 'model';

                  return (
                    <td
                      key={col.key}
                      className={`px-4 py-3 whitespace-nowrap ${
                        isModel ? 'font-medium text-gray-900' : ''
                      } ${isHighlight ? 'font-semibold' : 'text-gray-600'} ${
                        row.isOurs ? 'font-bold text-indigo-700' : ''
                      }`}
                    >
                      {isModel && row.isBest && (
                        <Trophy className="inline w-4 h-4 mr-2 text-amber-500" />
                      )}
                      {typeof value === 'number' ? (
                        <span
                          className={`${isHighlight ? 'text-indigo-600 font-bold' : ''} ${
                            row.isBest && isHighlight ? 'text-amber-600' : ''
                          }`}
                        >
                          {value.toFixed(1)}
                        </span>
                      ) : (
                        value
                      )}
                      {isModel && row.isBest && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                          SOTA
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Experiments() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

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

      // Stats animation

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const qaColumns = [
    { key: 'model', label: 'Model', width: 'w-1/4' },
    { key: 'erqa', label: 'ERQA↑', scale: 100 },
    { key: 'physbench', label: 'PhysBench↑', scale: 100 },
    { key: 'mme', label: 'MME↑' },
    { key: 'mmmu', label: 'MMMU↑', scale: 100 },
    { key: 'ocrbench', label: 'OCRBench↑', scale: 100 },
    { key: 'realworldqa', label: 'RealWorldQA↑', scale: 100 },
    { key: 'textvqa', label: 'TextVQA↑', scale: 100 },
  ];

  const vlaColumns = [
    { key: 'model', label: 'Model', width: 'w-1/4' },
    { key: 'widowx', label: 'SIMPLER WidowX↑' },
    { key: 'google', label: 'SIMPLER Google↑' },
    { key: 'libero', label: 'LIBERO↑' },
    { key: 'robocasa', label: 'RoboCasa-GR1↑' },
  ];

  return (
    <section
      id="experiments"
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-gray-50"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-indigo-50/50 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Title */}
        <div ref={titleRef} className="mb-12 text-center">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium rounded-full bg-emerald-50 text-emerald-700">
            实验结果
          </span>
          <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            全面实现 <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">SOTA 性能</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            在空间智能、具身交互等多项权威评测中，PhysBrain 1.0 全面实现业界最优性能
          </p>
        </div>

        {/* Results Tables */}
        <div className="space-y-8">
          <ResultTable
            title="多模态问答评测结果"
            subtitle="在多个权威视觉问答基准测试中的性能对比"
            data={qaResults}
            columns={qaColumns}
            highlightColumn="avg"
          />

          <ResultTable
            title="具身 VLA 控制评测结果"
            subtitle="在机器人视觉-语言-动作控制任务中的性能对比"
            data={vlaResults}
            columns={vlaColumns}
            highlightColumn="avg"
          />
        </div>

        {/* Key Findings */}
        <div className="p-8 mt-12 text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl">
          <h3 className="flex items-center gap-2 mb-4 text-xl font-bold">
            <Trophy className="w-6 h-6" />
            核心发现
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h4 className="mb-2 font-semibold">数据效率突破</h4>
              <p className="text-sm text-white/80">
                依托大规模开源人类视频实现零成本"物理常识"注入，摆脱对昂贵闭环机器人数据的高度依赖
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">范式迁移成功</h4>
              <p className="text-sm text-white/80">
                完美契合从动作模仿到物理常识的范式迁移需求，以极致数据效率登顶多项基准测试
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">通专融合</h4>
              <p className="text-sm text-white/80">
                TwinBrainVLA 架构成功解决灾难性遗忘难题，在保留通用能力的同时高效完成具身专项训练
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
