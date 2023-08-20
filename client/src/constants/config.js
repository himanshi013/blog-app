

export const API_NOTIFICATIONS_MESSAGES={
    loadings:{
        title:'loading..',
        message:'data is being loaded please wait'
    },
    success:{
        title:'Success',
        message:'data succesfully loaded'
    },
    responseFailure:{
        title:'error',
        message:'error occoured while fetching response from server'
    },
    requestFailure:{
        title:'error',
        message:'error occoured while parsing req data'
    },
    networkError:{
        title:'Error',
        message:'unable to connect with server'
    }
    
}
export  const SERVICE_URLS={
    userSignup:{url:'/signup',method:'POST'},
    userLogin:{url:'/Login',method:'POST', headers:{"Content-type": "application/json"}},
    uploadFile:{url:'/file/upload',method:'POST'},
    createPost:{url:'/create',method:'POST'},
    getAllPosts:{url:'/posts',method:'GET',params:true},
    getPostById:{url:'/post',method:'GET',query:true},
    updatePost:{url:'/update',method:'PUT',query:true},
    deletePost:{url:'/delete',method:'DELETE',query:true},
    newComment:{url:'/comment/new',method:'POST'},
    getAllComments:{url:'/comments',method:'GET',query:true},
    deleteComment:{url:'/comment/delete',method:'DELETE',query:true}
}