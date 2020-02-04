const mongoose = require('mongoose');

const ShortenSchema = new mongoose.Schema({
    alias:{ 
        type: String,
        required: true,
        unique: true
    },
    url:{
        type: String,
        required: true,
    },
    urlOrig: { 
        type: String,
        required: true
    },
    statistics:{
        time_taken:{
            type: String
        }
    }
}, { versionKey: false });

ShortenSchema.pre('save', function() {
    this._startTime = Date.now();
});
  
ShortenSchema.post('save', function() {
    if (this._startTime != null) {
        const objSchm = this;
        objSchm.statistics.time_taken = `${Date.now() - this._startTime}ms`;
    }
});

module.exports = mongoose.model('Shorten', ShortenSchema);