const FMRprices = require("../models/Fmr");
import mongoose from 'mongoose';

//GET all FMR prices
const getFMRprices = async (req, res)=>{
    const fmr = await FMRprices.find({}).sort({createdAt: -1})
  
    res.status(200).json(fmr)
}

//POST (add) FMR prices
const createFMRprices = async(req,res)=> {
    const {
        studio,
        oneBed,
        twoBed,
        threeBed,
        fourBed,
        fiveBed,
        sixBed
    } = req.body
    
    try {
        const fmr = await FMRprices.create({
            studio,
            oneBed,
            twoBed,
            threeBed,
            fourBed,
            fiveBed,
            sixBed
        })
        res.status(200).json(fmr)
    } catch(error){
        res.status(400).json({ error: (error as Error).message })
    }
}


// PATCH (edit) FMR prices
const updateFMRprices = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such FMR prices exist' })
  }
  try {
    const fmr = await FMRprices.findOneAndUpdate({ _id: id }, {
      ...req.body
    })
    if (!fmr) {
      return res.status(400).json({ error: 'No such FMR prices exist' })
    }
    res.status(200).json(fmr)
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
}

// DELETE FMR prices --> USED FOR TESTING
const deleteFMRprices = async(req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such FMR' })
    }
    const fmr = await FMRprices.findOneAndDelete({ _id: id })
    if (!fmr) {
      return res.status(400).json({ error: 'No such FMR' })
    }
    res.status(200).json(fmr)
}

// Exports
module.exports = {
  getFMRprices,
  createFMRprices,
  updateFMRprices,
  deleteFMRprices
}