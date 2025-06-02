import Trucks from '../models/truckSchema';

async function getAllTrucks(req:Request, res:Response) {
    const allTrucks = await Trucks.find({});
    res.json(allTrucks);
}

async function getAllIdleTrucks(req:Request, res:Response) {
    const allIdleTrucks = await Trucks.findAllIdleTrucks();
    res.json(allIdleTrucks);
}

async function getAllAvailableTrucks(req:Request, res:Response) {
    const allIdleTrucks = await Trucks.findAllAvailableTrucks();
    res.json(allIdleTrucks);
}

async function getTruckByLicensePlate(req:Request, res:Response) {
    const truck = await Trucks.findOne({ licensePlate: req.params.licensePlate });
    if (!truck) {
        res.json({ err: `Cannot find truck with license plate ${req.params.licensePlate}` })
    }
    res.json(truck);
}

async function postNewTruck(req:Request, res:Response) {
    const newTruck = await Trucks.create(req.body);
    res.json(newTruck);
}

async function updateTruckByLicensePlate(req:Request, res:Response) {
    const updatedTruck = await Trucks.findOneAndUpdate({ licensePlate: req.params.licensePlate }, req.body, { new: true });
    if (!updatedTruck) {
        res.json({ err: `Cannot find truck with license plate ${req.params.licensePlate}` })
    }
    res.json(updatedTruck);
}

async function deleteTruckByLicensePlate(req:Request, res:Response) {
    const deletedTruck = await Trucks.findOneAndDelete({ licensePlate: req.params.licensePlate });
    if (!deletedTruck) {
        res.json({ err: `Cannot find truck with license plate ${req.params.licensePlate}` })
    }
    res.json(deletedTruck);
}

export default { getAllTrucks, postNewTruck, updateTruckByLicensePlate, deleteTruckByLicensePlate, getTruckByLicensePlate, getAllIdleTrucks, getAllAvailableTrucks }

