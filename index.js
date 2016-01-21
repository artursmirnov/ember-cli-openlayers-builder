/* jshint node: true */
'use strict';

var fs = require('fs');
var path = require('path');
var olBuilder = require('./lib/openlayers-builder');

module.exports = {
  name: 'ember-cli-openlayers-builder',

  preBuild: function() {

    var configPath = '.ol-build';
    var cachedConfigPath = path.join(this.root, 'addon', '.ol-build');
    var outputPath = path.join(this.root, 'addon', 'ol.js');

    var appConfig = "";
    var cachedConfig = "";

    try {
      appConfig = fs.readFileSync(configPath, { encoding: 'utf8'});
      cachedConfig = fs.readFileSync(cachedConfigPath, { encoding: 'utf8'});
    } catch (e) {}

    if (!appConfig) {
      throw new Error(".ol-build config is empty");
    }

    if (appConfig !== cachedConfig) {
      fs.writeFileSync(cachedConfigPath, appConfig, { encoding: 'utf8'});
      return olBuilder.build(outputPath);
    }
  }
};
