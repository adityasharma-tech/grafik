import * as React from "react";

function Svg(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M6.995 7.006a1 1 0 000 1.415l3.585 3.585-3.585 3.585a1 1 0 101.414 1.414l3.585-3.585 3.585 3.585a1 1 0 001.415-1.414l-3.586-3.585 3.586-3.585a1 1 0 00-1.415-1.415l-3.585 3.585L8.41 7.006a1 1 0 00-1.414 0z"
        fill="#0F0F0F"
      />
    </svg>
  );
}

const MemoSvg = React.memo(Svg);
export default MemoSvg;
