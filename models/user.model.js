const bcrypt = require ('bcryptjs');

const createdUser = async (collection, user) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const newUser = {
        username: user.username,
        password: hashedPassword,
        role: user.role || user,
    };
    return collection.insertOne(newUser);
};

const findUserbyUserName = (collection, username) =>{
    return collection.findOne ({username: username});
};

module.exports ={
    createdUser,
    findUserbyUserName,
};