import { cva, VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils/cn"


const buttonVariants = cva("", {
    variants: {
        size: {
            default: 'size-30'
        }
    },
    defaultVariants: {
        size: "default"
    }
})

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>

export default function IconButton({ children, className, size, ...props }: Props) {
    return <button {...props} className={cn(buttonVariants({ size }), className)}>
        {children}
    </button>
}