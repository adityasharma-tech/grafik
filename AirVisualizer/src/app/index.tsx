import { useState } from "react";
import Header from "../components/header";
import AddGraphModal from "./home/add-graph-modal";
import GraphSection from "./home/graph-section";
import LogsSection from "./home/logs-section";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="p-1 flex flex-col gap-1 h-screen w-screen overflow-x-hidden overflow-y-auto">
      <Header />
      <main className="flex md:flex-row flex-col gap-2 h-full">
        <AddGraphModal isOpen={isOpen} setIsOpen={setIsOpen}/>
        <GraphSection setIsOpen={setIsOpen}/>
        <LogsSection/>        
      </main>
    </div>
  );
}
