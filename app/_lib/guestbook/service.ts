import connectDB from "../utils/connect-db";
import GuestBook from "./model";
import { GuestBookType } from "./serviceType";

export class GuestBookService {
  static async createComment({ comment }: GuestBookType) {
    await connectDB();
    const newComment = await GuestBook.create({ comment });
    return newComment;
  }
  static async getComments() {
    await connectDB();
    const comments = await GuestBook.find()
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    return comments;
  }
}
