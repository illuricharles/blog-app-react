// https://github.com/candraKriswinarto/my-rich-text-editor/blob/main/components/rich-text-editor/menu-bar.tsx
import { BsTypeH1, BsTypeH2, BsTypeH3 } from "react-icons/bs";
import type { Editor } from "@tiptap/react";
import { FiBold, FiItalic } from "react-icons/fi";
import { BiAlignLeft, BiAlignMiddle, BiAlignRight, BiStrikethrough } from "react-icons/bi";
import { FaListOl, FaListUl } from "react-icons/fa";


export default function Menubar({ editor }: { editor: Editor }) {

  const iconClasses = "size-4 md:size-5 cursor-pointer"

  const options = [
    {
      icon: <BsTypeH1 className={iconClasses} />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <BsTypeH2 className={iconClasses} />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <BsTypeH3 className={iconClasses} />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <FiBold className={iconClasses} />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
    },
    {
      icon: <FiItalic className={'size-4 cursor-pointer'} />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
    },
    {
      icon: <BiStrikethrough className={iconClasses} />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
    },
    {
      icon: <BiAlignLeft className={iconClasses} />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      isActive: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <BiAlignMiddle className={iconClasses} />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      isActive: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <BiAlignRight className={iconClasses} />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      isActive: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <FaListUl className={iconClasses} />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
    },
    {
      icon: <FaListOl className={iconClasses} />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
    }
  ]

  return (
    <div className="sticky top-0 z-50 bg-slate-50 mt-4 rounded flex gap-x-2 mb-3  p-2 py-2 flex-wrap gap-y-2 w-fit mx-auto md:mt-6 md:mb-4 xl:my-6 xl:gap-x-4">
      {options.map((eachOption, index) => {
        return <button key={index} onClick={eachOption.onClick} className={eachOption.isActive ? "bg-red-200 p-1 rounded" : "p-1"}>
          {eachOption.icon}
        </button>
      })}
    </div>

  )
}
