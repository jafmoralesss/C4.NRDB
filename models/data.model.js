const getAllDocs = (collection) =>{
    return collection.fin({}).toArray();
};

module.exports = {
    getAllDocs,
};