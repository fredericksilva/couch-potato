# couch-potato

Easy way to lazy load images. Dependency free.

# Usage

The script is flexible enough to let you decide what strategy you're going to use to load your images. It won't assume anything.

Let's say you have the following markup:

```html
<div class="holder">
  <img data-couch-potato="http://lorempixel.com/500/300/sports/" />
</div>

<div class="holder">
  <img data-couch-potato="http://lorempixel.com/500/300/food/" />
</div>

<div class="holder">
  <img data-couch-potato="http://lorempixel.com/500/300/animals/" />
</div>
```

Imagine you want to load the images only when its parent is hovered. You could do something like this:

```js
// List of images you want to lazy load
var images = document.querySelectorAll('[data-couch-potato]');

// Loop through each image node
[].forEach.call(images, function(image) {

  // Create a new `CouchPotato` instance passing the image node as context
  new CouchPotato(image, {

    // Implements the `trigger` method to fire when the parent element is hovered
    trigger: function(image, source) {
      image.parentNode.addEventListener('mouseover', function() {
        this.load();
      }.bind(this));
    }
  });
});
```

Notice that the only thing you have to do is to implement your loading strategy via the `trigger` option.
If you simply want to lazy load your images, let's say, after 3 seconds. You could just change the `trigger` implementation with the good old `setTimeout`:

```js
new CouchPotato(image, {
  // Will fire the request after 3000 milliseconds
  trigger: function(image, source) {
    setTimeout(this.load.bind(this), 3000);
  }
});
```

One last thing that you should notice is that `trigger` receives two parameters: `image` and `source`. So you can use this information for whatever you might need.

# Options

* **`attribute`**: The attribute used by `couch-potato` to read the image source;
* **`shouldRemoveDataAttribute`**: Whether or not the data attribute should be removed after image load (defaults to `true`);
* **`trigger`**: Lazy load strategy (will receive `image` and `source` as arguments).

# Building your own

To build your own version, you must have [Node.js](http://nodejs.org) installed.

```sh
make build
```

## Running tests

```sh
make test
```

## Running linter

```sh
make lint
```

# Contributing

1. Fork the repository
2. Create a feature branch (E.g.: `feature/my-awesome-feature`)
3. Do whatever you have to do (adding tests if necessary)
4. Make sure tests are OK
5. Make sure linting is OK
6. Submit a pull request describing the changes you have made (be descriptive, please)

# License

Released under MIT license.
