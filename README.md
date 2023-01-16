# Markdown Links
# Welcome to the md-links package!
The heart of this project was to essentially build an npm package (and API) that you can use on your projects to know what links are in your *markdown files*, validate them, generate stats about them and return the link.  This package can support files and directories.

**Install the library with the command:**
`npm md-links/pibmunoz`

# Using it as an API

For using this package as an API, you have to use import (ESModules) or require (CommonJS) this `mdLinks(path, options)` module after installing it, in whichever file that you want, note that this module has two arguments:

>*Note that this API is a pending promise, so you have to use .then and .catch after the module to resolve it.*

*  ***path***, for the relative or absolute path where you need to enter the path of your file or directory
 * ***options***, that is an object and you can choose between `default, false and true` alternatives: the ***default (and false)*** behavior of this argument is to **not** validate the links that are present in the path and just return the href (URL found), text and file properties of each one, the ***true*** it is to validate the links and return the same properties as before plus status(HTTP request-response) and ok('fail' or 'ok' based on the previous property).

# Using it as a library on CLI

> Opposite the API, this library on CLI just returns the value of the resolved (...or rejected 👀) promise.

If you just write on your cli `md-links` you will find a welcome greeting and with `md-links --help` the summary where you will see all of the commands that are supported by this package are:

`md-links <path>` returns only the links present on your path (file or directory) 
`md-links <path>` --validate returns the links with the HTTP request-response
`md-links <path>` --stats returns the stats (total and unique links) on your path.
`md-links <path> --validate --stats`  returns the stats and validates (total, unique and broken links) on your path.

# Flowchart of package behavior
<img width="3586" alt="mdlinks-pibmunoz" src="https://user-images.githubusercontent.com/86972128/212780193-b66b18e6-17d9-42c4-9527-6cb3189c7710.png">

