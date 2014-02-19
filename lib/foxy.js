var request = require("request")

module.exports = function(config){

  return function(req, rsp, next){
    console.log(req.url)
    next()
  }

}