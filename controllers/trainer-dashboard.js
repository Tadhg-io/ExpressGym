"use strict";

const logger = require("../utils/logger");
const analytics = require("../utils/analytics");
const assessmentStore = require('../models/assessment-store');
const userStore = require('../models/user-store');
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
    // if this is a member
    else if(loggedInUser.type === "member"){
      // send the user to the trainer dashboard
      response.redirect('/dashboard');
      return;
    }

    // compile the data to send to the view
    let viewData = {
      title: 'Trainer Dashboard - ExpressGym',
      members: userStore.getMemberUsers(),
      user: loggedInUser,
    };
    // render the view
    response.render('trainer-dashboard', viewData);
  },

  trainerAssessments(request, response) {

    logger.info('dashboard rendering');

    // get the user
    const loggedInUser = accounts.getCurrentUser(request);

    // if there user isn't logged in
    if(loggedInUser == null){
      // send the user to the login page
      response.redirect('/login');
      return;
    }
    // if this is a member
    else if(loggedInUser.type === "member"){
      // send the user to the trainer dashboard
      response.redirect('/dashboard');
      return;
    }

    // get the member whose dashboard we are viewing
    const member = userStore.getUserById(request.params.id);
    // get the assessments for this member
    const assessments = assessmentStore.getUserAssessments(member.id);
    // get the analytics for this member
    const userAnalytics = analytics.calculateAnalytics(member);

    // compile the data to send to the view
    let viewData = {
      title: 'Trainer Dashboard - ExpressGym',
      assessments: assessments,
      analytics: userAnalytics
    };
    // render the view
    response.render('trainer-assessments', viewData);
  },

  editComment(request, response){
    // extract the id from the request
    const assessmentId = request.params.id;
    // get the assessment
    let assessment = assessmentStore.getAssessment(assessmentId);
    // update the comment
    assessment.comment = request.body.comment.trim();
    // save the assessment
    assessmentStore.store.save();
    // reload the dashboard
    response.redirect('back');
  },

  deleteMember(request, response){
    // extract the id from the request
    const userId = request.params.id;
    // remove the assessment from the db
    userStore.removeUser(userId);
    // reload the dashboard
    response.redirect('/trainer-dashboard');
  }

};

module.exports = dashboard;