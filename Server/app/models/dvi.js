var mongoose = require ('mongoose');

var dviSchema = mongoose.Schema({

    qr_id: String,
    possible_identity: String,
    status: String,
    geotag: String,
    physical_description: {
      general_condition:String,
      apparent_sex: String,
      age_group: String,
      height:String,
      weight: String,
      head_hair_color: String,
      head_hair_length: String,
      eye_color: String,
      facial_hair: String,
      race: String,
    },
    associated_evidence: {
      clothing: String,
      footwear: String,
      eyewear: String,
      personal_items: String,
      identity_documents: String,
    },
    recorded_information: {
      full_length_img: { data: Buffer, contentType: String },
      upper_half_img: { data: Buffer, contentType: String },
      lower_half_img: { data: Buffer, contentType: String },
      fvoh_img: { data: Buffer, contentType: String },
      elevated_view_img: { data: Buffer, contentType: String },
      unique_features_img: { data: Buffer, contentType: String },
      personal_effects_img: { data: Buffer, contentType: String },
    }
    //a.img.data = fs.readFileSync(imgPath);
    //a.img.contentType = 'image/png';

});

module.exports = mongoose.model('DVI', dviSchema);
