const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const { Readable } = require("stream");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    timeout: 60000
});

// function bufferToStream(buffer) {
//     const readable = new Readable();
//     readable._read = () => { };
//     readable.push(buffer);
//     readable.push(null);
//     return readable;
// }

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Wanderlust_DEV',
        allowed_formats: ['pang', 'jpg', 'jpeg'], // supports promises as well
    },
});


module.exports = { cloudinary, storage };
