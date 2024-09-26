import { Payment } from "../Models/Payment.model.js";
import Razorpay from "razorpay";
import dotenv from 'dotenv'

dotenv.config()

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
}); 

// checkout
export const checkout = async (req, res) => {
  const { amount, cartItems, userShipping, userId } = req.body;

  var options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);

  res.json({
    orderId: order.id,
    amount: amount,
    cartItems,
    userShipping,
    userId,
    payStatus: "created",
  });
};

export const verify = async (req, res) => {
  const {
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
  } = req.body;

  let orderConfirm = await Payment.create({
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
    payStatus: "paid",
  });

  res.json({ message: "payment successfull..", success: true, orderConfirm });
};