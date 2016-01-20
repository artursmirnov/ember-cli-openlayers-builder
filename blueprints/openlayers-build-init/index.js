/*jshint node:true*/
module.exports = {
  description: 'Initiates addon configuration',

  normalizeEntityName: function(entityName) {
    return entityName || "default";
  }
};
