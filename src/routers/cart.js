import { Router } from "express";
import { addItemCart, getCartByUserId } from "../controllers/cart";

const router = Router();

router.post("/cart/add-to-cart", addItemCart);
router.get("/cart/:userId", getCartByUserId);

export default router;
