import Inventory from '../../models/admin/inventory/inventory.model';
import Pricing from '../../models/admin/pricing/pricing.model';

export const createInventory = async (data: any) => {
  const newInventory = await Inventory.create({ ...data });
  const pricing = await Pricing.create({
    ...data.pricing,
    inventory_id: newInventory.id,
  });
  return { newInventory, pricing };
};

export const updateInventoryById = async (id: string, updates: any) => {
  const inventory = await Inventory.findByPk(id);
  if (!inventory) {
    throw new Error('Inventory not found');
  }
  await inventory.update(updates);
  return inventory;
};

export const deleteInventoryById = async (id: string) => {
  const inventory = await Inventory.findByPk(id);
  if (!inventory) {
    throw new Error('Inventory not found');
  }
  await Pricing.destroy({ where: { inventory_id: id } });
  await inventory.destroy();
};

export const fetchAllInventory = async ({ limit, offset }: { limit: number; offset: number }) => {
  return Inventory.findAll({
    include: ['product', 'category', 'subcategory', 'pricing'],
    order: [['stock_date', 'DESC']],
    limit,
    offset
  });
};

export const fetchInventoryById = async (id: string) => {
    const inventory = await Inventory.findByPk(id, {
      include: ['product', 'category', 'subcategory', 'pricing']
    });
    if (!inventory) {
      throw new Error('Inventory not found');
    }
    return inventory;
  };