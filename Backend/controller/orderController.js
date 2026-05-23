import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import razorpay from 'razorpay'
import dotenv from 'dotenv'
dotenv.config()


const currency = 'inr'
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//  for user

export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    const orderData = {
      items,
      amount,
      userId,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    // 1. Create and Save the new order
    const newOrder = new Order(orderData);
    await newOrder.save();

    // 2. Clear the user's cartData after placing the order
    await User.findByIdAndUpdate(userId, { cartData: {} });

    // 3. Send Success Response
    res.status(201).json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Order Place error" });
  }
};

export const placeOrderRazorpay = async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        const userId = req.userId;

        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod: 'Razorpay',
            payment: false,
            date: Date.now()
        }

        const newOrder = new Order(orderData)
        await newOrder.save()

        const options = {
            amount: amount * 100, // Razorpay expects amount in subunits (e.g., paise)
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error)
                return res.status(500).json(error)
            }
            res.status(200).json(order)
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

export const verifyRazorpay = async (req, res) => {
  try {

    const userId = req.userId;

    const {
      razorpay_order_id,
      razorpay_payment_id,
    } = req.body;

    // Find order using receipt/order id
    const orderInfo = await razorpayInstance.orders.fetch(
      razorpay_order_id
    );

    // Mark payment successful
    await Order.findByIdAndUpdate(
      orderInfo.receipt,
      {
        payment: true,
      }
    );

    // Clear cart
    await User.findByIdAndUpdate(
      userId,
      { cartData: {} }
    );

    return res.status(200).json({
      success: true,
      message: "Payment Successful",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};








export const userOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await Order.find({ userId });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log("userOrders error:", error);

    res.status(500).json({
      success: false,
      message: "User orders error",
    });
  }
};

//For admin

export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({});

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "adminAllOrders error",
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await Order.findByIdAndUpdate(orderId, { status });

    return res.status(200).json({
      success: true,
      message: "Status Updated",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
