const rideModel = require('../models/ride.model');
const mapservice = require('./map.service');
const crypto = require('crypto');

async function getFare(pickup,destination){
    if(!pickup || !destination){
        throw new Error('Pickup and destination are required');
    }
    const distanceTime =await mapservice.getDistanceTime(pickup,destination);
    const fareRates = {
        auto: { base: 30, perKm: 10, perMin: 2 },
        car: { base: 50, perKm: 15, perMin: 3 },
        moto: { base: 20, perKm: 8, perMin: 1.5 }
    };
    const fares = {};
    for (const vehicleType in fareRates) {
        const rate = fareRates[vehicleType];
        fares[vehicleType] =Math.round( rate.base + 
            ((distanceTime.distance.value/1000) * rate.perKm) + 
            ((distanceTime.duration.value/60) * rate.perMin));
    }
    return fares;
   

}

module.exports.getFare = getFare;

function getOtp(num){
        function generateotp(num){
            const buffer = crypto.randomBytes(Math.ceil(num));
            const otp = Array.from(buffer)
                .map(byte => byte % 10)
                .slice(0, num)
                .join('');
            return otp;
   }
   return generateotp(num);
}

module.exports.createRide = async ({
    user,
    pickup,
    destination,
    vehicleType
}) => {
    if ( !user||!pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const fare = await getFare(pickup, destination);
    const ride = rideModel.create({
        user,
        pickup,
        destination,
        otp:getOtp(4),
        fare: fare[vehicleType],
    });

    return ride;
}

module.exports.confirmRide = async ({
    rideId, captain
}) => {
    if (!rideId) {
        throw new Error('Ride ID is required');
    }

    if (!captain) {
        throw new Error('Captain information is required');
    }

    const updatedRide = await rideModel.findOneAndUpdate(
        { _id: rideId },
        { 
            status: 'accepted',
            captain: captain._id  // Assuming captain has _id
        },
        { new: true }
    );

    if (!updatedRide) {
        throw new Error('Ride not found');
    }

    // Populate with full details
    const ride = await rideModel.findById(updatedRide._id)
        .populate('user')
        .populate('captain')
        .select('+otp');

    return ride;
}