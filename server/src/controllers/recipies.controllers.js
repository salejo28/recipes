import { validationResult } from 'express-validator';
import {
  Comment,
  CreateRecipie,
  DeleteRecipie,
  GetRecipie,
  GetRecipies,
  GetRecipiesByUser,
  GetTopTenRecipies,
  Qualify,
  ResponseComment,
  UpdateRecipie,
} from '../middlewares/Recipies';

export class RecipiesControllers {
  async GetRecipies(req, res) {
    const recipies = await GetRecipies();
    return res.status(200).json({
      recipies,
    });
  }

  async GetTopRecipies(req, res) {
    const recipies = await GetTopTenRecipies();
    return res.status(200).json({
      recipies,
    });
  }

  async GetRecipiesByUser(req, res) {
    const { user_id } = req.user;
    const recipies = await GetRecipiesByUser(user_id);
    return res.status(200).json({
      recipies,
    });
  }

  async GetRecipie(req, res) {
    const { rid } = req.params;
    const { success, recipie, error } = await GetRecipie(rid);
    if (!success) return res.status(400).json({ error });
    return res.status(200).json({
      recipie,
    });
  }

  async Comment(req, res) {
    const { rid } = req.params;
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: validationErrors.array(), success: false });
    }
    const { success, error, message } = await Comment(req.body, rid);
    if (!success)
      return res.status(400).json({
        error,
        success,
      });
    return res.status(200).json({
      success,
      message,
    });
  }

  async ResponseComment(req, res) {
    const { rid, cid } = req.params;
    const { success, error, message } = await ResponseComment(
      req.body,
      rid,
      cid,
    );
    if (!success) return res.status(400).json({ success, error });
    return res.status(200).json({
      success,
      message,
    });
  }

  async Qualify(req, res) {
    const { rid } = req.params;
    const { success, error, message } = await Qualify(req.body, rid);
    if (!success) return res.status(400).json({ success, error });
    return res.status(200).json({
      success,
      message,
    });
  }

  async CreateRecipie(req, res) {
    const { user_id } = req.user;
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: validationErrors.array(), success: false });
    }
    const { success, error, message } = await CreateRecipie(req.body, user_id);
    if (!success) return res.status(400).json({ error, success });
    return res.json({
      success,
      message,
    });
  }

  async PutRecipie(req, res) {
    const { rid } = req.params;
    const { success, error, message } = await UpdateRecipie(req.body, rid);
    if (!success) return res.status(400).json({ error, success });
    return res.status(200).json({
      success,
      message,
    });
  }

  async DeleteRecipie(req, res) {
    const { rid } = req.params;
    await DeleteRecipie(rid);
    return res.status(200).json({
      message: 'Recipie deleted successfully!',
    });
  }
}
