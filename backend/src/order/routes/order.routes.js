import express from "express";
import { createNewOrder, getSingleOrder, getOrdersByUser , getAllPlacedOrders, updateOrderStatus} from "../controllers/order.controller.js";
import { auth } from "../../../middlewares/auth.js";

const router = express.Router();

router.route("/new").post(auth, createNewOrder);

router.route("/my/orders").get(auth, getOrdersByUser);

router.route("/orders/placed").get(auth, getAllPlacedOrders);

router.route("/:id").get(auth, getSingleOrder);

router.route("/update/:id").put(auth, updateOrderStatus);

export default router;
