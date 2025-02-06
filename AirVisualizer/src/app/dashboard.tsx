import Header from "../components/header";
import LogsSection from "./dashboard/logs-section";
import PerformanceSummaryCard from "./dashboard/performance-summary-card";
import PlotterGroup from "./dashboard/plotter-group";

export default function Dashboard() {
  return (
    <div className="p-1 flex flex-col gap-1 h-screen w-screen overflow-x-hidden overflow-y-auto">
          <Header />
          <main className="md:px-10 px-3">
            <PerformanceSummaryCard/>
            <div className="flex md:flex-row flex-col gap-2">
            <PlotterGroup/>
            <LogsSection/>
            </div>
          </main>
        </div>
  )
}
