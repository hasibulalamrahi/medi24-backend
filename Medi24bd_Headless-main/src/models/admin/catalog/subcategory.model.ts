// import { DataTypes, Model, Optional } from "sequelize";
// const sequelize= require('../../../../config/database')
// import Category from "./category.model";

// interface SubCategoryAttributes {
//   id: string;
//   name: string;
//   category_id: string;
// }

// interface SubCategoryCreationAttributes extends Optional<SubCategoryAttributes, "id"> {}

// class SubCategory extends Model<SubCategoryAttributes, SubCategoryCreationAttributes> implements SubCategoryAttributes {
//   public id!: string;
//   public name!: string;
//   public category_id!: string;
// }

// SubCategory.init(
//   {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4, // ✅ Generates UUID v4 automatically
//       primaryKey: true,
//     },
//     name: { type: DataTypes.STRING, allowNull: false },
//     category_id: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       references: { model: Category, key: "id" },
//       onDelete: "CASCADE",
//     },
//   },
//   {
//     sequelize,
//     schema: "catalog",
//     tableName: "subcategories",
//   }
// );

// // Relationship: SubCategory belongs to Category
// SubCategory.belongsTo(Category, { foreignKey: "category_id", as: "category" });

// export default SubCategory;
