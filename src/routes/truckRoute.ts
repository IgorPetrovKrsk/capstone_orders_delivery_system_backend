import express from 'express';
import truckCTRL from '../controllers/truckController';
import Auth from '../middleware/auth';

const router = express.Router();

router.get('/',Auth.auth,Auth.dispatcherAuth,truckCTRL.getAllTrucks);
router.post('/',Auth.auth,Auth.dispatcherAuth,truckCTRL.createNewTruck);
// router.put('/:licensePlate',truckCTRL.updateTruckByLicensePlate);
// router.delete('/:licensePlate',truckCTRL.deleteTruckByLicensePlate);

export default router