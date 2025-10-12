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

const updateData = async (req, res) => {
    try{
        const collection = getDB().collection("restaurants");
        const id = req.params.id;
        const updatedData = req.body;
        const result = await DataModel.updateDoc(collection, id, updatedData);

        if (result.matchedCount === 0){
            return res.status(404).send("Restaurant not found.");
        }
        res.json({message: "Restaurant succesfully updated."})
    } catch (e) {
        console.error(e);
        res.status(500).send("Error when updating document.")
    }
};

const deleteData = async (req, res) => {
    try{
        const collection = getDB().collection("restaurants");
        const id = req.params.id;
        const result = await DataModel.deleteDoc(collection, id);

        if (result.deletedCount === 0){
            return res.status(404).send("Restauranr not found.");
        }
        res.json({message: "Restaurant succesfully deleted."});
    } catch (e) {
        console.error(e);
        res.status(500).send("Error when deleting document.");
    }
};

const addReview = async (req, res) => {
    try {
        const collection = getDB().collection("restaurants");
        const id = req.params.id;
        const newReview = req.body;

        newReview.submittedAt = new Date ();

        const result = await DataModel.addReview (collection,id,newReview);
        if (result.matchedCount ===0){
            return res.status(404).send("Restaurant not found.");
        }
        return res.status(201).json({message: "New review added."});
    } catch (e) {
        console.error(e);
        res.status(500).send("Error when adding review");
    }
};

module.exports = {
  getAllData,
  createData,
  updateData,
  deleteData,
  addReview,
};