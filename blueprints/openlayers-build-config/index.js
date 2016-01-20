/*jshint node:true*/

var fs = require('fs');
var path = require('path');
var olBuilder = require('./../../lib/openlayers-builder');
var RSVP = require('rsvp');

var DEFAULT_ENTITY_NAME = 'default';

module.exports = {
  description: 'Outputs Openlayers build config',

  normalizeEntityName: function(name) {
    return name || DEFAULT_ENTITY_NAME;
  },

  install: function (addon) {
    var config = olBuilder.getConfig();

    if (addon.entity.name && addon.entity.name !== DEFAULT_ENTITY_NAME) {
      var outputPath = path.resolve(addon.entity.name);
      fs.writeFileSync(outputPath, JSON.stringify(config));
      addon.ui.writeLine("Addon has been dumped to: " + outputPath);
    } else {
      console.log(config);
    }

    return RSVP.resolve();
  }
};
