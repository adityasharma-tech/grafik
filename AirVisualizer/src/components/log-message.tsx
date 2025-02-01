import {rgba} from "polished"

export default function LogMessage({primaryColor="#000", timestamp=new Date(), port="5796", message="Hello, World!"}) {
  return (
    <div style={{
        backgroundColor: rgba(primaryColor, 0.01)
    }} className='text-[13px] py-0.5 my-0.5 px-2 flex gap-x-2'>
        <span style={{
          color: primaryColor
        }} className="font-semibold flex">
          <span>[</span>
          <span className="w-20 truncate block">{port}</span>
          <span>]</span>
        </span>
        <span className="text-zinc-600">{timestamp.toISOString()}</span>
        <span className="font-medium" style={{
          color: primaryColor
        }}>{message}</span>
    </div>
  )
}
