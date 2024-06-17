// Please don't change the pre-written code
// Import the necessary modules here

import { createNewOrderRepo, getSingleOrderRepo , getOrdersByUserRepo, getAllPlacedOrdersRepo, updateOrderStatusRepo} from "../model/order.repository.js";
import { ErrorHandler } from "../../../utils/errorHandler.js";

export const createNewOrder = async (req, res, next) => {
  // Write your code here for placing a new order
  try{
    const user = req.user._id;
    const data = await createNewOrderRepo(req.body, user);
     res.status(data.status).json(data.message);
  }catch(err){
    console.log(err);
    next(new ErrorHandler(500, err));
  }
};


export const getSingleOrder = async(req, res, next) =>{

  try{

    const {id} = req.params;
     const data = await getSingleOrderRepo(id);
     res.status(data.status).json(data.message);

  }catch(err){
    console.log(err);
    next(new ErrorHandler(500, err));
  }
}

export const getOrdersByUser = async(req, res, next) =>{
  try{

    const id = req.user._id;
     const data = await getOrdersByUserRepo(id);
     res.status(data.status).json(data.message);

  }catch(err){
    console.log(err);
    next(new ErrorHandler(500, err));
  }
}

export const getAllPlacedOrders = async(req, res, next) =>{
  try{
    
    const data = await getAllPlacedOrdersRepo();
    res.status(data.status).json(data.message);
  }catch(err){
    console.log(err);
    next(new ErrorHandler(500, err));
  }
}

export const updateOrderStatus = async(req, res, next) =>{
  try{
    const {id} = req.params;

    const {orderStatus} = req.body;

    if(!orderStatus){
      return res.status(400).json({
        status: 'failure',
        message: 'Bad request'
      })
    }

    const data = await updateOrderStatusRepo(id, orderStatus);

    res.status(data.status).json(data.message);
  }catch(err){
    console.log(err);
    next(new ErrorHandler(500, err));
  }
}
