import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors"
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";



let app = express();



app.use(express.json())
app.use(cookieParser())

  app.use (cors({
    origin:["https://e-commerce-one-cart-frontendt.onrender.com" ,"https://e-commerce-one-cart-admin-latest.onrender.com"],
    credentials:true

  }) )

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/product",productRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/order",orderRoutes)




let port = process.env.PORT || 6000;

connectDb();

app.get("/", (req, res) => {
  res.send("Server running with MySQL");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
