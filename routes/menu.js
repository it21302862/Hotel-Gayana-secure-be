const express = require('express');
const Posts = require('../models/menu');

const router = express.Router();

// save data,  related to menu items or details, to a database.

router.post('/menu_Details/save',(req,res)=>{
    let newPost = new Posts(req.body);

    newPost.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Post Save Successfully"
        });
    });
});

//retrieve data, related to menu items or details, from a database.

router.get('/menu_Details',(req,res)=>{
    Posts.find().exec((err,posts)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingPosts:posts
        });
    });
});

//retrieve a single  item from the database based on its unique identifier, which is passed as a parameter in the URL.

router.get("/menu_Details/:id",(req,res) =>{
    let postId = req.params.id;

    Posts.findById(postId,(err,post)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }
        return res.status(200).json({
            success:true,
            post
        });
    });
});

// update a single  item in the database based on its unique identifier, which is passed as a parameter in the URL.

router.put('/menu_Details/update/:id',(req,res) => {

    Posts.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,post) => {

            if(err){
                return res.status(400).json({
                    error:err
                });

            }

            return res.status(200).json({
                success: "Update Succesfully"
            });
        }
    );
});

//delete item

router.delete('/menu_Details/delete/:id',(req,res)=>{
    Posts.findByIdAndRemove(req.params.id).exec((err,deletedPost)=>{

        if(err)return res.status(400).json({
            message:"Delete Unsuccessful",err
        });
        return res.json({
            message:"Delete is Successful",deletedPost
        });
    });

});



module.exports = router;