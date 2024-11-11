const express = require("express");
const router = express.Router();
const users = require("../models/userSchemas")



//router.get("/",(req,res)=>{
//    console.log("connect");
//})


// register user
router.post("/register", async (req, res) => {
    //console.log(req.body);
    const { name, email, age, mobile, work, add, desc } = req.body;
    if (!name || !email || !age || !mobile || !work || !add || !desc) {
        res.status(422).json("Please Fill the data");
    }

    try {
        const preuser = await users.findOne({ email: email })
        console.log(preuser);

        if (preuser) {
            res.status(422).json("this is user is already present");
        }
        else {
            const adduser = new users({
                name, email, age, mobile, work, add, desc
            });

            await adduser.save();
            res.status(201).json(adduser);
            console.log(adduser);
        }
    } catch (error) {
        res.status(422).json(error)
    }
})


// get userdata

router.get("/getdata",async(req,res)=>{
    try{
        const userdata = await users.find();
        res.status(201).json(userdata)
        console.log(userdata);
    }catch(error){
        res.status(422).json(error)
    }
})

//get individual user


router.get("/getuser/:id",async(req,res)=>{
    try{
        console.log(req.params);
        const{id} =req.params;
        
        const userindividual = await users.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual)
    }catch(error){
        res.status(422).json(error)
    }
})

// Update user data
router.patch("/updateuser/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateduser = await users.findByIdAndUpdate(id, req.body, {
            new: true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);
    } catch (error) {
        res.status(422).json(error);
    }
});

// Delete user
router.delete("/deleteuser/:id", async (req, res) => {
    try {
        const { id } = req.params; // Extract user ID from URL parameter

        // Attempt to delete the user by ID
        const deleteuser = await users.findByIdAndDelete({ _id: id });

        // Check if user was found and deleted
        if (!deleteuser) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("User deleted:", deleteuser);
        return res.status(200).json({ message: "User deleted successfully", data: deleteuser });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
});



module.exports = router;