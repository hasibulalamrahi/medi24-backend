import express, { Router } from "express";
const router : Router= express.Router();
import {getAllCategoriesForClient} from '../../controller/client/category.controller'
import {getAllProducts,getProductDetailsBySlug,getRelatedProductsBySlug} from '../../controller/client/product.controller'
import {addToCart,getCartItems,updateCartItem,deleteCartItem} from '../../controller/client/cart.controller'

router.get("/categories",getAllCategoriesForClient)
router.get("/products",getAllProducts)
router.get("/product/:slug",getProductDetailsBySlug)
router.get("/product/related/:slug",getRelatedProductsBySlug)

//cart endpoints
router.get("/get-cart",getCartItems)
router.post("/add-to-cart",addToCart)
router.patch("/update-cart/:id",updateCartItem)
router.delete("/remove-from-cart/:id",deleteCartItem)

module.exports = router;
