import { Cart } from "../Models/cart.model.js";
export const addToCart = async (req, res) => {
  const { productId, title, qty, imgSrc, price } = req.body;
  const userId = req.user;
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({
      userId,
      items: [],
    });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );
  if (itemIndex > -1) {
    cart.items[itemIndex].qty += qty;
    cart.items[itemIndex].price += price * qty;
  } else {
    cart.items.push({ productId, title, qty, imgSrc, price });
  }

  await cart.save();
  res.status(200).json({ message: "item added to cart successfully", cart });
};

export const userCart = async (req, res) => {
  const userId = req.user;
  let cart = await Cart.findOne({ userId });
  if (!cart) return res.status(404).json({ message: "cart not found" });

  res.status(200).json({ message: "here's user cart", cart });
};

export const deleteCartItem = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.user;

  let cart = await Cart.findOne({ userId });
  if (!cart) return res.status(404).json({ message: "cart not found" });
  cart.items = cart.items.filter(
    (item) => item.productId.toString() != productId
  );
  await cart.save();
  res.status(200).json({ message: "Product   deleted from cart successfully" });
};

export const deleteAllCartItems = async (req, res) => {
  const userId = req.user;

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ items: [] });
  } else {
    cart.items = [];
  }
await cart.save();
  res.status(200).json({ message: " cart deleted successfully" });
};


export const DecreaseProductQty = async (req, res) => {
  const { productId, qty } = req.body;
  const userId = req.user;
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({
      userId,
      items: [],
    });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );
  if (itemIndex > -1) {
    const item = cart.items[itemIndex];
    if(item.qty > qty){
      const pricePerUnit = item.price/item.qty
      item.qty -= qty;
      item.price -= pricePerUnit * qty;
    }
    else{
      cart.items.splice(itemIndex,1)
    }

  } else {
return res.status(400).json({message:"invalid product id"})
  }

  await cart.save();
  res.status(200).json({ message: "item Qty  decreased successfully", cart });
};
