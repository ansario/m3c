
module.exports = function(app, passport, jwt) {

app.post('/login',
      passport.authenticate('local-login'),
      function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.

        var token = jwt.sign({ user: req.user }, "DEADBODIES", {
                  expiresInMinutes: 1440 // expires in 24 hours
                });

        res.json({"token": token});
        // res.redirect('/users/' + req.user.username);
      });



app.post('/signup', passport.authenticate('local-signup'), function(req, res) {

      res.send(200);
    });

};

app.post('/create', function(req, res) {
    console.log(req);
})
