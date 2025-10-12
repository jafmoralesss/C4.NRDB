const {getDB} = require ('../database');
const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    try{
        const usersCollection = getDB().collection("users");

        const existingUser = await UserModel.findUserbyUserName(usersCollection, req.body.username);
        if (existingUser){
            return res.status(400).send("Username has already been created.");
        }

        await UserModel.createdUser(usersCollection, req.body);
        res.status(201).send("Succesful registration.");
    } catch (e){
        console.error(e);
        res.status(500).send("Error registering user.");
    }
};

const loginUser = async (req, res) =>{
    try{
        const usersCollection = getDB().collection("users");
        const {username, password} = req.body;

        const user = await UserModel.findUserbyUserName(usersCollection, username);
        if (!user){
            return res.status(400).send("Invalid password or user.");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).send("Invalid password or user.");
        }

        const payload = {id: user._id, username: user.username, role: user.role};
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.json({message: "Succesful Login", token: token});
    } catch (e){
        console.error(e);
        res.status(500).send("Error when logging in.");
    }
};

module.exports = {
    loginUser,
    registerUser,
};