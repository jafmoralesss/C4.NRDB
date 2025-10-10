const getAllDocs = (collection) => {
  return collection.find({}).toArray();
};

const createDoc = (collection, document) => {
  return collection.insertOne(document);
};

module.exports = {
  getAllDocs,
  createDoc,
};