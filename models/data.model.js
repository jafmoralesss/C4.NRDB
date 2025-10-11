const { ObjectId } = require('mongodb');

const getAllDocs = (collection) => {
  return collection.find({}).toArray();
};

const createDoc = (collection, document) => {
  return collection.insertOne(document);
};

const updateDoc = (collection, id, updateData) => {
    return collection.updateOne(

        {_id: new ObjectId(id)},
        {$set: updateData}
    );
};

const deleteDoc = (collection, id) => {
    return collection.deleteOne({ _id: new ObjectId(id)});
};

module.exports = {
  getAllDocs,
  createDoc,
  updateDoc,
  deleteDoc,
};