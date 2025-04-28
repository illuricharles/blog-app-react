import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils/cn";

const inputVariants = cva("w-full block border-gray-700 border px-3 py-1.5 rounded outline-none")

export type InputVariantProps = VariantProps<typeof inputVariants> & React.InputHTMLAttributes<HTMLInputElement>

export default function Input({ className, ...props }: InputVariantProps) {
    return <input {...props} className={cn(inputVariants(), className)} />
}