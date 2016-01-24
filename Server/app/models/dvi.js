var mongoose = require ('mongoose');

var dviSchema = mongoose.Schema({

    qr_id: String,
    possible_identity: String,
    status: String,
    geotag: String,
    physical_description: {
      body_condition:String,
      general_condition:String,
      apparent_sex: String,
      age_group: String,
      height:String,
      weight: String,
      head_hair_color: String,
      head_hair_length: String,
      eye_color: String,
      facial_hair: String,
      race: String
    },
    associated_evidence: {
      clothing: String,
      footwear: String,
      eyewear: String,
      personal_items: String,
      identity_documents: String
    },
    recorded_information: {
      full_length_img: Buffer,
      upper_half_img: Buffer,
      lower_half_img: Buffer,
      fvoh_img: Buffer,
      elevated_view_img: Buffer,
      unique_features_img: Buffer,
      personal_effects_img: Buffer
    }
    //a.img.data = fs.readFileSync(imgPath);
    //a.img.contentType = 'image/png';

});

module.exports = mongoose.model('DVI', dviSchema);
