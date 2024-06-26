const router = require('express').Router();
const userModel = require('../model/user.model');
const postModel = require('../model/post.model');
const jwt = require('jsonwebtoken');
const multer = require('multer');

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

const authenticateToken = (req,res,next)=>{
    const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication token required." });
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, "secretKey");
    req.user = { userId: decoded.userId };
    next();
    } catch (error) {
        return res.status(403).json({message:"Invalid authentication token"});
    }
};
const storage = multer.memoryStorage();
const upload = multer({ storage });
  
router.post('/create-post', authenticateToken, upload.single('image'), async(req,res)=>{
    const {title, details, location, price, phoneNumber} = req.body;
    const memberId = req.user.userId;
    try {
        const post = new postModel({
            title,
            image: req.file.buffer.toString('base64'),
            details,
            location,
            price,
            phoneNumber,
            memberId
        });
        await post.save();
        res.status(200).json({message:"Post created successfully."});
    } catch (error) {
        res.status(500).json({message:"Error creating post."});
    }
});
router.get('/posts', async(req,res)=>{
    try {
        const posts = await postModel.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({message: " Error fetching posts"});
    }
});
module.exports = router;