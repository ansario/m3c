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

        newDVI.qr_id = req.body.qr_id or "Unknown";
        newDVI.possible_identity = req.body.possible_identity or "Unknown";
        newDVI.status = req.body.status or "Unknown";
        newDVI.geotag.latitude = req.body.geotag.latitude or "Unknown";
        newDVI.geotag.longitude = req.body.geotag.longitude or "Unknown";
        newDVI.physical_description.body_condition = req.body.physical_description.body_condition or "Unknown";
        newDVI.physical_description.general_condition = req.body.physical_description.general_condition or "Unknown";
        newDVI.physical_description.apparent_sex = req.body.physical_description.apparent_sex or "Unknown";
        newDVI.physical_description.age_group = req.body.physical_description.age_group or "Unknown";
        newDVI.physical_description.height = req.body.physical_description.height or "Unknown";
        newDVI.physical_description.weight = req.body.physical_description.weight or "Unknown";
        newDVI.physical_description.head_hair_color = req.body.physical_description.head_hair_color or "Unknown";
        newDVI.physical_description.head_hair_length = req.body.physical_description.head_hair_length or "Unknown"; 
        newDVI.physical_description.eye_color = req.body.physical_description.eye_color or "Unknown";
        newDVI.physical_description.facial_hair = req.body.physical_description.facial_hair or "Unknown";
        newDVI.physical_description.race = req.body.physical_description.race or "Unknown";
        newDVI.associated_evidence.clothing = req.body.associated_evidence.clothing or "Unknown";
        newDVI.associated_evidence.footwear = req.body.associated_evidence.footwear or "Unknown";
        newDVI.associated_evidence.eyewear = req.body.associated_evidence.eyewear or "Unknown";
        newDVI.associated_evidence.personal_items = req.body.associated_evidence.personal_items or "Unknown";
        newDVI.associated_evidence.identity_documents = req.body.associated_evidence.identity_documents or "Unknown";
        newDVI.recorded_information.full_length_img = req.body.recorded_information.full_length_img or "Unknown";
        newDVI.recorded_information.upper_half_img = req.body.recorded_information.upper_half_img or "Unknown";
        newDVI.recorded_information.lower_half_img = req.body.recorded_information.lower_half_img or "Unknown";
        newDVI.recorded_information.fvoh_img = req.body.recorded_information.fvoh_img or "Unknown";
        newDVI.recorded_information.eleveated_view_img = req.body.recorded_information.eleveated_view_img or "Unknown";
        newDVI.recorded_information.unique_features_img = req.body.recorded_information.unique_features_img or "Unknown";
        newDVI.recorded_information.personal_effects_img = req.body.recorded_information.personal_effects_img or "Unknown";

        newDVI.save();
  });
      
  });

};
