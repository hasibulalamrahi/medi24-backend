// ===========================
// models/inventory.model.ts
// ===========================
import { DataTypes, Model, Optional } from 'sequelize';
const sequelize= require('../../../../config/database')
import ProductDictionary from '../dictionary/product-dictionary.model';
import {Category,SubCategory} from '../catalog/category.model';
import Pricing from '../pricing/pricing.model';

interface InventoryAttributes {
  id: string;
  product_id: string;
  quantity: number;
  seller_info: string;
  batch_id: string;
  store: string;
  stock_date: Date;
  is_available: boolean;
  med_type: 'counter' | 'prescribed';
  category_id: string;
  subcategory_id: string;
  expiry_date: Date;
  modified_at: Date;
  manufacturer: string;
  notes?: string;
  labels: string[];
  tags: string[];
}

interface InventoryCreationAttributes extends Optional<InventoryAttributes, 'id' | 'batch_id'> {}

class Inventory extends Model<InventoryAttributes, InventoryCreationAttributes> implements InventoryAttributes {
  public id!: string;
  public product_id!: string;
  public quantity!: number;
  public seller_info!: string;
  public batch_id!: string;
  public store!: string;
  public stock_date!: Date;
  public is_available!: boolean;
  public med_type!: 'counter' | 'prescribed';
  public category_id!: string;
  public subcategory_id!: string;
  public expiry_date!: Date;
  public modified_at!: Date;
  public manufacturer!: string;
  public notes?: string;
  public labels!: string[];
  public tags!: string[];
}

Inventory.init(
  {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    product_id: { type: DataTypes.UUID, allowNull: false, references: { model: ProductDictionary, key: 'id' } },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    seller_info: { type: DataTypes.STRING, allowNull: false },
    batch_id: { type: DataTypes.STRING, allowNull: false, defaultValue: () => `BATCH-${Date.now()}` },
    store: { type: DataTypes.STRING, allowNull: false },
    stock_date: { type: DataTypes.DATE, allowNull: false },
    is_available: { type: DataTypes.BOOLEAN, defaultValue: true },
    med_type: { type: DataTypes.ENUM('counter', 'prescribed'), allowNull: false },
    category_id: { type: DataTypes.UUID, allowNull: false, references: { model: Category, key: 'id' } },
    subcategory_id: { type: DataTypes.UUID, allowNull: false, references: { model: SubCategory, key: 'id' } },
    expiry_date: { type: DataTypes.DATE, allowNull: false },
    modified_at: { type: DataTypes.DATE, allowNull: false },
    manufacturer: { type: DataTypes.STRING, allowNull: false },
    notes: { type: DataTypes.TEXT },
    labels: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
    tags: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
  },
  {
    sequelize,
    schema: 'inventory',
    tableName: 'inventory_batches',
  }
);

// Relationships
Inventory.belongsTo(ProductDictionary, { foreignKey: 'product_id', as: 'product' });
Inventory.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
Inventory.belongsTo(SubCategory, { foreignKey: 'subcategory_id', as: 'subcategory' });
Inventory.hasOne(Pricing, { foreignKey: 'inventory_id', as: 'pricing' });

export default Inventory;
