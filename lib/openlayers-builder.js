/* jshint node: true */
'use strict';

require('jsonminify');

var fs = require('fs');
var lodash = require('lodash');
var RSVP = require('rsvp');
var buildOpenlayers = require('openlayers/tasks/build');
var defaultConfig = require('openlayers/config/ol.json');

var APP_CONFIG_PATH = ".ol-build";
var OUTPUT_FILENAME = "ol.js";

module.exports = {

  OUTPUT_FILENAME: OUTPUT_FILENAME,

  normalizeConfig: function(config) {

    if (config.compile) {
      // remove source map
      delete config.compile.create_source_map;
      delete config.compile.source_map_format;

      // remove compile optimizations
      config.compilation_level = "WHITESPACE_ONLY";

      // prettify output
      config.formatting = "PRETTY_PRINT";
    }

    return config;
  },

  loadConfig: function(path) {

    var config = {};

    try {
      var configContent = fs.readFileSync(path, { encoding: 'utf8'} );
      config = JSON.parse( JSON.minify(configContent) );
    } catch(e) {}

    return config;
  },

  getConfig: function() {
    var config = {};

    var appConfig = this.loadConfig(APP_CONFIG_PATH);

    if (appConfig.extend) {
      delete appConfig.extend;
      config = lodash.merge(defaultConfig, appConfig);
    } else if (!lodash.isEmpty(appConfig)) {
      config = appConfig;
    } else {
      config = defaultConfig;
    }

    return this.normalizeConfig(config);
  },

  build: function(outputPath) {
    var config = this.getConfig();
    return new RSVP.Promise(function(resolve, reject) {
      buildOpenlayers(config, function(error, compiledLib) {
        if (error) {
          reject(error);
        } else {
          fs.writeFileSync(outputPath, compiledLib, { encoding: 'utf8' });
          resolve();
        }
      });
    });
  }

};
