interface PlotterCardPropT {
  plotterId: number;
  title?: string;
  color?: string;
  plotter: any;
}

export default function PlotterCard(props: PlotterCardPropT) {
  return (
    <div className="border h-64 bg-neutral-50 border-[#e2e2e2] rounded-xl px-3 py-2 first:mt-0 mt-3">
      <div className="flex justify-between">
        <span className="text-sm font-medium">{props.title}</span>
        <div className="flex gap-x-0.5">
          <button className="rounded-md hover:bg-neutral-100 opacity-60 hover:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="#200E32"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 17V8M16 11l-4-4-4 4"
              />
            </svg>
          </button>
          <button className="rounded-md hover:bg-neutral-100 opacity-60 hover:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 rotate-180"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="#200E32"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 17V8M16 11l-4-4-4 4"
              />
            </svg>
          </button>
          <button className="rounded-md h-6 w-6 ml-1.5 flex justify-center items-center hover:bg-neutral-100 opacity-60 hover:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 "
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 4H6a2 2 0 0 0-2 2v7m16 2v3a2 2 0 0 1-2 2h-7m-7-7v5a2 2 0 0 0 2 2h5m-7-7h7v7m9-16-6.5 6.5M20 4h-4m4 0v4"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
