const moment=require('moment-timezone');
const dbInterface=require('../dbInterface');
const addEvent=async function(req,res){
    try{
        const bodyObj=req.body;
        console.log(bodyObj.startDate);
        console.log(bodyObj.startTime);
        let startTime=moment(bodyObj.startDate+" "+bodyObj.startTime).tz(bodyObj.eventTimeZone);
        console.log(startTime);
        startTime=startTime.tz('UTC');
        console.log(startTime);
        const payLoad={
            'eventName':bodyObj.eventName,
            'duration':bodyObj.duration,
            'startTime':startTime.toDate(),
        };
        console.log(payLoad);
        await dbInterface.storeToDB('events',payLoad);
        return res.status(200).json('Event scheduled successfully');
    }
    catch(ex)
    {
        console.log(ex);
        return res.status(500).json("Internal Error");
    }
}
const getEvent=async function(req,res){
    try{
        let filter={};
        const nowDate=moment(new Date()).tz('UTC').toDate();
        if(req.query.type=='upcoming'){
            filter={startTime:{$gte:nowDate}};
        }
        else if(req.query.type=='live')
        {
            const tenMinsFromNow=moment(nowDate.getTime() + 10*60000).toDate();
            filter={startTime:{
                $gte:nowDate,
                $lte:tenMinsFromNow
            }};
        }
        const result=await dbInterface.getFromDbByFilter('events',filter);
        if(result.length>0)
            return res.status(200).json(result);
        return res.status(404).json('No event found.');
    }
    catch(ex)
    {
        console.log(ex);
        return res.status(500).json("Internal Error");
    }
}
module.exports={addEvent, getEvent};