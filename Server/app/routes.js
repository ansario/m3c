var DVI = require("./models/dvi");

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

  app.post('/create', function(req, res) {
     
        var newDVI = new DVI();

        newDVI.qr_id = req.body.qr_id;
        newDVI.possible_identity = req.body.possible_identity;
        newDVI.status = req.body.status;
        newDVI.geotag.latitude = req.body.geotag.latitude;
        newDVI.geotag.longitude = req.body.geotag.longitude;
        newDVI.physical_description.body_condition = req.body.physical_description.body_condition;
        newDVI.physical_description.general_condition = req.body.physical_description.general_condition;
        newDVI.physical_description.apparent_sex = req.body.physical_description.apparent_sex;
        newDVI.physical_description.age_group = req.body.physical_description.age_group;
        newDVI.physical_description.height = req.body.physical_description.height;
        newDVI.physical_description.weight = req.body.physical_description.weight;
        newDVI.physical_description.head_hair_color = req.body.physical_description.head_hair_color;
        newDVI.physical_description.head_hair_length = req.body.physical_description.head_hair_length; 
        newDVI.physical_description.eye_color = req.body.physical_description.eye_color;
        newDVI.physical_description.facial_hair = req.body.physical_description.facial_hair;
        newDVI.physical_description.race = req.body.physical_description.race;
        newDVI.associated_evidence.clothing = req.body.associated_evidence.clothing;
        newDVI.associated_evidence.footwear = req.body.associated_evidence.footwear;
        newDVI.associated_evidence.eyewear = req.body.associated_evidence.eyewear;
        newDVI.associated_evidence.personal_items = req.body.associated_evidence.personal_items;
        newDVI.associated_evidence.identity_documents = req.body.associated_evidence.identity_documents;
        newDVI.recorded_information.full_length_img = req.body.recorded_information.full_length_img;
        newDVI.recorded_information.upper_half_img = req.body.recorded_information.upper_half_img;
        newDVI.recorded_information.lower_half_img = req.body.recorded_information.lower_half_img;
        newDVI.recorded_information.fvoh_img = req.body.recorded_information.fvoh_img;
        newDVI.recorded_information.eleveated_view_img = req.body.recorded_information.eleveated_view_img;
        newDVI.recorded_information.unique_features_img = req.body.recorded_information.unique_features_img;
        newDVI.recorded_information.personal_effects_img = req.body.recorded_information.personal_effects_img;

        newDVI.save();
        res.sendStatus(200);

  });
      
  

};
