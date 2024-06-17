import UserModel from "./user.schema.js";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

export const createNewUserRepo = async (user) => {
  return await new UserModel(user).save();
};

export const findUserRepo = async (factor, withPassword = false) => {
  if (withPassword) return await UserModel.findOne(factor).select("+password");
  else return await UserModel.findOne(factor);
};

export const findUserForPasswordResetRepo = async (hashtoken, password) => {
  const result = await UserModel.findOne({
    resetPasswordToken: hashtoken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if(result._id){
  result.password = password;
  await result.save();
  return {status: 200, message: {status: 'success', message: 'Your password has been updated!'}}
  }else{
    return {status: 403, message: {status: 'failure', message: 'Token expired'}};
  }
};

export const updateUserProfileRepo = async (_id, data) => {
  return await UserModel.findOneAndUpdate(_id, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
};

export const getAllUsersRepo = async () => {
  return UserModel.find({});
};

export const deleteUserRepo = async (_id) => {
  return await UserModel.findByIdAndDelete(_id);
};

export const updateUserRoleAndProfileRepo = async (_id, data) => {
  // Write your code here for updating the roles of other users by admin
  try{
   const user = await UserModel.findById(new ObjectId(_id));

   if(!user){
    return {status: 404, message: {status: 'failure', message: 'User not found!'}}
   }

   if(user.role === "admin"){
    return {status: 400, message: {status: 'failure', message: 'User is already a admin'}};
   }

   user.name= data.name;
   user.email = data.email;
   user.role = data.role;

   await user.save();

   return {status: 200, message: {status: 'success', data: user}};
  }catch(err){
    console.log(err);
  }

};
