// 몽고 db를 조작하는 코드 (get, post등)
// crud, 서버코드라서 바로 가져오면댐 fetch 불필요
import Post from "./model";
import connectDB from "../utils/connect-db";
import { CreatedPostType, PostType } from "./serviceType";

export class PostsService {
  static async createdPost({ title, content, slug }: CreatedPostType) {
    await connectDB();
    const post = await Post.create({ title, content, slug });
    return post;
  }
  static async getPosts() {
    await connectDB();
    const posts = await Post.find().lean().exec();
    return posts;
  }
  static async getPost(id: string) {
    await connectDB();
    const post = await Post.findById(id).lean().exec();
    return post;
  }
  static async updatedPost(id: string, { title, content }: Partial<PostType>) {
    await connectDB();
    const post = await Post.findByIdAndUpdate(id, {
      title,
      content,
    })
      .lean()
      .exec();
    return post;
  }
  static async deletedPost(id: string) {
    await connectDB();
    const post = await Post.findByIdAndDelete(id).lean().exec();
    return post;
  }
}
