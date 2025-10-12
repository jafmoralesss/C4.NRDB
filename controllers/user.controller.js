const {getDB} = require ('../database');
const UserModel = require('../models/user.model');

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

module.exports = {
    registerUser,
};