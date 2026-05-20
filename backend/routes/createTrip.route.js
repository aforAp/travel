import express from "express";
import User from "../models/User.js";
import createTrip from "../models/CreateTrip.js";
const router = express.Router();

router.post('/formDatas', async (req, res) => {
    try{
        console.log("The request datas");
        console.log(req.body);
    const {country, travelStyle, interest, budget, duration, groupType, tripsData, imageUrls, createdAt} = req.body;
    
    const existingTrip = await createTrip.findOne({country});
    const requestId = req.body.requestId;
    if(existingTrip){
        return res.status(400).json({ message: "Trip already exists" });
    }

    const trip = await createTrip.create({
        requestId,
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

    res.status(201).json({
        message: "Trip Created successfully",
        data: trip,
        id: trip._id
    });
    }
    catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
})

router.get('/allTrips', async (req, res) => {
    try {
        const data = await createTrip.find();
        console.log("the backend data", data);
        res.status(200).json(data);

    } catch(err){
        res.status(500).json({
            message: "URL or Data not found"
        })
    }
});


router.get('/TripById/:id', async (req, res) => {
    try {
       const {id} = req.params;
        const data = await createTrip.findById(id);

        if(!data) {
            return res.status(400).json({
                message: "No Trip found"
            })
        };

        res.status(200).json({
            success: true,
            data: data
        });
    }
    catch (error) {
        re.status(500).json({
            success: false,
            message: error.message
        });
    }
})

export default router;