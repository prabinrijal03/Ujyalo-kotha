const router = require('express').Router();
const userModel = require('../model/user.model');
const jwt = require('jsonwebtoken');

router.post('/register', async(req,res)=>{
    const { fullName, address, phoneNumber, email, password } = req.body;
    try {
        const user = new userModel({
            fullName,
            address, 
            phoneNumber, 
            email, 
            password
        });
        await user.save();
        res.status(200).json({ message: "User registered successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error registering user"});
    }
});

router.post('/login', async(req,res)=>{
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({email});
        if (!user){
            return res.status(404).json({message: "User not found"});
        }
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid){
            return res.status(401).json({message: "Invalid password"});
        }
        const token = jwt.sign({ userId: user._id }, 'secretKey');
        res.status(200).json({ message: "Login successful", token: token });
}
    catch (error){
    console.error(error);
        res.status(500).json({message: "Error logging in"});
    }
});
module.exports = router;