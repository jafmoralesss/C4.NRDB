const { getDB } = require('../database');
const DataModel = require('../models/data.model');

const getAllData = async (req, res) => {

  try {

    const collection = getDB().collection("Trial collection");
    const documents = await DataModel.getAllDocuments(collection);
    res.json(documents);

  } catch (e) {
    
    res.status(500).send("Error fetching documents.");
    
  }
};

module.exports = {
  getAllData,
};