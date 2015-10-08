# Laravel-Elixir-Webpack-Ex

Laravel-Elixir [webpack](https://github.com/webpack/webpack) extension.

## Install
```
nam install laravel-elixir-webpack-ex —-save
```

## Usage

### Simple Example

```js
var elixir = require('laravel-elixir');
var gulp = require('gulp');

require('laravel-elixir-webpack-ex');

elixir(function(mix) {
  mix.webpack('entry.js', {
    module: {
      loaders: [
        { test: /\.css$/, loader: 'style!css' },
      ],
    },
  }, 'public/js', 'resources/assets/js');
});
```

`public/js` is output file path, `resources/assets/js` is assets baseDir, both all optional.


You can pass your `webpack.config.js`:

```js
mix.webpack('entry.js', require('./webpack.config.js'));
```

### Multiple Entry Points

You can pass entries array:

```js
mix.webpack(['entry1.js', 'entry2.js', 'entry3.js'], { ...webpackOptions });
```

or Pass key-value Object in it:

```js
mix.webpack({
  App: 'entry1.js',
  Backend: 'entry2.js',
  Dashboard: 'entry3.js',
}, {...webpackOptions });
```
like webpack `entry` option, it will produce App.js, Backend.js, Dashboard.js at output dir.

## License
Copyright (c) 2015 Far Tseng
Licensed under the MIT license.
