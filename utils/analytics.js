'use strict'

const logger = require("../utils/logger");
const assessmentStore = require('../models/assessment-store');

const analytics = {
  calculateAnalytics(user){

    // create an object to store the user's statistics
    let stats = {};

    // get the assessments for this user
    const assessments = assessmentStore.getUserAssessments(user.id);

    // the user's starting weight
    let weight = user.startingweight;
    // if the user has at least one assessment
    if(assessments.length > 0){
      // use the weight from the assessment instead
      weight = assessments[assessments.length - 1].weight;
    }

    // BMI
    stats.bmi = calculateBMI(user.height / 100, weight);

    // BMI Category
    stats.bmiCategory = bmiCategory(stats.bmi);

    // idealWeight
    stats.isIdealBodyweight = idealWeight(user.height, weight, user.gender)

    return stats;
  },

  calculateTrend(weight, user){
    // a variable to store the trend
    let trend = false;
    // get the existing assessments for this user
    const assessments = assessmentStore.getUserAssessments(user.id);
    // if there is an existing assessment
    if(assessments.length > 0){
      // trend is true if weight is lower than last assessment
      trend = assessments[assessments.length - 1].weight >= weight;
    }
    else{
      // if no assessments, compare new weight to starting weight
      trend = user.startingweight >= weight;
    }
    return trend;
  }
}

function calculateBMI(height, weight){
  let BMI = 0;
  // only calculate the BMI if there is a height for this user
  if(height > 0){
    BMI = (weight / (height * height)).toFixed(2);
  }
  return BMI;
}

function bmiCategory(bmi){
  if(bmi < 15) return "VERY SEVERELY UNDERWEIGHT";
  else if(bmi < 16) return "SEVERELY UNDERWEIGHT";
  else if(bmi < 18.5) return "UNDERWEIGHT";
  else if(bmi < 25) return "NORMAL";
  else if(bmi < 30) return "OVERWEIGHT";
  else if(bmi < 35) return "MODERATELY OBESE";
  else if(bmi < 40) return "SEVERELY OBESE";
  else return "VERY SEVERELY OBESE";
}

function idealWeight(height, weight, gender){
  let idealWeight = 0;
  const heightBracket = 152;

  // if shorter than five feet
  if(height <= heightBracket){
    // male
    if(gender === "M"){
      idealWeight = 50;
    }
    // female
    else{
      idealWeight = 45.5;
    }
  }
  // taller than five feet
  else{
    // male
    if(gender === "M"){
      idealWeight = 50 + ((height - heightBracket) * 5.85);
    }
    // female
    else{
      idealWeight = 45.5 + ((height - heightBracket) * 5.85);
    }
  }

  return ((idealWeight <= (weight + 2.0))
    && (idealWeight >= (weight - 2.0))
  );
}

module.exports = analytics;