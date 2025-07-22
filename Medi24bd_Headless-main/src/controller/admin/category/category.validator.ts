import * as yup from "yup";

export const categorySchema = yup.object().shape({
  category_name: yup.string().required("Category name is required"),
  subcategories: yup.array().of(
    yup.string().required("Subcategory name must be a string")
  ).optional(),
});
