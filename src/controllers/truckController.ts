import { Request, Response } from 'express'
import Trucks from '../models/truckSchema';

async function getAllTrucks(req: Request, res: Response) {
    const allTrucks = await Trucks.find({});
    res.json(allTrucks);
}

// async function getAllIdleTrucks(req:Request, res:Response) {
//     const allIdleTrucks = await Trucks.findAllIdleTrucks();
//     res.json(allIdleTrucks);
// }

// async function getAllAvailableTrucks(req:Request, res:Response) {
//     const allIdleTrucks = await Trucks.findAllAvailableTrucks();
//     res.json(allIdleTrucks);
// }

// async function getTruckByLicensePlate(req:Request, res:Response) {
//     const truck = await Trucks.findOne({ licensePlate: req.params.licensePlate });
//     if (!truck) {
//         res.json({ err: `Cannot find truck with license plate ${req.params.licensePlate}` })
//     }
//     res.json(truck);
// }

async function createNewTruck(req: Request, res: Response) {
    const { licensePlate, capacity, status } = req.body;
    if (!licensePlate || !capacity) {
        res.status(400).json({ error: [{ msg: 'licensePlate and capacity are required.' }] });
        return;
    }
    const truck = await Trucks.findOne({ licensePlate });
    if (truck) {
        res.status(400).json({ error: [{ msg: `Truck with the licenseplate ${licensePlate} already exists` }] });
        return;
    }
    const newTruck = await Trucks.create(req.body);
    res.status(201).json(newTruck);
    return;
}

async function updateTruckById(req: Request, res: Response) {
    const licensePlate = req.body.licensePlate;
    if (licensePlate) {
        const truck = await Trucks.findOne({ licensePlate });
        if (truck && truck._id != req.params.truckId) {
            res.status(400).json({ error: [{ msg: `Truck with the licenseplate ${licensePlate} already exists` }] });
            return;
        }
    }
    const updatedTruck = await Trucks.findOneAndUpdate({ _id: req.params.truckId }, req.body, { new: true, runValidators: true });
    if (!updatedTruck) {
        res.status(400).json({ error: [{ msg: `Cannot update truck with id ${req.params.truckId}` }] });
    }
    res.json(updatedTruck);
}

async function deleteTruckById(req: Request, res: Response) {
    const deletedTruck = await Trucks.findOneAndDelete({ _id: req.params.truckId });
    res.status(200).json({ status: [{ msg: `Truck ${deletedTruck?.licensePlate} has been deleted.` }] });
    return;
}

export default { getAllTrucks, createNewTruck, updateTruckById, deleteTruckById }

