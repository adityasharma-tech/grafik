import * as React from "react";

function temp(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M10 12v5M14 12v5M4 7h16M6 10v8a3 3 0 003 3h6a3 3 0 003-3v-8M9 5a2 2 0 012-2h2a2 2 0 012 2v2H9V5z"
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
