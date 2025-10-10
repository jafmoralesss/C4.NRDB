const { getDB } = require('../database');
const DataModel = require('../models/data.model');

const getAllData = async (req, res) => {

  try {

    const collection = getDB().collection("restaurants");
    const documents = await DataModel.getAllDocs(collection);
    res.json(documents);

  } catch (e) {
    console.error(e);
    res.status(500).send("Error fetching documents.");

  }
};

const createData = async (req, res) => {
    try {
        
        const collection = getDB().collection("restaurants");
        const newDocument = req.body;
        const result = await DataModel.createDoc(collection, newDocument);
        res.status(201).json({message: "Restaurant succesfully added.", insertedId: result.insertedId});

    } catch (e) {
        console.error(e);
        res.status(500).send("Error when creating the document.");
    }
};

module.exports = {
  getAllData,
  createData,
};