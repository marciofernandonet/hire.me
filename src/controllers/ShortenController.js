const nanoid = require('nanoid');
const Shorten = require('../database/models/ShortenModel');

module.exports = {

    async shorten(req, res)
    {
        try{
            const { url, CUSTOM_ALIAS } = Object.keys(req.body).length ? req.body : req.query;
            const newAlias = CUSTOM_ALIAS ? (await Shorten.find({ alias: CUSTOM_ALIAS })).length || CUSTOM_ALIAS : nanoid(7);

            if(newAlias > 0)
                return res.json({ alias: CUSTOM_ALIAS, ERR_CODE: "001", Description: "CUSTOM ALIAS ALREADY EXISTS" });    

            const newSht = new Shorten({
                alias: newAlias,
                url: `${req.headers.host}/${newAlias}`,
                urlOrig: url,
                statistics: { time_taken: null }
            });
            await newSht.save();

            return res.status(201).json(newSht);
        }
        catch(err){
            return res.status(500).send(err);
        }
    },

    async retrieve(req, res)
    {    
        try{
            const alias = req.params.alias;
            const result = await Shorten.findOne({ alias });

            if(!result)
                return res.status(404).json({ alias ,ERR_CODE: "002", Description: 'SHORTENED URL NOT FOUND' });    
            
            return res.status(200).redirect(result.urlOrig);
        }
        catch(err){
            return res.status(500).send(err);
        }
    }, 

    async mostAccessed(req, res)
    {
        try{
            const result = await Shorten.aggregate(
                [{ 
                    $group: { 
                        _id: "$urlOrig",
                        total: { $sum: 1 }
                    }
                }, 
                { $sort : { total: -1 } },
                {
                    $project: {
                        "url": "$_id",
                        total: true,
                        "_id": false
                    }
                }]).limit(10);

            return res.status(200).json(result);
        } 
        catch(err){
            return res.status(500).send(err);
        }    
    }
}