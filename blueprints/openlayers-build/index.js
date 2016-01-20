/*jshint node:true*/

var olBuilder = require('./../../lib/openlayers-builder');
var RSVP = require('rsvp');
var path = require('path');

var DEFAULT_ENTITY_NAME = 'default';

module.exports = {
  description: 'Builds Openlayers library',

  normalizeEntityName: function(name) {
    return name || DEFAULT_ENTITY_NAME;
  },

  install: function(addon) {
    addon.ui.writeLine("Building Openlayers...");

    var rootPath = path.resolve(this.path, './../../');
    var outputPath = path.join(rootPath, 'addon', olBuilder.OUTPUT_FILENAME);

    if (addon.entity.name && addon.entity.name !== DEFAULT_ENTITY_NAME) {
      outputPath = path.join(path.resolve(addon.entity.name), olBuilder.OUTPUT_FILENAME);
    }

    return olBuilder.build(outputPath).then(function() {
      addon.ui.writeLine("Build done. Output file: " + outputPath);
    });
  }
};
