import * as React from "react";

function temp(props) {
  return (
    <svg width={800} height={800} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M5 12h14m0 0l-6-6m6 6l-6 6"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const Memotemp = React.memo(temp);
export default Memotemp;
