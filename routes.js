"use strict";

const express = require("express");
const router = express.Router();

const dashboard = require("./controllers/dashboard.js");
const trainerDashboard = require("./controllers/trainer-dashboard.js");
const about = require("./controllers/about.js");
const accounts = require('./controllers/accounts.js');


// GET
router.get("/dashboard", dashboard.index);
router.get('/dashboard/deleteassessment/:id', dashboard.deleteAssessment);
router.get("/trainer-dashboard", trainerDashboard.index);
router.get("/trainer-dashboard/deletemember/:id", trainerDashboard.deleteMember);
router.get("/about", about.index);
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.get('/settings', accounts.settings);
router.get('/trainer-assessments/:id', trainerDashboard.trainerAssessments);
router.get('/images/', express.static('images'));
// POST
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
router.post('/dashboard/addassessment', dashboard.addAssessment);
router.post('/settings', accounts.saveSettings);
router.post('/edit-comment/:id', trainerDashboard.editComment);

module.exports = router;
