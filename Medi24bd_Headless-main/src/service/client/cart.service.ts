// ===========================
// services/cart.service.ts
// ===========================
import Cart from '../../models/client/cart/cart.model';
import { Op } from 'sequelize';

export const addToCartService = async (data: any) => {
    const existingItem = await Cart.findOne({
      where: {
        user_id: data.user_id,
        product_id: data.product_id,
        stock_id: data.stock_id
      }
    });
  
    const calculatedSavings = data.quantity * (data.total_savings || 0);
  
    if (existingItem) {
      const updatedQuantity = existingItem.quantity + data.quantity;
      const updatedSavings = (existingItem.total_savings || 0) + calculatedSavings;
      await existingItem.update({
        quantity: updatedQuantity,
        total_savings: updatedSavings
      });
      return existingItem;
    } else {
      const newItem = await Cart.create({ ...data, total_savings: calculatedSavings });
      return newItem;
    }
  };
  
  export const getCartItemsService = async (userId: string) => {
    const items = await Cart.findAll({ where: { user_id: userId } });
    const total_price = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total_discount = items.reduce(
      (sum, item) => sum + (item.total_savings || 0),
      0
    );
    return { items, total_price, total_discount };
  };
  
  export const updateCartItemService = async (id: string, updates: any) => {
    const item = await Cart.findByPk(id);
    if (!item) throw new Error('Item not found');
  
    const newQuantity = updates.quantity ?? item.quantity;
    const newSavingsPerUnit = updates.total_savings ?? 0;
  
    const updatedData = {
      ...updates,
      quantity: newQuantity,
      total_savings: newQuantity * newSavingsPerUnit
    };
  
    await item.update(updatedData);
  
    const userItems = await Cart.findAll({ where: { user_id: item.user_id } });
    const total_price = userItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const total_discount = userItems.reduce((sum, i) => sum + (i.total_savings || 0), 0);
  
    return { updated: item, total_price, total_discount };
  };
  
  
  export const deleteCartItemService = async (id: string) => {
    const item = await Cart.findByPk(id);
    if (!item) throw new Error('Item not found');
    const userId = item.user_id;
    await item.destroy();
    const remainingItems = await Cart.findAll({ where: { user_id: userId } });
    const total_price = remainingItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const total_discount = remainingItems.reduce(
      (sum, i) => sum + (!i.is_available ? i.price * i.quantity * 0.1 : 0),
      0
    );
    return { message: 'Item deleted', total_price, total_discount };
  };
  