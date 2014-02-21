var express = require('express');
var app = express();
var url = require('url');
var https = require('https');
var requestify = require('requestify');

// Configure static
app.configure(function() {
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
  app.use(app.router);

});

// Initially server index
app.get('/', function(request, response) {
  response.sendfile(__dirname + "/public/index.html");
});

// Handle new blog post request
app.get('/sendtoken', function(request, response) {
  var access_token = request.query.token;

  setInterval(function() {

    requestify.get("https://api.instagram.com/v1/tags/girls/media/recent?access_token=" + access_token).then(function(response) {
      
        var jsonstuff = response.getBody();
        var images = jsonstuff.data;
        var i;
        for(i = 0; i < images.length; i++)
        {
          likeImage(images[i].id, access_token);
        }
    });

    requestify.get("https://api.instagram.com/v1/tags/new/media/recent?access_token=" + access_token).then(function(response) {
      
        var jsonstuff = response.getBody();
        var images = jsonstuff.data;
        var i;
        for(i = 0; i < images.length; i++)
        {
          likeImage(images[i].id, access_token);
        }
    });

    requestify.get("https://api.instagram.com/v1/tags/love/media/recent?access_token=" + access_token).then(function(response) {
      
        var jsonstuff = response.getBody();
        var images = jsonstuff.data;
        var i;
        for(i = 0; i < images.length; i++)
        {
          likeImage(images[i].id, access_token);
        }
    });

    requestify.get("https://api.instagram.com/v1/tags/girl/media/recent?access_token=" + access_token).then(function(response) {
      
        var jsonstuff = response.getBody();
        var images = jsonstuff.data;
        var i;
        for(i = 0; i < images.length; i++)
        {
          likeImage(images[i].id, access_token);
        }
    });


  }, 60000);
  
  response.send({
    'status': 'success'
  });

});

// Catch 404s
app.get('*', function(req, res) {
  res.sendfile(__dirname + "/public/404.html");
});

// Listen
app.listen(process.env.PORT || 5000);
console.log('Listening on port 5000');

function likeImage(id, access_token)
{
  requestify.post('https://api.instagram.com/v1/media/' + id + '/likes?access_token=' + access_token)
  .then(function(response) {
    response.getBody();
    console.log("Liked post with id of: " + id);
  });
}