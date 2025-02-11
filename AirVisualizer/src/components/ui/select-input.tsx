import { SelectHTMLAttributes } from 'react';
import { demoPlotters } from '../../lib/constants'

interface T {}

interface SelectInputProps extends SelectHTMLAttributes<T> {
  label?: string;
}


export default function SelectInput(props: SelectInputProps) {
  return (
    <div className='flex flex-col gap-y-1'>
      <label className='text-xs font-medium'>
        {props.label}
      </label>
      <select className='text-sm rounded-lg focus-within:ring bg-neutral-200 px-3.5 py-2'>
        {demoPlotters.map((o, idx)=><option key={idx} className='px-2'>{o.title}</option>)}
      </select>
    </div>
  )
}
