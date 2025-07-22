import { Request, Response } from 'express';
import { inventorySchema } from './inventory.validator';
import {
  createInventory,
  updateInventoryById,
  deleteInventoryById,
  fetchAllInventory,
  fetchInventoryById
} from '../../../service/admin/inventory.service'

export const addInventory = async (req: Request, res: any) => {
  try {
    const validated_inventory_data = await inventorySchema.validate(req.body, { abortEarly: false });
    const result = await createInventory(validated_inventory_data);
    return res.status(201).json({ success: true, message: 'Inventory added successfully', data: result });
  } catch (error: any) {
    console.error('❌ Error adding inventory:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, errors: error.errors });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateInventory = async (req: Request, res: any) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const result = await updateInventoryById(id, updates);
    return res.status(200).json({ success: true, message: 'Inventory updated successfully', data: result });
  } catch (error: any) {
    console.error('❌ Error updating inventory:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteInventory = async (req: Request, res: any) => {
  try {
    const { id } = req.params;
    await deleteInventoryById(id);
    return res.status(200).json({ success: true, message: 'Inventory deleted successfully' });
  } catch (error: any) {
    console.error('❌ Error deleting inventory:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllInventory = async (req: Request, res: any) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = (page - 1) * limit;
  
      const inventory = await fetchAllInventory({ limit, offset });
  
      return res.status(200).json({
        success: true,
        data: inventory,
        page,
        limit
      });
    } catch (error: any) {
      console.error('❌ Error fetching inventory:', error);
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

  
  export const getInventoryById = async (req: Request, res: any) => {
    try {
      const { id } = req.params;
      const inventory = await fetchInventoryById(id);
      return res.status(200).json({ success: true, data: inventory });
    } catch (error: any) {
      console.error('❌ Error fetching inventory by ID:', error);
      return res.status(404).json({ success: false, message: error.message });
    }
  };
  