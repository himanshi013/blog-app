

import { request, response } from 'express';
import Comment from '../model/comment.js'
export const newComment=async(request,response)=>{
try{
    const comment=await new Comment(request.body);
    comment.save();
    response.status(200).json({msg:'comment saved succesfully'})
}
catch(error){
    response.status(500).json({error:error.message})
}
}

export const getComments = async (request, response) => {
    try {
        // const comments = await Comment.find({ postId: request.params.id });
        const comments = await Comment.find({});
        response.status(200).json(comments);
    } catch (error) {
        response.status(500).json(error)
    }
}
 export const deleteComment=async(request,response)=>{
    try{
       
  
        await  Comment.findByIdAndDelete(request.params.id);  
  response.status(200).json({msg:'comment deleted succesfully'})
}
    catch(error){
        response.status(500).json({error:error.message})
    }
 }