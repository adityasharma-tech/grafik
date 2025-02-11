import { InputHTMLAttributes } from "react";

interface T {}

interface TextInputProps extends InputHTMLAttributes<T> {
  label: string;
  setValue: (value: string)=>void;
}

export default function TextInput(props: TextInputProps) {
  return (
    <div className="flex flex-col gap-y-1 flex-grow">
      <label className="text-xs font-medium">{props.label}</label>
      <input
        {...props}
        onChange={(e) => props.setValue(e.target.value)}
        className="text-sm rounded-lg bg-neutral-200 px-3.5 py-2 max-w-sm"
      />
    </div>
  );
}
