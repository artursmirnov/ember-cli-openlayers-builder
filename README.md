# Openlayers builder for Ember CLI

This is an Ember CLI addon for managing a custom build of Openlayers library.

## Installation

In order to install the addon just execute in the root of your Ember app:

```
ember install ember-cli-openlayers-builder
```

This will install the addon itself and the Openlayers library to your application.
Also the `.ol-build` config file would appear in the root directory of your app.

After that just run the app in a regular way (`ember serve`) and it will also build Openlayers according to the config file.

## Configuration

You can configure Openlayers builder by modifying `.ol-build` config file.
In general it extends [default openlayers build config](https://github.com/openlayers/ol3/blob/master/config/ol.json).

It has only one own property - `extend: true` which defines if the config should be extended from the default one
or it is written from scratch and should not fulfill sections that are not defined by the ones from default config.

But in most cases you would want to just define your own `exports` section providing only the
namespaces you use in your app. This allows to minimize the library size.

After next application rebuild the configuration would be applied and Openlayers would rebuild.

## Library usage

Inside your Ember application you can access Openlayers library by importing it from `<app_name/ol>`.
Lets say your application name is `map`. Then:
```javascript
import Ember from 'ember';
import ol from 'map/ol';

export default Ember.Component.extend({
  // use ol in regular way
});
```

## Extra features

Addon provides some useful extra features that may simplify debugging.

To manually rebuild Openlayers use
```
ember g openlayers-build
```
This would rebuild the library right away.

You can also provide a directory in which to store the output file.
This could be helpful if you'd like to see the compiled library:
```
ember g openlayers-build /path/to/output/dir/
```

If the compilation result is not what you expected, perhaps something went wrong during configuration files merging.
In order to see the final config that is used in Openlayers compiler just execute the following:
```
ember g openlayers-build-config
```
This will dump merged config file to console.

If you would prefer to save a config to a file, just provide its path as an argument:
```
ember g openlayers-build-config /path/to/config/file.json
```
