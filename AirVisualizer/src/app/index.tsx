import Header from "../components/header";
import { Toaster } from "../components/sonner";
import GraphSection from "./home/graph-section";
import LogsSection from "./home/logs-section";

export default function Home() {
  return (
    <div className="p-1 flex flex-col gap-1 h-screen w-screen overflow-x-hidden overflow-y-auto">
      <Header />
      <main className="flex md:flex-row flex-col gap-2 h-full">
        <GraphSection/>
        <LogsSection/>
      </main>
    </div>
  );
}
