

// controllers/map.controller.js
const mapservice = require('../services/map.service');
const { validationResult } = require('express-validator');

module.exports.getCoordinates = async (req, res, next) => {
    try {
        const { address } = req.query;
        
        // Add additional check for address
        if (!address) {
            return res.status(400).json({ 
                message: 'Address parameter is required' 
            });
        }

        const coordinates = await mapservice.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        next(error); // Pass error to error handling middleware
    }
};

module.exports.getDistanceTime = async (req, res, next) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { origin, destination } = req.query;
        const distanceTime = await mapservice.getDistanceTime(origin, destination);
        res.status(200).json(distanceTime);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching distance and time' });
    }
}

module.exports.getSuggestions=async(req,res,next)=>{

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { input } = req.query;
        const suggestions = await mapservice.getSuggestions(input);
        res.status(200).json(suggestions);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching suggestions' });
    }
}

