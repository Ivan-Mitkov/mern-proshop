import express from "express";
import path from "path";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadFiles.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
dotenv.config();
//CONNECT TO DB
connectDB();
///
const app = express();
//get request.body
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

//create static folder
// __dirname nod available with import syntax so we are using path.resolve()
const __dirname = path.resolve();
//prepare for heroku
if (process.env.NODE_ENV === "production") {
  //set build folder as static folder
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  //set missing routes to home page
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
}
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//Custom error handler middleware
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold
  )
);
