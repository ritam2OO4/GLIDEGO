const { validationResult } = require("express-validator")
const { calculateFare, rideService, confirmRide, startRide, endRide } = require("../Services/rideService");
const { getAddressCoordinates, getCaptainsInTheRadius } = require("../Services/mapsService");
const { sendMessageToSocketId } = require("../socket");
const rideModel = require("../modelsSchema/rideModel");

module.exports.rideCreate = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); // Exit here
        }
        const { pickUp, destination, vehicleType } = req.body;
        if (!pickUp || !destination || !vehicleType || !req.user.id) return res.status(500).json({ message: "props missing" })
        const createRide = await rideService({ user: req.user.id, pickUp, destination, vehicleType })
        createRide.otp = "";
        res.status(200).json(createRide)


        const pickUpCoords = await getAddressCoordinates(pickUp);
        if (!pickUpCoords) return res.status(400).send({ message: "invalid address" })
        const { ltd, lng } = pickUpCoords
        const captainInRadius = await getCaptainsInTheRadius(ltd, lng, 62)
        const userData = await rideModel.findOne({ _id: createRide._id }).populate("user")
        captainInRadius.map((captain) => (
            sendMessageToSocketId(captain.socketId, {
                event: "new-ride",
                data: userData
            })
        ))

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports.getFare = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); // Exit here
        }
        const { pickUp, destination } = req.query
        if (!pickUp || !destination) return res.status(500).json({ message: "props missing" })
        const fare = await calculateFare(pickUp, destination);
        return res.status(200).json(fare);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports.confirmRide = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { rideId } = req.body

    try {
        const ride = await confirmRide({ rideId, captain_id: req.captain._id });
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })
        return res.status(200).json(ride)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

}

module.exports.startRide = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const { rideId, otp } = req.query
        const ride = await startRide({ rideId, otp })
        ride && sendMessageToSocketId(ride.user.socketId, {
            event: "ride-started",
            data: ride
        })
        return res.status(200).json(ride)
    } catch (err) {
        return res.status(500).json({ message: err.message })

    }
}

module.exports.endRide = async (req, res) => {
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const { rideId } = req.body
        const ride = await endRide({ rideId, captain: req.captain })

        if (ride) {
            sendMessageToSocketId(ride.user.socketId, {
                event: "end-ride",
                data: ride
            })

            // Send response first
            res.status(200).json(ride)

            // Delete the ride from the database in the background
            setImmediate(async () => {
                try {
                    await rideModel.findByIdAndDelete(rideId)
                    console.log(`Ride ${rideId} deleted successfully`)
                } catch (deleteError) {
                    console.error(`Failed to delete ride: ${deleteError.message}`)
                }
            })
        } else {
            return res.status(404).json({ message: "Ride not found" })
        }

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}


