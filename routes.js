"use strict";

const express = require("express");
const router = express.Router();

const dashboard = require("./controllers/dashboard.js");
const trainerDashboard = require("./controllers/trainer-dashboard.js");
const about = require("./controllers/about.js");
const playlist = require('./controllers/playlist.js');
const accounts = require('./controllers/accounts.js');

router.get("/dashboard", dashboard.index);
router.get('/dashboard/deleteassessment/:id', dashboard.deleteAssessment);
router.get("/trainer-dashboard", trainerDashboard.index);
router.get("/trainer-dashboard/deletemember/:id", trainerDashboard.deleteMember);
router.get("/about", about.index);
router.get('/playlist/:id', playlist.index);
router.get('/playlist/:id/deletesong/:songid', playlist.deleteSong);
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);

router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
router.post('/playlist/:id/addsong', playlist.addSong);
router.post('/dashboard/addassessment', dashboard.addAssessment);

module.exports = router;
