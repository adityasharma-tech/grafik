import { demoPerformanceData } from "../../lib/constants";

export default function PerformanceSummaryCard() {
  return (
    <section className="border border-[#D8D8D8] py-3 mb-3 bg-neutral-50 px-5 rounded-xl">
      <div>
        <span>Performance Summary</span>
      </div>
      <div className="flex w-full justify-between py-5">
        {demoPerformanceData.map((perf, idx)=><div key={idx} >
          <div className="border-l-2 flex flex-col gap-y-1 px-2" style={{
            borderColor: "#c10007"
          }}>
          <span className="text-sm">{perf.title}</span>
          <span className="text-xs text-neutral-400">{perf.desc}</span>
          </div>
          <div className="mt-4 text-black font-medium text-lg">
            <span>{perf.content}</span>
          </div>
        </div>)}
      </div>
    </section>
  )
}
