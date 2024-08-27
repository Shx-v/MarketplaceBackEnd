import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import UserRouter from "./routes/UserRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import ServiceRoutes from "./routes/ServiceRoutes.js";
import OrderRoutes from "./routes/OrderRoutes.js";
import SubscriptionRoutes from "./routes/SubscriptionRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/services", ServiceRoutes);
app.use("/api/v1/orders", OrderRoutes);
app.use("/api/v1/subscriptions", SubscriptionRoutes);

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);

    app.listen(8080, () => console.log("Server started on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
