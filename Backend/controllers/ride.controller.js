const { model } = require('mongoose');
const rideservice = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapservice=require('../services/map.service')
const {sendMessageToSocketId}=require('../socket');
const rideModel = require('../models/ride.model');
const { Socket } = require('socket.io');
// const rideModel=require('../models/ride.model')

module.exports.createRide = async (req, res, next) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Get user ID from auth middleware
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const userId = req.user._id; // Using _id instead of id_
        
        // Destructure and trim the values
        const { pickup, destination, vehicleType } = req.body;
        
        // Create the ride with user ID
        const ride = await rideservice.createRide({
            user: userId, // Passing the correct user ID format
            pickup: pickup.trim(),
            destination: destination.trim(),
            vehicleType: vehicleType.trim()
        });

         res.status(201).json(ride);
         const pickupCoordinates=await mapservice.getAddressCoordinate(pickup);
         console.log('Hi');
         console.log(pickupCoordinates.ltd,pickupCoordinates.lng);
         
        const getCaptainInTheRadius=await mapservice.getCaptainInTheRadius(pickupCoordinates,4);
        
        ride.otp=''
        console.log('Available Captain : ',getCaptainInTheRadius);
        
        const rideWithUser=await rideModel.findOne({_id:ride._id}).populate('user')

        getCaptainInTheRadius.map(async captain=>{
            sendMessageToSocketId(captain.socketId,{
                event:'new-ride',
                data:rideWithUser

            })
        })

    } catch (error) {
        console.error('Create ride error:', error);
        return res.status(500).json({
            message: error.message || 'Failed to create ride'
        });
    }
};

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    try {
        const fare = await rideservice.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { rideId,captain } = req.body;
    
    // Ensure captain is available from auth middleware
    // const captain = req.captain;
    
    if (!rideId) {
        return res.status(400).json({ message: 'Ride ID is required' });
    }
    
    if (!captain) {
        return res.status(401).json({ message: 'Captain not authenticated' });
    }
    
    try {
        const ride = await rideservice.confirmRide({ 
            rideId, 
            captain 
        });
        
        // Send confirmation to user
        if (ride.user && ride.user.socketId) {
            sendMessageToSocketId(ride.user.socketId, {
                event: 'ride-confirmed',
                data: ride
            });
        }
       
        return res.status(200).json(ride);
    }
    catch(err) {
        console.error('Ride Confirm Error:', err);
        return res.status(500).json({ 
            message: err.message || 'Failed to confirm ride' 
        });
    }
};

// module.exports.confirmRide = async (req, res, next) => {
//     try {
//         // Check for validation errors
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         // Get user ID from auth middleware
//         if (!req.captain || !req.captain._id) {
//             return res.status(401).json({ message: 'captain not authenticated' });
//         }

//         const userId = req.captain._id; // Using _id instead of id_
        
//         // Destructure and trim the values
//         const { rideId ,captain} = req.body;        
//         // Create the ride with user ID
//         const ride = await rideservice.confirmRide({
//             user: userId, // Passing the correct user ID format
//             pickup: pickup.trim(),
//             destination: destination.trim(),
//             vehicleType: vehicleType.trim()
//         });

//          res.status(201).json(ride);
//          console.log('Hi');                         
//         const rideWithUser=await rideModel.findOne({_id:ride._id}).populate('captain')

//     } catch (error) {
//         console.error('Create ride error:', error);
//         return res.status(500).json({
//             message: error.message || 'Failed to create ride'
//         });
//     }
// };


