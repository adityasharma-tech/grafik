import { useState } from "react";

export default function FacSection() {
  return (
    <section id="faq" className="flex-col items-center text-neutral-800 my-10 flex justify-center gap-y-2">
      <div className="text-2xl font-medium capitalize">
        frequently asked question
      </div>
      <div className="text-neutral-600 mb-10">
        <span>Question asked by users after using Grafik as their tool</span>
      </div>
      <div className="flex flex-col md:w-7xl gap-y-5">
        {[
          {
            question: "Do we support only the Chrome browser?",
            ans: "Because of serial incompatibility for now we can only support Google Chrome, Microsoft Edge and Opera Browser.",
          },
          {
            question: "Do you need to use specific library to use this tool?",
            ans: "For now we only have Arduino IDE Library published which support most of IoT devices. We are integrating raspberry pi library, will be available soon.",
          },
          {
            question: "Can't we use this tool to plot data without using the library?",
            ans: "Yes, you can do while sending messages in structured way as we do. Soon we will release an article about this.",
          }
        ].map((_, idx) => (
          <FaqDialog key={idx} idx={idx} faq={_} />
        ))}
      </div>
    </section>
  );
}

type FaqDialogT = {
  faq: {
    question: string;
    ans: string;
  };
  idx: number;
};

const FaqDialog = ({ faq, idx }: FaqDialogT) => {
  const [open, setOpen] = useState(idx <= 0);
  return (
    <div className="border border-gray-300 bg-white p-1.5 rounded-xl transition-all">
      <div className="border border-gray-100 h-full bg-zinc-50 p-3 rounded-lg">
        <div className="text-xl text-neutral-900 font-medium flex w-full justify-between">
          {faq.question}
          <button className="rounded-full border border-neutral-300 h-6 w-6 flex cursor-pointer justify-center items-center" onClick={() => setOpen(!open)} type="button">
            {!open ? (
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 12h12m-6-6v12"
                  className="stroke-neutral-900"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 12h12"
                  className="stroke-neutral-900"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>
        {open ? (
          <div className="text-neutral-700 mt-3">
            <span>{faq.ans}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};
