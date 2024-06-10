import Post from "./model";
import connectDB from "../utils/connect-db";
import { PostType } from "./serviceType";

export class PostsService {
  static async createPost({
    title,
    subTitle,
    thumbnailUrl,
    content,
    slug,
    isPrivate,
  }: PostType) {
    await connectDB();
    const post = await Post.create({
      title,
      subTitle,
      thumbnailUrl,
      content,
      slug,
      isPrivate,
    });
    return post;
  }
  static async getPosts() {
    await connectDB();
    const posts = await Post.find().sort({ createdAt: -1 }).lean().exec();
    return posts;
  }
  static async getPost(slug: string) {
    await connectDB();
    const post = await Post.findOne({ slug }).lean().exec();
    return post;
  }
  static async updatePost(
    prevSlug: string,
    { title, subTitle, thumbnailUrl, content, isPrivate }: Partial<PostType>,
  ) {
    await connectDB();
    const prevPost = await PostsService.getPost(prevSlug);
    const filter = { slug: prevSlug };
    const update = {
      title: title || prevPost?.title,
      subTitle: subTitle || prevPost?.subTitle,
      thumbnailUrl: thumbnailUrl || prevPost?.thumbnailUrl,
      content: content || prevPost?.content,
      isPrivate,
    };
    const newPost = await Post.findOneAndUpdate(filter, update, {
      new: true,
    })
      .lean()
      .exec();
    console.log(newPost);
    return newPost;
  }
  static async deletePost(slug: string) {
    await connectDB();
    const post = await Post.findOneAndDelete({ slug }).lean().exec();
    if (!post) {
      throw new Error("no post");
    }
    return post;
  }
}
