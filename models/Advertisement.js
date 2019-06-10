const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    image:{
        type: String
    },
    comments:[{
        user:{
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        message:{
            type: String,
            require: true
        },
        date:{
            type: Date,
            default: Date.now
        }
    }]
});

module.exports = Advertisement = mongoose.model('ad',AdSchema);