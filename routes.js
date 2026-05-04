'use strict';

import express from 'express';
import logger from "./utils/logger.js";

const router = express.Router();

// ─── Controller Imports ───────────────────────────────────────────────────────

import account from './controllers/account.js';
import profile from './controllers/profile.js';
import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import personal from './controllers/personal.js';
import stats from './controllers/stats.js';

// Category detail controllers
import detailsL from './controllers/detailsL.js';
import detailsA from './controllers/detailsA.js';
import detailsM from './controllers/detailsM.js';
import detailsN from './controllers/detailsN.js';
import detailsP from './controllers/detailsP.js';
import detailsS from './controllers/detailsS.js';

// ─── Auth Routes ──────────────────────────────────────────────────────────────

router.get('/', profile.createView);
router.get('/login', account.login);
router.get('/signup', account.signup);
router.get('/logout', account.logout);
router.post('/register', account.register);
router.post('/authenticate', account.authenticate);

// ─── Main App Routes ──────────────────────────────────────────────────────────

router.get('/start', start.createView);
router.get('/dashboard', dashboard.createView);
router.get('/about', about.createView);
router.get('/personal', personal.createView);
router.get('/stats', stats.createView);

// ─── Photo CRUD Routes ────────────────────────────────────────────────────────

// Add a photo to a category
router.post('/category/:id/addphoto', dashboard.addPhoto);

// Delete a photo from a category
router.get('/category/:id/deletephoto/:photoid', dashboard.deletePhoto);

// Edit/update a photo in a category
router.post('/category/:id/updatephoto/:photoid', dashboard.updatePhoto);

// ─── Category Detail Routes ───────────────────────────────────────────────────

router.get('/detailsL', detailsL.createView);
router.get('/detailsA', detailsA.createView);
router.get('/detailsM', detailsM.createView);
router.get('/detailsN', detailsN.createView);
router.get('/detailsP', detailsP.createView);
router.get('/detailsS', detailsS.createView);

// Personal collection routes
router.get('/personal', personal.createView);
router.post('/personal/addphoto', personal.addPhoto);
router.get('/personal/deletephoto/:photoid', personal.deletePhoto);
router.post('/personal/updatephoto/:photoid', personal.updatePhoto);

// ─── Error Route ──────────────────────────────────────────────────────────────

router.get('/error', (request, response) => response.status(404).end('Page not found.'));


export default router;