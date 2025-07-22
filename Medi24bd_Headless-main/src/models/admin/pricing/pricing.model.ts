import { DataTypes, Model, Optional } from 'sequelize';
const sequelize= require('../../../../config/database')
import Inventory from '../inventory/inventory.model';

interface PricingAttributes {
  id: string;
  inventory_id: string;
  b2b_discount_percentage: number;
  b2c_discount_percentage: number;
  mrp_price: number;
  total_savings_b2b: number;
  total_savings_b2c: number;
  total_commission_b2c: number;
  max_discount_b2b: number;
  max_discount_b2c: number;
  selling_price_b2b: number;
  selling_price_b2c: number;
}

interface PricingCreationAttributes extends Optional<PricingAttributes, 'id'> {}

class Pricing extends Model<PricingAttributes, PricingCreationAttributes> implements PricingAttributes {
  public id!: string;
  public inventory_id!: string;
  public b2b_discount_percentage!: number;
  public b2c_discount_percentage!: number;
  public mrp_price!: number;
  public total_savings_b2b!: number;
  public total_savings_b2c!: number;
  public total_commission_b2c!: number;
  public max_discount_b2b!: number;
  public max_discount_b2c!: number;
  public selling_price_b2b!: number;
  public selling_price_b2c!: number;
}

Pricing.init(
  {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    inventory_id: { type: DataTypes.UUID, allowNull: false, references: { model: Inventory, key: 'id' } },
    b2b_discount_percentage: { type: DataTypes.FLOAT, allowNull: false },
    b2c_discount_percentage: { type: DataTypes.FLOAT, allowNull: false },
    mrp_price: { type: DataTypes.FLOAT, allowNull: false },
    total_savings_b2b: { type: DataTypes.FLOAT, allowNull: false },
    total_savings_b2c: { type: DataTypes.FLOAT, allowNull: false },
    total_commission_b2c: { type: DataTypes.FLOAT, allowNull: false },
    max_discount_b2b: { type: DataTypes.FLOAT, allowNull: false },
    max_discount_b2c: { type: DataTypes.FLOAT, allowNull: false },
    selling_price_b2b: { type: DataTypes.FLOAT, allowNull: false },
    selling_price_b2c: { type: DataTypes.FLOAT, allowNull: false },
  },
  {
    sequelize,
    schema: 'inventory',
    tableName: 'pricing_info',
  }
);

export default Pricing;
