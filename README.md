# Markdown Links
# Welcome to the md-links package!
The heart of this project was to essentially build an npm package (and API) that you can use on your projects to know what links are in your *markdown files*, validate them and generate stats about them. This package can support files and directories.

**Install the library with the command:**
`npm i https://github.com/pibmunoz/DEV001-md-links`

# Using it as an API

For using this package as an API, you have to use require (CommonJS) the `mdLinks(path, options)` module after installing it, in whichever file that you want. This module has two arguments:

>*Note that this API is a pending promise, so you have to use .then and .catch after the module to resolve it.*

*  ***path***, for the relative or absolute path where you need to enter the path of your file or directory.
 * ***options***, that is an object and you can choose between `default, false and true` alternatives: the ***default (and false)*** behavior of this argument is to **not** validate the links that are present in the path and just return the href (URL found), text and file properties of each one, the ***true*** it is to validate the links and return the same properties as before plus status(HTTP request-response) and ok('fail' or 'ok' based on the previous property).

# Using it as a library on CLI

> Opposite the API, this library on CLI just returns the value of the resolved (...or rejected 👀) promise.

If you just write on your cli `md-links` you will find a welcome greeting and with `md-links --help` the summary where you will see all of the commands that are supported by this package are:

`md-links <path>` returns only the links present on your path (file or directory).
![md-links sample_folder](https://user-images.githubusercontent.com/86972128/213135506-2a5c25e6-1001-407e-82bf-6845b316d6b9.png)

`md-links <path>` --validate returns the links with the HTTP request-response.
>*Sometimes, links from LinkedIn or other pages will show as broken (or response 999), mainly because these sites do not allow direct access to the HTTP response.*

![md-links sample_folder --validate](https://user-images.githubusercontent.com/86972128/213135563-3705696a-14c2-456e-9d8e-7e84537b1958.png)

`md-links <path>` --stats returns the stats (total and unique links) on your path.
![md-links sample_folder --stats](https://user-images.githubusercontent.com/86972128/213135676-d5cb4f77-c438-4846-ae0a-59e3cf344c29.png)

`md-links <path> --validate --stats`  returns the stats and validates (total, unique and broken links) on your path.
![md-links sample_folder --validate --stats](https://user-images.githubusercontent.com/86972128/213135715-731fd32b-ae30-46e3-a1dc-f19891b4839b.png)


# Flowchart of package behavior
<img width="3586" alt="mdlinks-pibmunoz" src="https://user-images.githubusercontent.com/86972128/212780193-b66b18e6-17d9-42c4-9527-6cb3189c7710.png">

