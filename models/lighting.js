var mongoose = require('mongoose');

var LightingSchema = mongoose.Schema({
    name: String,
    location: String,
    description: String,
    status: Boolean
});
var Lighting = module.exports = mongoose.model('Lighting', LightingSchema);

module.exports.createLighting = function(newLighting, callback) {
    newLighting.save(callback);
}

module.exports.getLightingByName = function(query, callback){
    Lighting.findOne(query, callback);
}

module.exports.getLightingById = function(id, callback){
    Lighting.findById(id, callback);
}

module.exports.getAllLighting = function(){
    Lighting.find({}, function(err, doc){
        console.log(doc);
    });
}