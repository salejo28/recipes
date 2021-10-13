import { Router } from 'express';
import { body } from 'express-validator';
import { ensureJson } from '../middlewares/EnsureJson';
import { authenticate } from '../auth/auth';
import { RecipiesControllers } from '../controllers/recipies.controllers';

class RecipiesRoutes {
  constructor() {
    this.router = Router({ strict: true });
    this.controller = new RecipiesControllers();

    this.GetRecipies();
    this.GetRecipie();
    this.GetRecipiesByUser();
    this.GetTopRecipies();
    this.Comment();
    this.CreateRecipie();
    this.PutRecipie();
    this.DeleteRecipie();
    this.Qualify();
    this.ResponseComment();
  }

  GetRecipies() {
    this.router.get('/', ensureJson, this.controller.GetRecipies);
  }

  GetRecipiesByUser() {
    this.router.get(
      '/byUser/',
      authenticate,
      this.controller.GetRecipiesByUser,
    );
  }

  GetTopRecipies() {
    this.router.get('/top/ten/', ensureJson, this.controller.GetTopRecipies);
  }

  GetRecipie() {
    this.router.get('/:rid', authenticate, this.controller.GetRecipie);
  }

  Qualify() {
    this.router.post('/qualify/:rid/', ensureJson, this.controller.Qualify);
  }

  Comment() {
    this.router.post(
      '/comment/:rid',
      [
        ensureJson,
        body('comment', 'Comment is required').exists().notEmpty(),
        body('email', 'Email is required!').exists().notEmpty(),
      ],
      this.controller.Comment,
    );
  }

  ResponseComment() {
    this.router.post(
      '/response/:rid/:cid/',
      [
        ensureJson,
        authenticate,
        body('response', 'Response is required!').exists().notEmpty(),
      ],
      this.controller.ResponseComment,
    );
  }

  CreateRecipie() {
    this.router.post(
      '/',
      [
        ensureJson,
        authenticate,
        body('title', 'Title is required!').exists().notEmpty(),
        body('description', 'Description is required').exists().notEmpty(),
        body('preparation', 'Preparation is required!').exists().notEmpty(),
        body('ingredients', 'Ingredients is required!')
          .exists()
          .notEmpty()
          .isArray(),
        body('images', 'Images is required!').exists().notEmpty().isArray(),
      ],
      this.controller.CreateRecipie,
    );
  }

  PutRecipie() {
    this.router.put(
      '/:rid',
      [ensureJson, authenticate],
      this.controller.PutRecipie,
    );
  }

  DeleteRecipie() {
    this.router.delete('/:rid', authenticate, this.controller.DeleteRecipie);
  }
}

export default new RecipiesRoutes().router;
