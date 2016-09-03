# Backchannel

This is a desktop app made with electron and React.js that talks to a
local server/API/daemon `cryptagd` which is provided by
[CrypTag](https://github.com/elimisteve/cryptag).


## Install

### Pre-requisites

1. Download and install Go: https://golang.org/dl/

2. To run Backchannel itself you'll need node, npm, and bower
installed. On Linux, the easiest way to do this is to run:

```
    $ wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.16.1/install.sh | bash
    $ nvm install v6.2.2
    $ [sudo] npm install bower
```

3. (Optional) _If_ you wish to have Backchannel store its data in
[Sandstorm](https://sandstorm.io/), have a friend invite you to their
shared folder or create one yourself by installing [the CrypTag Sandstorm app](https://apps.sandstorm.io/app/mkq3a9jyu6tqvzf7ayqwg620q95p438ajs02j0yx50w2aav4zra0)). You can create a free Sandstorm Oasis account at
https://oasis.sandstorm.io/ . If you're not using Sandstorm to save
your Backchannel data (messages, files, etc), you do not need to
create a Sandstorm Oasis account or use Sandstorm at all.


### cryptag

(If someone has invited you to a Backend -- a shared folder that can
live in Dropbox, Sandstorm, your own server, or just about anywhere
else -- simply decrypt the .json file you receive, put it in your
`~/.cryptag/backends/` directory, and skip the rest of this step; here
we only use `cryptag` to create a new Sandstorm Backend.)

Install the `cryptag` command and use it to create a new Sandstorm
Backend:

    $ go get github.com/elimisteve/cryptag/cmd/cryptag
    $ cryptag init sandstorm <name of this backend> <sandstorm web key>
    $ cryptag setdefaultbackend <name of this backend>

To generate a Sandstorm webkey, [install the CrypTag app on Sandstorm](https://apps.sandstorm.io/app/mkq3a9jyu6tqvzf7ayqwg620q95p438ajs02j0yx50w2aav4zra0)
then _click the key icon_ near the top of your screen.

If someone else gave you the Sandstorm webkey along with the decrypt
key needed to access the tasks s/he is sharing with you, also run

    $ cryptag setkey <decryption key for the shared folder>

The person sharing this with you can get the key you need by running:

    $ cryptag -b <name of backend they're sharing with you> getkey


### cryptagd

Install the local daemon `cryptagd` that Backchannel talks to:

    $ go get github.com/elimisteve/cryptag/servers/cryptagd

Run it in one terminal with

    $ cryptagd

To tell `cryptagd` which Backend to use by default, run it with the
`BACKEND` environment variable set:

    $ BACKEND=<backend name> cryptagd

meanwhile, in another terminal, run Backchannel (see next section).


## Installation and Running

``` $ git clone https://github.com/elimisteve/backchannel.git ```

``` $ cd backchannel ```

``` $ nvm use v6.2.2 ```

``` $ npm install ```

(Some Linux systems require you to instead run `sudo npm install`.)

``` $ bower install ```

You should also install gulp as a global tool on your system:

``` $ npm install gulp -g ```

then

``` $ npm start ```


## Development

In order to edit the CSS styles, edit the SASS files inside of static/sass. The files in static/css are
generated automatically from the SASS files by running:

``` $ gulp sass ```

If you run the default gulp task:

``` $ gulp ```

gulp will run in the background and recompile the CSS any time you make changes to the SASS files.

In order to add any new bower libraries to the HTML files:

``` $ gulp inject ```

## Testing

There are some placeholder tests included here that test the rendering of the individual components
and the final compiled version of the app. You'll need to build the app first:

``` $ npm run build ```

If you're on Linux, instead run:

``` $ npm run build-linux ```

(TODO: automate this based on system platform detection.)

``` $ npm test ```

## Thank Yous

_Major_ thanks to [@jimmcgaw](https://github.com/jimmcgaw) for writing
the foundations to this app, which began as a clone of
[jimmcgaw/cpassui@d072b0f](https://github.com/jimmcgaw/cpassui/commit/d072b0fa8d9c2442a094cae98bf2acafb28154f3).
