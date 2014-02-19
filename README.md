# foxy

> a simple proxy middle for CORS

## Usage (with express)

```
var foxy    = require('foxy')
var express = require('express')
var app     = express()

app.use(foxy({
  "/foo" : "http://api.foo.com"
}))

app.listen(3000)
```