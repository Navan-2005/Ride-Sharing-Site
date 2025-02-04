const express = require('express');
const router = express.Router();
const {body,query}= require('express-validator');
const ridecontroller = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Pickup must be at least 3 characters'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Destination must be at least 3 characters'),
    body('vehicleType').isString().isLength({ min: 3 }).withMessage('Vehicle Type must be at least 3 characters'),
    ridecontroller.createRide
)

router.get('/get-fare',
    authMiddleware.authUser,
    query('pickup').isString().isLength({ min: 3 }).withMessage('Pickup must be at least 3 characters'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Destination must be at least 3 characters'),
    ridecontroller.getFare
)

router.post('/confirm',
    authMiddleware.authCaptain,
    body('ride._id').isMongoId().withMessage('Invalid ride Id'),
    ridecontroller.confirmRide
)

// router.get('/start-ride',
//     authMiddleware.authCaptain,
//     query('rideId').isMongoId().withMessage('Invalid ride id'),
//     query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
//     ridecontroller.startRide
// )


module.exports = router;