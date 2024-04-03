import { StatusCodes } from "http-status-codes";
import Cart from "../models/cart";
import Product from "../models/products";
import User from "../models/user";

export const addItemCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    //Kiểm tra giỏ hàng có tồn tại chưa? dựa theo UserId
    let cart = await Cart.findOne({ userId });
    //nếu giỏ hàng tồn tại thì tạo mới
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }
    //kiểm tra xem sản phẩm có tồn tại trong giỏ hàng không ?
    const existProductIndex = cart.products.findIndex(
      (item) => item.productId.toString === productId
    );
    //nếu sản phẩm tồn tại thì cập nhật số lượng
    if (existProductIndex !== -1) {
      cart.products[existProductIndex].quantity += quantity;
    } else {
      // nếu sản phẩm chưa có thì thêm mới
      cart.products.push({ productId, quantity });
    }
    await cart.save();
    return res.status(StatusCodes.OK).json({ cart });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: error });
  }
};

export const getCartByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId: userId }).populate(
      "products.productId"
    );
    const CartData = {
      products: cart.products.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        name: item.productId.name,
      })),
    };
    return res.status(StatusCodes.OK).json({ products: CartData.products });
  } catch (error) {}
};
