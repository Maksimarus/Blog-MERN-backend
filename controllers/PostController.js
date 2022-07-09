import PostService from '../services/PostService.js';

class PostController {
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
  async create(req, res) {
    try {
      const post = await PostService.create({
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        imageUrl: req.body.imageUrl,
        user: req.userId,
      });
      res.json(post);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Не удалось создать статью',
      });
    }
  }
  async update(req, res) {
    try {
      await PostService.update({
        id: req.params.id,
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        imageUrl: req.body.imageUrl,
        user: req.userId,
      });
      res.json({
        message: 'Пост успешно обновлен',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Не удалось обновить статью',
      });
    }
  }
  async delete(req, res) {
    try {
      const post = await PostService.delete(req.params.id);
      if (!post) {
        return res.status(404).json({
          message: 'Такой статьи нет',
        });
      }
      res.json({
        message: 'Пост успешно удален',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Не удалось удалить статью',
      });
    }
  }
}

export default new PostController();
