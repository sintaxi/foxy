var foxy    = require("../")
var should  = require("should")
var connect = require("connect")
var request = require("request")

describe("foxy", function(){

  before(function(done){
    var app = connect()

    app.use(foxy({
      "/proxy": "http://127.0.0.1:7002"
    }))

    app.listen(7001, function(){
      connect(function(req, rsp){ rsp.end("hit proxy"); }).listen(7002, function(){
        done()
      })
    })
  })

  it("should exist", function(done){
    should.exist(foxy)
    done()
  })

  it("should pass through if not a match", function(done){
    var options = {
      url: "http://localhost:7001/hello"
    }
    request(options, function(err, response, body){
      should.not.exist(err)
      response.statusCode.should.eql(404)
      done()
    })
  })

  it("should match ", function(done){
    var options = {
      url: "http://localhost:7001/proxy/foo"
    }
    request(options, function(err, response, body){
      should.not.exist(err)
      response.statusCode.should.eql(200)
      done()
    })
  })

})