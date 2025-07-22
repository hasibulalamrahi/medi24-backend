import { DataTypes, Model, Optional } from "sequelize";
const sequelize= require('../../../../config/database')
import {Category,SubCategory} from "../catalog/category.model";


interface ProductDictionaryAttributes {
  id: string;
  product_name: string;
  product_type: string;
  product_category_id: string;
  product_subcategory_id: string;
  product_slug: string;
  strength: string;
  product_description: string;
  product_generic_name: string;
  product_image: string;
  manufacturer_name: string;

}

interface ProductDictionaryCreationAttributes extends Optional<ProductDictionaryAttributes, "id"> {}

class ProductDictionary extends Model<ProductDictionaryAttributes, ProductDictionaryCreationAttributes> implements ProductDictionaryAttributes {
  public id!: string;
  public product_name!: string;
  public product_type!: string;
  public product_category_id!: string;
  public product_subcategory_id!: string;
  public product_slug!: string;
  public strength!: string;
  public product_description!: string;
  public product_generic_name!: string;
  public product_image!: string;
  public manufacturer_name!: string;

}

ProductDictionary.init(
  {
    id: { 
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // ✅ Auto-generate UUID
      primaryKey: true 
    },
    product_type:{ type: DataTypes.STRING, allowNull: false },
    product_name: { type: DataTypes.STRING, allowNull: false },
    product_slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    strength: { type: DataTypes.STRING, allowNull: false },
    product_category_id: { 
      type: DataTypes.UUID, 
      allowNull: false, 
      references: { model: Category, key: "id" } 
    },
    product_subcategory_id: { 
      type: DataTypes.UUID, 
      allowNull: false, 
      references: { model: SubCategory, key: "id" } 
    },
    product_description: { type: DataTypes.TEXT, allowNull: true },
    product_generic_name: { type: DataTypes.STRING, allowNull: false },
    product_image: { type: DataTypes.STRING, allowNull: true }, // ✅ Can store image URLs
    manufacturer_name: { type: DataTypes.STRING, allowNull: false },

  },
  {
    sequelize,
    schema: "dictionary",
    tableName: "product_dictionary",
  }
);

// ✅ Define Relationships
ProductDictionary.belongsTo(Category, { foreignKey: "product_category_id", as: "category" });
ProductDictionary.belongsTo(SubCategory, { foreignKey: "product_subcategory_id", as: "subcategory" });

export default ProductDictionary;
