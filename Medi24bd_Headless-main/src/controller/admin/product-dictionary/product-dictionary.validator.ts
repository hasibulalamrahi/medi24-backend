import * as yup from "yup";

// ✅ Product Validation Schema
export const productDictionarySchema = yup.object().shape({
  product_name: yup
    .string()
    .required("Product name is required")
    .min(3, "Product name must be at least 3 characters")
    .max(100, "Product name must be at most 100 characters"),

  product_type: yup
    .string()
    .required("Product type is required"),

  product_category_id: yup
    .string()
    .uuid("Invalid category ID format")
    .required("Product category is required"),

  product_subcategory_id: yup
    .string()
    .uuid("Invalid subcategory ID format")
    .required("Product subcategory is required"),

  product_slug: yup
    .string()
    .required("Product slug is required")
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be URL-friendly (lowercase and hyphen-separated)"),

  strength: yup
    .string()
    .required("Product strength is required"),

  product_description: yup
    .string()
    .nullable()
    .max(500, "Description should be at most 50000 characters"),

  product_generic_name: yup
    .string()
    .required("Product generic name is required"),

  product_image: yup
    .string()
    .nullable()
    .url("Invalid image URL format"),

  manufacturer_name: yup
    .string()
    .required("Manufacturer name is required")
    .min(3, "Manufacturer name must be at least 3 characters"),
});
