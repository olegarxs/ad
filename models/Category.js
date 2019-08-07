const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name:{
        type: String,
        required: true
    },
    parent:{
        type:  String,
        required: false
    }
});

module.exports = Category = mongoose.model('category', CategorySchema);