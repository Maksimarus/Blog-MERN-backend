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
    // const post = await PostModel.findById(id).populate('user').exec();
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
    );
    if (!post) {
      throw new Error('Статья не найдена');
    }
    return post;
  }
}

export default new PostService();
