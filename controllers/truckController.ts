import Trucks from '../models/truckSchema.js';

async function getAllTrucks(req, res) {
    const allTrucks = await Trucks.find({});
    res.json(allTrucks);
}

async function getAllIdleTrucks(req, res) {
    const allIdleTrucks = await Trucks.findAllIdleTrucks();
    res.json(allIdleTrucks);
}

async function getAllAvailableTrucks(req, res) {
    const allIdleTrucks = await Trucks.findAllAvailableTrucks();
    res.json(allIdleTrucks);
}

async function getTruckByLicensePlate(req, res) {
    const truck = await Trucks.findOne({ licensePlate: req.params.licensePlate });
    if (!truck) {
        res.json({ err: `Cannot find truck with license plate ${req.params.licensePlate}` })
    }
    res.json(truck);
}

async function postNewTruck(req, res) {
    const newTruck = await Trucks.create(req.body);
    res.json(newTruck);
}

async function updateTruckByLicensePlate(req, res) {
    const updatedTruck = await Trucks.findOneAndUpdate({ licensePlate: req.params.licensePlate }, req.body, { new: true });
    if (!updatedTruck) {
        res.json({ err: `Cannot find truck with license plate ${req.params.licensePlate}` })
    }
    res.json(updatedTruck);
}

async function deleteTruckByLicensePlate(req, res) {
    const deletedTruck = await Trucks.findOneAndDelete({ licensePlate: req.params.licensePlate });
    if (!deletedTruck) {
        res.json({ err: `Cannot find truck with license plate ${req.params.licensePlate}` })
    }
    res.json(deletedTruck);
}

export default { getAllTrucks, postNewTruck, updateTruckByLicensePlate, deleteTruckByLicensePlate, getTruckByLicensePlate, getAllIdleTrucks, getAllAvailableTrucks }

