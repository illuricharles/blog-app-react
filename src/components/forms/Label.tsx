import { cva, VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils/cn"

const LabelVariants = cva("font-semibold text-slate-900 block")

type Props = VariantProps<typeof LabelVariants> & React.LabelHTMLAttributes<HTMLLabelElement>

export default function Label({ children, className = "", ...props }: Props) {
    return (
        <label className={cn(LabelVariants(), className)} {...props}>
            {children}
        </label>
    )
}