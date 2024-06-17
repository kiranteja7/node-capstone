import ProductModel from "./product.schema.js";

export const addNewProductRepo = async (product) => {
  return await new ProductModel(product).save();
};

export const getAllProductsRepo = async (expression) => {
  const page = expression.page || 1;
  const pageSize = 10;
 
  const filteredExpression = {}

   if(expression.keyword){
   filteredExpression.name = { $regex: new RegExp(expression.keyword, 'i') };
   }
   
   if(expression.category){
   filteredExpression.category = { $regex: new RegExp(expression.category, 'i') }
   }

   if (expression.price) {
    const { gte, lte } = expression.price;
  
    if (gte >= 0) {
      filteredExpression.price = { ...filteredExpression.price, $gte: Number(gte) };
    } else {
      return { status: 400, message: { status: 'failure', message: `Invalid price` } };
    }
  
    if (lte >= 0) {
      filteredExpression.price = { ...filteredExpression.price, $lte: Number(lte) };
    } else {
      return { status: 400, message: { status: 'failure', message: `Invalid price` } };
    }
  }
  
  if (expression.rating) {
    const { gte, lte } = expression.rating;
  
    if (gte >= 0 && gte <= 5) {
      filteredExpression.rating = { $gte: Number(gte) };
    } else {
      return { status: 400, message: { status: 'failure', message: `Invalid rating. Rating must be from 0 to 5` } };
    }
  
    if (lte >= 0 && lte <= 5) {
      filteredExpression.rating = { ...filteredExpression.rating, $lte: Number(lte) };
    } else {
      return { status: 400, message: { status: 'failure', message: `Invalid rating. Rating must be from 0 to 5` } };
    }
  }

  const data =  await ProductModel.find(filteredExpression).skip(((Number(page)-1) * pageSize)).limit(pageSize);

  return {status: 200, message: {status: 'success', data : data}};
};

export const updateProductRepo = async (_id, updatedData) => {
  return await ProductModel.findByIdAndUpdate(_id, updatedData, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });
};

export const deleProductRepo = async (_id) => {
  return await ProductModel.findByIdAndDelete(_id);
};

export const getProductDetailsRepo = async (_id) => {
  return await ProductModel.findById(_id);
};

export const getTotalCountsOfProduct = async () => {
  return await ProductModel.countDocuments();
};

export const findProductRepo = async (productId) => {
  return await ProductModel.findById(productId);
};
