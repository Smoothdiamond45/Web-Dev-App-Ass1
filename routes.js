'use strict';

import express from 'express';
import logger from "./utils/logger.js";

const router = express.Router();

// add your own routes below

import start from './controllers/start.js';
router.get('/', start.createView);

import dashboard from './controllers/dashboard.js';
router.get('/dashboard', dashboard.createView);

import about from './controllers/about.js';
router.get('/about', about.createView);

import detailsL from './controllers/detailsL.js';
router.get('/detailsL', detailsL.createView);

import detailsA from './controllers/detailsA.js';
router.get('/detailsA', detailsA.createView);

import detailsM from './controllers/detailsM.js';
router.get('/detailsM', detailsM.createView);

import detailsN from './controllers/detailsN.js';
router.get('/detailsN', detailsN.createView);

import detailsP from './controllers/detailsP.js';
router.get('/detailsP', detailsP.createView);

import detailsS from './controllers/detailsS.js';
router.get('/detailsS', detailsS.createView);
export default router;

