

import { request, response } from "express";
import Post from "../model/post.js";


export const createPost=async(request,response)=>{
try{
    const post=await new Post(request.body);
    post.save();
    return response.status(200).json('post saved');
}
catch(error){
return response.status(500).json(error);
}
}
export const getAllPosts=async(request,response)=>{
    
    let category=request.query.category;
    let posts;
    try{
        if(category){
posts=await Post.find({categories:category})
        } 

        else{
             posts=await Post.find({});
           
                }
                return  response.status(200).json(posts);
    }
  
    catch(error){
       return response.status(500).json({msg:error.message})  
    }
}
export const getPost=async(request,response)=>{
try{
const post=await Post.findById(request.params.id);
if (post) {
   return response.status(200).json(post);
  }
  else
  return response.status(201).json({ msg: 'Post not found' });
}catch(error){
    console.log(error)
    response.status(500).json({msg:'error.message'}) 
}
}
export const updatePost=async(request,response)=>{
    try{
        const post=await Post.findById(request.params.id);
        if(!post){
        return response.status(404).json({msg:`post not found`});
    }
 
    await Post.findByIdAndUpdate(request.params.id,{$set:request.body})
return response.status(200).json({msg:'post updated succesfully'});
}


catch(error){
    response.status(500).json({msg:error.message}) 
}
}
export const deletePost = async (request, response) => {
    try {
          await Post.findByIdAndDelete(request.params.id);
        
    

        response.status(200).json('post deleted successfully');
    } catch (error) {
        response.status(500).json(error)
    }
}
//await Post.findByIdAndDelete(post._id)