import { InferSchemaType, Schema, model, models } from "mongoose";

const postSchema = new Schema(
  {
    id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

type PostType = InferSchemaType<typeof postSchema>;

const Post = models.Post ? model<PostType>("Post") : model("Post", postSchema);

export default Post;
