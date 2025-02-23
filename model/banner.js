const { Schema, model } = require('mongoose');

const bannerSchema = new Schema({
    imageUrl: { type: String, required: true, trim: true },
    link: { type: String, required: true, trim: true },
})

const Banner = model('banner', bannerSchema);

module.exports = Banner;