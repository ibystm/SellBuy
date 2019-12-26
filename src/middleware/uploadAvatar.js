const multer = require('multer');

const uploadAvatar = multer({
        limits: {
            fileSize: 1000000
        },
        fileFilter( req, file, cb) {
            if (!file.originalname.match(/\.(png|PNG|jpeg|JPEG|jpg|JPG)$/)) {
                return cb(new Error('Please upload a PNG, JPEG or jpg file.'))
            }
            cb(undefined, true);
        }
}).single('avatar');

module.exports = uploadAvatar;