
import express from 'express';
import auth from "../middleware/auth";
import awsCTRL from '../controllers/awsCTRL';

const router = express.Router();

router.get('/', auth.auth , awsCTRL.getAwsUrl); //every authorised user can upload images

export default router;