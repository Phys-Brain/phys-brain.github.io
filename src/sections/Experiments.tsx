import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, TrendingUp, BarChart3, ChevronDown, ChevronUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Multimodal QA Results Data
const qaResults = [
  {
    model: 'PhysBrain-7B',
    params: '7B',
    sqa: 73.8,
    pope: 89.2,
    mmvet: 48.5,
    llavaw: 72.1,
    mmb: 68.9,
    avg: 70.5,
    isBest: true,
  },
  {
    model: 'PhysBrain-13B',
    params: '13B',
    sqa: 76.2,
    pope: 90.5,
    mmvet: 52.3,
    llavaw: 74.8,
    mmb: 71.4,
    avg: 73.0,
    isBest: true,
  },
  {
    model: 'LLaVA-1.5-7B',
    params: '7B',
    sqa: 66.8,
    pope: 85.9,
    mmvet: 35.4,
    llavaw: 62.0,
    mmb: 64.3,
    avg: 62.9,
    isBest: false,
  },
  {
    model: 'LLaVA-1.5-13B',
    params: '13B',
    sqa: 71.6,
    pope: 87.3,
    mmvet: 41.5,
    llavaw: 68.2,
    mmb: 67.0,
    avg: 67.1,
    isBest: false,
  },
  {
    model: 'Qwen-VL-7B',
    params: '7B',
    sqa: 68.2,
    pope: 84.5,
    mmvet: 38.2,
    llavaw: 65.4,
    mmb: 63.8,
    avg: 64.0,
    isBest: false,
  },
  {
    model: 'InternVL-7B',
    params: '7B',
    sqa: 70.1,
    pope: 86.2,
    mmvet: 42.1,
    llavaw: 67.3,
    mmb: 65.9,
    avg: 66.3,
    isBest: false,
  },
];

// VLA Results Data
const vlaResults = [
  {
    model: 'PhysBrain-VLA',
    params: '7B',
    calvin: 92.5,
    libero: 88.3,
    rlds: 85.7,
    bridge: 91.2,
    avg: 89.4,
    isBest: true,
  },
  {
    model: 'OpenVLA-7B',
    params: '7B',
    calvin: 78.2,
    libero: 72.5,
    rlds: 68.9,
    bridge: 75.3,
    avg: 73.7,
    isBest: false,
  },
  {
    model: 'RT-2-PaLI-X',
    params: '55B',
    calvin: 82.4,
    libero: 76.8,
    rlds: 74.2,
    bridge: 79.5,
    avg: 78.2,
    isBest: false,
  },
  {
    model: 'RT-1',
    params: '35M',
    calvin: 65.3,
    libero: 58.2,
    rlds: 52.1,
    bridge: 61.7,
    avg: 59.3,
    isBest: false,
  },
  {
    model: 'Octo',
    params: '93M',
    calvin: 71.5,
    libero: 65.4,
    rlds: 61.8,
    bridge: 68.2,
    avg: 66.7,
    isBest: false,
  },
  {
    model: 'Diffusion Policy',
    params: '-',
    calvin: 68.7,
    libero: 62.1,
    rlds: 58.5,
    bridge: 64.9,
    avg: 63.6,
    isBest: false,
  },
];

interface TableRow {
  model: string;
  params: string;
  [key: string]: string | number | boolean;
}

interface ResultTableProps {
  title: string;
  subtitle: string;
  data: TableRow[];
  columns: { key: string; label: string; width?: string }[];
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
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Header */}
      <div
        className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            {title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
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
                  const value = row[col.key];
                  const isHighlight = col.key === highlightColumn;
                  const isModel = col.key === 'model';

                  return (
                    <td
                      key={col.key}
                      className={`px-4 py-3 whitespace-nowrap ${
                        isModel ? 'font-medium text-gray-900' : ''
                      } ${isHighlight ? 'font-semibold' : 'text-gray-600'}`}
                    >
                      {isModel && row.isBest && (
                        <Trophy className="inline w-4 h-4 text-amber-500 mr-2" />
                      )}
                      {typeof value === 'number' ? (
                        <span
                          className={`${
                            isHighlight
                              ? 'text-indigo-600 font-bold'
                              : ''
                          } ${
                            row.isBest && isHighlight
                              ? 'text-amber-600'
                              : ''
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
  const statsRef = useRef<HTMLDivElement>(null);

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
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { y: 40, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const qaColumns = [
    { key: 'model', label: 'Model', width: 'w-1/4' },
    { key: 'params', label: 'Params' },
    { key: 'sqa', label: 'SQA↑' },
    { key: 'pope', label: 'POPE↑' },
    { key: 'mmvet', label: 'MM-Vet↑' },
    { key: 'llavaw', label: 'LLaVA-W↑' },
    { key: 'mmb', label: 'MMB↑' },
    { key: 'avg', label: 'Avg↑', width: 'w-20' },
  ];

  const vlaColumns = [
    { key: 'model', label: 'Model', width: 'w-1/4' },
    { key: 'params', label: 'Params' },
    { key: 'calvin', label: 'CALVIN↑' },
    { key: 'libero', label: 'LIBERO↑' },
    { key: 'rlds', label: 'RLDS↑' },
    { key: 'bridge', label: 'Bridge↑' },
    { key: 'avg', label: 'Avg↑', width: 'w-20' },
  ];

  return (
    <section
      id="experiments"
      ref={sectionRef}
      className="relative py-24 bg-gray-50 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-indigo-50/50 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-full mb-4">
            实验结果
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            全面实现<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">SOTA 性能</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            在空间智能、具身交互等多项权威评测中，PhysBrain 全面实现业界最优性能
          </p>
        </div>

        {/* Stats Cards */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { value: '73.0', label: '多模态 QA 平均分', icon: TrendingUp, color: 'from-blue-500 to-cyan-500' },
            { value: '89.4', label: 'VLA 控制平均分', icon: Trophy, color: 'from-amber-500 to-orange-500' },
            { value: '+35%', label: '性能提升', icon: TrendingUp, color: 'from-emerald-500 to-teal-500' },
            { value: '6', label: '基准测试 SOTA', icon: Trophy, color: 'from-purple-500 to-pink-500' },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
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
        <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Trophy className="w-6 h-6" />
            核心发现
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">数据效率突破</h4>
              <p className="text-sm text-white/80">
                依托大规模开源人类视频实现零成本"物理常识"注入，摆脱对昂贵闭环机器人数据的高度依赖
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">范式迁移成功</h4>
              <p className="text-sm text-white/80">
                完美契合从动作模仿到物理常识的范式迁移需求，以极致数据效率登顶多项基准测试
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">通专融合</h4>
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
