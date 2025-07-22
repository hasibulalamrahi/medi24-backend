// ===========================
// models/cart.model.ts
// ===========================
import { DataTypes, Model, Optional } from 'sequelize';
const sequelize= require('../../../../config/database')
import User from '../user/user.model';

interface CartAttributes {
  id: string;
  user_id: string;
  product_title: string;
  product_id: string;
  price: number;
  stock_id: string;
  product_image: string;
  is_available: boolean;
  quantity: number;
  total_savings:number;
}

interface CartCreationAttributes extends Optional<CartAttributes, 'id'> {}

class Cart extends Model<CartAttributes, CartCreationAttributes> implements CartAttributes {
  public id!: string;
  public user_id!: string;
  public product_title!: string;
  public product_id!: string;
  public price!: number;
  public stock_id!: string;
  public product_image!: string;
  public is_available!: boolean;
  public quantity!: number;
  public total_savings!:number;
}

Cart.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    user_id: { type: DataTypes.UUID, allowNull: false },
    product_title: { type: DataTypes.STRING, allowNull: false },
    product_id: { type: DataTypes.UUID, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    stock_id: { type: DataTypes.UUID, allowNull: false },
    product_image: { type: DataTypes.STRING, allowNull: false },
    is_available: { type: DataTypes.BOOLEAN, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    total_savings:{type: DataTypes.INTEGER, allowNull: false }
  },
  {
    sequelize,
    tableName: 'cart',
    schema: 'user',
    timestamps: true,
  }
);

Cart.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

export default Cart;
