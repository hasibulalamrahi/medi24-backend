// ===========================
// controllers/cart.controller.ts
// ===========================
import { Request, Response } from 'express';
import { cartSchema } from './cart.validator';
import {
  addToCartService,
  getCartItemsService,
  updateCartItemService,
  deleteCartItemService
} from '../../service/client/cart.service';

export const addToCart = async (req: Request, res: any) => {
  try {
    await cartSchema.validate(req.body, { abortEarly: false });
    const item = await addToCartService(req.body);
    return res.status(201).json({ success: true, data: item });
  } catch (err: any) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

export const getCartItems = async (req: Request, res: any) => {
  try {
    const userId = req.query.user_id as string;
    if (!userId) throw new Error('User ID is required');
    const result = await getCartItemsService(userId);
    return res.status(200).json({ success: true, data: result });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const updateCartItem = async (req: Request, res: any) => {
  try {
    const { id } = req.params;
    await cartSchema.validate(req.body, { abortEarly: false });
    const updated = await updateCartItemService(id, req.body);
    return res.status(200).json({ success: true, data: updated });
  } catch (err: any) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

export const deleteCartItem = async (req: Request, res: any) => {
  try {
    const { id } = req.params;
    const result = await deleteCartItemService(id);
    return res.status(200).json({ success: true, data: result });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
