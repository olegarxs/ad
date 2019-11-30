const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../upload'));
    },
    filename: (req, file, cb) => {
        console.log(file);
        console.log(file.filename + path.extname(file.originalname));
        
        cb(null, file.filename + path.extname(file.originalname));
    }
})

module.exports = multer({storage:storage});