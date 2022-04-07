const express = require('express');
const router = express.Router();
const {createEventValidation}=require('./schema-validator');
const {addEvent, getEvent}=require('../controller/event-controller');

router.post('/v1',createEventValidation(),function(req,res,next){
    addEvent(req,res,next);
});
router.get('/v1',function(req,res,next){
    getEvent(req,res,next);
});
module.exports = router;
