import { InferSchemaType, Schema, model, models } from "mongoose";

const guestbookSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

type GuestBookType = InferSchemaType<typeof guestbookSchema>;

const GuestBook = models.GuestBook
  ? model<GuestBookType>("GuestBook")
  : model("GuestBook", guestbookSchema);

export default GuestBook;
