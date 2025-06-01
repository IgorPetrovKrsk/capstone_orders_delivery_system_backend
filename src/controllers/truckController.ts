
import trucks, { Truck, TruckStatus } from '../data/trucks';
import { Request, Response, NextFunction } from 'express';
import hateoas from '../hateoas/hateoas';
import error from '../error/error';

function getAllTrucks(req: Request, res: Response) {
    const truckLinks = hateoas.getTrucksLinks();
    res.json({ trucks, truckLinks });
}

function postnewTruck(req: Request, res: Response, next: NextFunction) {
    if (req.body.licensePlate && req.body.capacity) {
        const newTruck: Truck = {
            id: trucks[trucks.length - 1].id + 1,
            driverName: req.body.driverName, //can be null
            licensePlate: req.body.licensePlate,
            status: (req.body.status) ? TruckStatus[req.body.status as keyof typeof TruckStatus] : TruckStatus.Idle, //if there is no status present then default status is idle
            capacity: req.body.capacity
        };
        trucks.push(newTruck);
        res.json(trucks[trucks.length - 1]);
    } else next(error(400, 'Insufficient Data'));
}

function deleteAllTrucks(req: Request, res: Response) {
    trucks.length = 0; //clearing the array
    res.json({ trucks });
}

//functions what works with id
function getTruckById(req: Request, res: Response, next: NextFunction) {
    const truckId: number = req.query.truckId
        ? parseInt(req.query.truckId as string, 0)
        : parseInt(req.params.truckId as string, 0);
    const truckByIdLinks = hateoas.getTruckByIdLinks(truckId);
    const truck = trucks.find((it) => it.id == truckId);

    if (truck)
        res.json({ truck, truckByIdLinks });
    else
        next();
}

function putTruckById(req: Request, res: Response, next: NextFunction) {
    const truckId: number = req.query.truckId
        ? parseInt(req.query.truckId as string, 0)
        : parseInt(req.params.truckId as string, 0);

    const truck = trucks.find((it) => it.id === truckId);
    
    if (truck && req.body.licensePlate && req.body.capacity) {
        truck.driverName = req.body.driverName; //can be null
        truck.licensePlate = req.body.licensePlate;
        if (req.body.status) {
            truck.status = TruckStatus[req.body.status as keyof typeof TruckStatus];
        }
        truck.capacity = req.body.capacity;
        res.json(truck);
    }
    else next();
}

function deleteTruckById(req: Request, res: Response, next: NextFunction) {

    const truckId: number = req.query.truckId
        ? parseInt(req.query.truckId as string, 0)
        : parseInt(req.params.truckId as string, 0);
    
    const truck = trucks.find((it, i) => {
        if (it.id == truckId) {
            trucks.splice(i, 1);
            return true;
        }
    });

    if (truck) res.json(truck);
    else next();
}

export default { getAllTrucks, postnewTruck, deleteAllTrucks, getTruckById, putTruckById, deleteTruckById }
