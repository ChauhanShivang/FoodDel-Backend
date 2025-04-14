import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { placeOrder, userOrders, verifyOrder, listOrders, updateStatus } from '../controllers/orderController.js'

const orderRouter = express.Router()

const app = express();
app.use(express.json()); 

orderRouter.post("/place", authMiddleware, placeOrder)
orderRouter.post("/verify", verifyOrder)
orderRouter.post("/userorders", authMiddleware, userOrders)
orderRouter.get("/list", listOrders)
orderRouter.post("/status", updateStatus)

export default orderRouter