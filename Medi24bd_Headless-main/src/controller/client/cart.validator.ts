// ===========================
// validators/cart.validator.ts
// ===========================
import * as yup from 'yup';

export const cartSchema = yup.object().shape({
  user_id: yup.string().uuid().required('User ID is required'),
  product_title: yup.string().required('Product title is required'),
  product_id: yup.string().uuid().required('Product ID is required'),
  price: yup.number().required('Price is required'),
  stock_id: yup.string().uuid().required('Stock ID is required'),
  product_image: yup.string().url().required('Product image URL is required'),
  is_available: yup.boolean().required('Availability is required'),
  quantity: yup.number().integer().positive().required('Quantity is required'),
  total_savings: yup.number().integer().positive().required('Total Savings is required')
});
