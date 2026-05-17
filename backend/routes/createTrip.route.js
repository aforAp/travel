import express from "express";
import createTrip from "../models/CreateTrip.js";
import User from "../models/User.js";

const router = express.Router();

router.post('/formDatas', async (req, res) => {
    try{
        console.log("The request datas");
        console.log(req.body);
    const {country, travelStyle, interest, budget, duration, groupType, tripsData, imageUrls, createdAt} = req.body;
    
    const existingTrip = await createTrip.findOne({country});

    if(existingTrip){
        return res.status(400).json({ message: "Trip already exists" });
    }

    const trip = await createTrip.create({
        country,
         travelStyle,
         interest,
         budget,
         duration,
         groupType,
        createdAt,
        imageUrls,
        tripsData
    });
   console.log("Trips are ....");
    console.log({...trip});

    res.status(201).json({
        message: "Trip Created successfully",
        data: trip
    });
    }
    catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
})

export default router;