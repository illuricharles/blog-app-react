import { FaExclamationTriangle } from "react-icons/fa";

export function FormErrorMessage({ message }: { message: string }) {
    return <div className="flex items-center justify-center py-1 -my-1 mb-3 px-1.5 rounded gap-x-2 text-red-600 bg-red-100">
        <FaExclamationTriangle className="size-4 inline-block" />
        <p className=" font-semibold max-w-full text-sm">{message}</p>
    </div>
}