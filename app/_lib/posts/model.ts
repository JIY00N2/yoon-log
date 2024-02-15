import { InferSchemaType, Schema, model, models } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

type PostType = InferSchemaType<typeof postSchema>;

const Post = models.Post ? model<PostType>("Post") : model("Post", postSchema);

export default Post;
