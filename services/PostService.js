import PostModel from '../models/Post.js';

class PostService {
  async getAll() {
    const posts = await PostModel.find().populate('user').exec();
    return posts;
  }
  async getOne(id) {
    if (!id) {
      throw new Error('ID не указан');
    }
    const post = await PostModel.findByIdAndUpdate(
      id,
      {
        $inc: {viewsCount: 1},
      },
      {
        returnDocument: 'after',
      },
    )
      .populate('user')
      .exec();
    if (!post) {
      throw new Error('Статья не найдена');
    }
    return post;
  }
  async create(post) {
    const createdPost = await PostModel.create(post);
    return createdPost;
  }
  async update(post) {
    if (!post.id) {
      throw new Error('ID не указан');
    }
    await PostModel.findByIdAndUpdate(post.id, post, {new: true});
  }
  async delete(id) {
    if (!id) {
      throw new Error('ID не указан');
    }
    const post = await PostModel.findByIdAndDelete(id);
    return post;
  }
}

export default new PostService();
