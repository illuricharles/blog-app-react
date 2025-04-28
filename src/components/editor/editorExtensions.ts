import Bold from "@tiptap/extension-bold";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { Heading } from "@tiptap/extension-heading";

const CustomHeading = Heading.extend({
  renderHTML({ node, HTMLAttributes }) {
    const level: 1 | 2 | 3 | 4 | 5 | 6 = node.attrs.level;

    const classes: Record<1 | 2 | 3 | 4 | 5 | 6, string> = {
      1: "text-3xl font-semibold md:text-4xl",
      2: "text-2xl font-semibold md:text-3xl",
      3: "text-xl font-medium md:text-2xl",
      4: "text-xl font-medium",
      5: "text-lg font-normal",
      6: "text-base font-normal",
    };

    return [
      `h${level}`,
      {
        ...HTMLAttributes,
        class: `${classes[level]} ${HTMLAttributes.class ?? ""}`.trim(),
      },
      0,
    ];
  },
});

export const extensions = [
  StarterKit.configure({
    heading: false,
    paragraph: {
      HTMLAttributes: {
        class: "text-base  lg:text-lg leading-relaxed text-gray-800",
      },
    },
    bold: false,
    bulletList: {
      HTMLAttributes: {
        class: "list-disc ml-5",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal ml-5",
      },
    },
  }),
  CustomHeading.configure({
    levels: [1, 2, 3], 
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Highlight,

  Bold.configure({
    HTMLAttributes: {
      class: "font-bold",
    },
  }),
];
