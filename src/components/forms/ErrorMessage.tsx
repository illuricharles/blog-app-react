import { FaExclamationTriangle } from "react-icons/fa";

export function ErrorMessage({ message }: { message: string }) {
    return <div className="flex items-center justify-center py-1 -my-1 rounded gap-x-1.5 text-red-600 bg-red-100">
        <FaExclamationTriangle className="size-4 inline-block" />
        <p className=" font-semibold max-w-full text-sm">{message}</p>
    </div>
}