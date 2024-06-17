import OrderModel from "./order.schema.js";
import ProductModel from '../../product/model/product.schema.js';
import {ObjectId} from 'mongodb';

export const createNewOrderRepo = async (data, user) => {
  // Write your code here for placing a new order
  let productIds = [];

  data.user = user;

  data.paidAt = Date.now();

  data.orderedItems.map((items) => productIds.push(new ObjectId(items.product)));
  
  const getProducts = await ProductModel.find({_id: {$in : productIds}});

   if(getProducts.includes([])){
    return {status: 404, message: {status: 'failure', message: 'Products/ Product not found'}};
   }

   data =  await new OrderModel(data).save();
  return {status: 200, message: {status: 'success', data: data}};
};


export const getSingleOrderRepo = async(id) =>{
    const data = await OrderModel.findById(new ObjectId(id));
    if(!data){
      return {status: 404, message: {status: 'failure', message: 'Order id not found!'}};
    }

    return {status: 200, message: {status: 'success', data: data}};
}

export const getOrdersByUserRepo = async(userID) =>{
   
    const data = await OrderModel.find({user: new ObjectId(userID)}).select('orderedItems');

    return {status: 200, message: {status: 'success', data: data}};
}

export const getAllPlacedOrdersRepo = async() =>{

    const data = await OrderModel.find({orderStatus: 'Processing'});

    return {status: 200, message: {status: 'success', data: data}};
}

export const updateOrderStatusRepo = async(id, orderStatus) =>{

   const data = await OrderModel.updateOne({_id: id}, {orderStatus: orderStatus});

   if(!data.acknowledged){
    return {status: 404, message: {status: 'failure', message: 'Order id not found!'}};
   }
   return {status: 200, message: {status: 'success', message: 'Your order has been shipped'}};
}