var gulp = require('gulp');
var path = require('path');
var Elixir = require('laravel-elixir');
var webpack = require('webpack-stream');
var named = require('vinyl-named');
var _ = require('lodash');

var Task = Elixir.Task;
var Notification = Elixir.Notification;
var config = Elixir.config;
var $ = Elixir.Plugins;

Elixir.extend('webpack', function(src, options, output, baseDir) {
  var paths = prepGulpPaths(src, baseDir, output);

  if (_.isPlainObject(src)) {
    var entry = _.mapValues(src, function(script) {
      return './' + path.join(paths.src.baseDir, script);
    });

    options = _.assign({}, options, {
      entry: entry,
      output: { filename: '[name].js' },
    });
  }

  new Task('webpack', function() {
    var saveFiles;

    if (_.isArray(src)) {
      saveFiles = _.map(paths.src.path, function(file) {
        return path.join(paths.output.baseDir, path.basename(file, path.extname(file)) + '.js');
      });
    } else if (_.isPlainObject(src)) {
      saveFiles = _.map(_.keys(src), function(file) {
        return path.join(paths.output.baseDir, file + '.js');
      });
    } else {
      saveFiles = paths.output;
    }

    this.log(paths.src, saveFiles);

    return gulp.src(paths.src.path)
      .pipe(named())
      .pipe(webpack(options))
      .on('error', function(e) {
        (new Notification).error(e, 'Webpack Compilation Failed!');

        this.emit('end');
      })
      .pipe(gulp.dest(paths.output.baseDir))
      .pipe(new Elixir.Notification('Webpack Compiled!'));
  })
  .watch(paths.src.baseDir + '/**/*');
});

/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|array} src
 * @param  {string}       baseDir
 * @param  {string|null}  output
 */
var prepGulpPaths = function(src, baseDir, output) {
  baseDir = baseDir || config.get('assets.js.folder');

  if (_.isObject(src)) {
    src = _.values(src);
  }

  return new Elixir.GulpPaths()
    .src(src, baseDir)
    .output(output || config.get('public.js.outputFolder'), 'app.js');
};
