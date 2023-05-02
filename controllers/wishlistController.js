//import wishlists collection/model

const wishlists = require('../models/wishlistschema')

//logic to add item ti wishlist
exports.addToWishlist = async (req,res)=>{
    //destructuring
    //emp={id:1,name:"gopx"}
    //costb{id,name}=emp
    //inside emp.id we use  id
    //get product details from req body
    const {id,title,price,image} = req.body
    //check product is already in wishlist
    try{
        const item = await wishlists.findOne({id})
        //check product is already in wishlist
        if(item){
            //product  is available
            res.status(401).json("item already present in your wishlist!!!")
        }
        else{
            //product is not available,so add
            const newProduct = new wishlists({
                id,title,price,image
            })
            //save to db 
            await newProduct.save()
            res.status(200).json("item added to your wishlist!!!")
        }
    }
    catch(error){
       res.status(401).json(error)
    }
}


//get all items in wishlist
exports.getAllWishlistItems = async(req,res)=>{
    //logic
    try{
        //to get all items from an collection
        const allItems = await wishlists.find()
        if(allItems){
            res.status(200).json(allItems)
        }
        else{
            res.status(401).json("Your wishlist is Empty")
        }
    }catch(error){
        res.status(401).json(error)
    }
}

//remove item from wishlist
exports.removeWishlistItem = async(req,res)=>{
    //logic
    //get product id from req url
    const id = req.params.id
    //check id is in collection
    try{
        const item = await wishlists.deleteOne({id})
        if(item){
            //get remaining items other than deleted one
            const allItems = await wishlists.find()
            res.status(200).json(allItems)
        }
        else{
            res.status(401).json("Items is not in the wishlist")
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}