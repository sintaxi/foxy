var request = require("request")

module.exports = function(config){
  if (!config) config = {}

  return function(req, rsp, next){

    var hostname;
    for (var key in config) {
      if (req.url.match(new RegExp("^" + key + "/"))) {
        hostname = hostname || config[key]
      }
    }

    if (!hostname) return next()

    request({ url: hostname + req.url }, function(err, response, body){
      rsp.end(body)
      next()
    })

  }

}