import express from 'express';
import truckCTRL from '../controllers/truckController';
import Auth from '../middleware/auth';

const router = express.Router();

router.get('/',Auth.auth,truckCTRL.getAllTrucks);
router.get('/available',Auth.auth,Auth.dispatcherAuth,truckCTRL.getAvailableTrucks);
router.post('/',Auth.auth,Auth.dispatcherAuth,truckCTRL.createNewTruck);
router.put('/:truckId',Auth.auth,Auth.dispatcherAuth,truckCTRL.updateTruckById);
router.delete('/:truckId',Auth.auth,Auth.dispatcherAuth,truckCTRL.deleteTruckById);

export default router