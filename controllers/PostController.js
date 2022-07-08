import PostService from '../services/PostService.js';

class PostController {
  async create(req, res) {
    try {
      const post = await PostService.create(req);
      res.json(post);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Не удалось создать статью',
      });
    }
  }
  async getAll(req, res) {
    try {
      const posts = await PostService.getAll();
      res.json(posts);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Не удалось получить статьи',
      });
    }
  }
  async getOne(req, res) {
    try {
      const post = await PostService.getOne(req.params.id);
      return res.json(post);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Не удалось получить статью',
      });
    }
  }
  async update(req, res) {
    try {
    } catch (error) {}
  }
  async delete(req, res) {
    try {
    } catch (error) {}
  }
}

export default new PostController();
