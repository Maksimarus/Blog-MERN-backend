import {Router} from 'express';

import PostController from '../controllers/PostController.js';
import {postCreateValidation} from '../validations/post.js';
import checkAuth from '../utils/checkAuth.js';
import handleValidationErrors from '../utils/handleValidationErrors.js';

const postRouter = new Router();

postRouter.get('/posts', PostController.getAll);
postRouter.get('/posts/:id', PostController.getOne);
postRouter.post(
  '/posts',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create,
);
postRouter.patch(
  '/posts/:id',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update,
);
postRouter.delete('/posts/:id', checkAuth, PostController.delete);

export default postRouter;
