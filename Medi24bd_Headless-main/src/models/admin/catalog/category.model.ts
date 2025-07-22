import { DataTypes, Model, Optional } from "sequelize";
// import sequelize from "../../../../config/database"; // ✅ Ensure correct import
const sequelize= require('../../../../config/database')

// ✅ Define Category Interface
interface CategoryAttributes {
  id: string;
  category_name: string;
}

// ✅ Define SubCategory Interface
interface SubCategoryAttributes {
  id: string;
  name: string;
  category_id: string;
}

// ✅ Optional Attributes for Creation
interface CategoryCreationAttributes extends Optional<CategoryAttributes, "id"> {}
interface SubCategoryCreationAttributes extends Optional<SubCategoryAttributes, "id"> {}

// ✅ Category Model
class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
  public id!: string;
  public category_name!: string;
}

// ✅ SubCategory Model
class SubCategory extends Model<SubCategoryAttributes, SubCategoryCreationAttributes> implements SubCategoryAttributes {
  public id!: string;
  public name!: string;
  public category_id!: string;
}

// ✅ Initialize Category Model
Category.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // ✅ Generates UUID v4 automatically
      primaryKey: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    schema: "catalog",
    tableName: "categories",
  }
);

// ✅ Initialize SubCategory Model
SubCategory.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // ✅ Generates UUID v4 automatically
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "categories", key: "id" },
      onDelete: "CASCADE", // ✅ Deletes subcategories when category is deleted
    },
  },
  {
    sequelize,
    schema: "catalog",
    tableName: "subcategories",
  }
);

// ✅ Define Relationships
Category.hasMany(SubCategory, { foreignKey: "category_id", as: "subcategories" });
SubCategory.belongsTo(Category, { foreignKey: "category_id", as: "category" });

// ✅ Export Both Models
export { Category, SubCategory };
