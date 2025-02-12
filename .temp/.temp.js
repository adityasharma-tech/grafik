import * as React from "react";

function Svg(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 12a8 8 0 0112.407-6.678L6.075 17.376A7.97 7.97 0 014 12zm3.593 6.678A8 8 0 0017.925 6.624L7.593 18.678zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
        fill="#000"
      />
    </svg>
  );
}

const MemoSvg = React.memo(Svg);
export default MemoSvg;
