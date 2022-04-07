const { validate, Joi } = require('express-validation');
const dateRegx="((?:19|20)\\d\\d)-(0?[1-9]|1[012])-([12][0-9]|3[01]|0?[1-9])";
const timeRegx="^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$";
const createEventValidation=function(){
    const addEventRequestValidator={
        body:Joi.object({
          'eventName':Joi.string().required(),
          'startDate':Joi.string().pattern(new RegExp(dateRegx)).message('Please enter the date in the format YYYY-MM-DD'),
          'startTime':Joi.string().pattern(new RegExp(timeRegx)).message('Please enter the time in HH:MM format'),
          'duration':Joi.number().required(),
          'eventTimeZone':Joi.string().required()
        })
    }
    return validate(addEventRequestValidator);
}

module.exports={createEventValidation};