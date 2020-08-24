"use strict";

const logger = require("../utils/logger");
const analytics = require("../utils/analytics");
const assessmentStore = require('../models/assessment-store');
const accounts = require ('./accounts.js');
const uuid = require('uuid');
const _ = require('lodash');

const dashboard = {

  index(request, response) {

    logger.info('dashboard rendering');

    // get the user
    const loggedInUser = accounts.getCurrentUser(request);

    // if there user isn't logged in
    if(loggedInUser == null){
      // send the user to the login page
      response.redirect('/login');
      return;
    }
    // if this is a trainer
    else if(loggedInUser.type === "trainer"){
      // send the user to the trainer dashboard
      response.redirect('/trainer-dashboard');
      return;
    }

    // calculate the analytics for this member
    const userAnalytics = analytics.calculateAnalytics(loggedInUser);
    // compile the data to send to the view
    let viewData = {
      title: 'Dashboard - ExpressGym',
      assessments: assessmentStore.getUserAssessments(loggedInUser.id),
      user: loggedInUser,
      analytics: userAnalytics
    };
    logger.info('about to render', assessmentStore.getAllAssessments());
    // render the view
    response.render('dashboard', viewData);
  },

  addAssessment(request, response) {
    // get the logged in user
    const loggedInUser = accounts.getCurrentUser(request);
    // the date that the assessment was logged
    const currentDate = new Date();
    // a formatted string version of the date
    const formattedDate = currentDate.getDate() + "-" + currentDate.getMonth() + "-" + currentDate.getFullYear();

    // Calculate the trend for this assessment
    const trend = analytics.calculateTrend(request.body.weight, loggedInUser)

    // create the assessment object
    const newAssessment = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      date: currentDate,
      formatteddate:formattedDate,
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperarm: request.body.upperarm,
      waist: request.body.waist,
      hips: request.body.hips,
      trend: trend,
    };
    logger.debug('Adding a new assessment', newAssessment);
    // add the assessment to the db
    assessmentStore.addAssessment(newAssessment);
    // reload the dashboard
    response.redirect('/dashboard');
  },

  deleteAssessment(request, response) {
    // extract the id from the request
    const assessmentId = request.params.id;
    logger.debug(`Deleting Assessment ${assessmentId}`);
    // remove the assessment from the db
    assessmentStore.removeAssessment(assessmentId);
    // reload the dashboard
    response.redirect('/dashboard');
  },

};

module.exports = dashboard;