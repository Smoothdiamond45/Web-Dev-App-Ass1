'use strict';

import express from 'express';
import logger from "./utils/logger.js";

const router = express.Router();

// add your own routes below

import profile from './controllers/profile.js';
router.get('/', profile.createView);

import start from './controllers/start.js';
router.get('/start', start.createView);

import dashboard from './controllers/dashboard.js';
router.get('/dashboard', dashboard.createView);

import about from './controllers/about.js';
router.get('/about', about.createView);

import account from './controllers/account.js';
router.get('/', account.index);
router.get('/login', account.login);
router.get('/signup', account.signup);
router.get('/logout', account.logout);
router.post('/register', account.register);
router.post('/authenticate', account.authenticate);

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

import personal from './controllers/personal.js';
router.get('/personal', personal.createView);

router.get('/error', (request, response) => response.status(404).end('Page not found.'));
export default router;

