import { SelectHTMLAttributes } from 'react';

interface T {}

interface SelectInputProps extends SelectHTMLAttributes<T> {
  label?: string;
  values: any[];
  value: any;
  setValue: (value: any)=>void;
}


export default function SelectInput(props: SelectInputProps) {
  return (
    <div className='flex flex-col gap-y-1'>
      <label className='text-xs font-medium'>
        {props.label}
      </label>
      <select value={props.value} onChange={(e)=>props.setValue(e.target.value)} className='text-sm rounded-lg focus-within:ring bg-neutral-200 px-3.5 py-2'>
        {props.values}
      </select>
    </div>
  )
}
