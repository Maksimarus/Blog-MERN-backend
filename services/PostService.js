import PostModel from '../models/Post.js';

class PostService {
  async create(req) {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });
    const post = await doc.save();
    return post;
  }
  async getAll() {
    const posts = await PostModel.find().populate('user').exec();
    return posts;
  }
  async getOne(id) {
    if (!id) {
      throw new Error('ID не указан');
    }
    const post = await PostModel.findOneAndUpdate(
      {
        _id: id,
      },
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
  async delete(id) {
    if (!id) {
      throw new Error('ID не указан');
    }
    await PostModel.findOneAndDelete({
      _id: id,
    });
  }
}

export default new PostService();
