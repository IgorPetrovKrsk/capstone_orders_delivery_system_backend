import express from 'express';
import trucksController from '../controllers/truckController';

const router = express.Router();

router
    .route('/')
    .get((req, res, next) => {
        if (Object.keys(req.query).length === 0) {
            trucksController.getAllTrucks(req, res);
        } else {
            trucksController.getTruckById(req, res, next); //getting single truck by id in querry parametr
        }
    })
    .post(trucksController.postnewTruck)
    .delete(trucksController.deleteAllTrucks); //this is not safe

router
    .route('/:truckId') 
    .get(trucksController.getTruckById) //getting truck by Id
    .put(trucksController.putTruckById)
    .delete(trucksController.deleteTruckById);

export default router;
