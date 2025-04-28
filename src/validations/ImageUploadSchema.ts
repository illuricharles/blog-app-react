import { z } from "zod";
import { PostSchema } from "@charles_ben/zod-validation-blog-app";

// Zod validation schema
export const ImageUploadSchema = z.object({
  image: z
    .any()
    .refine((file) => file?.length === 1, "Image is required")
    .refine((file) => file?.[0]?.type.startsWith("image/"), "Must be an image"),
});

export const ContentSchema = PostSchema.pick({ content: true });
export type ContentSchemaTypes = z.infer<typeof ContentSchema>;

const UpdatedSchema = PostSchema.omit({ imageUrl: true, content: true });
export const PublishFinalFormSchema = UpdatedSchema.extend(
  ImageUploadSchema.shape
);

export type PublishFinalFormSchemaTypes = z.infer<
  typeof PublishFinalFormSchema
>;

export type ImageUploadSchemaTypes = z.infer<typeof ImageUploadSchema>;
