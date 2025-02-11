import AWS from 'aws-sdk';
import { Request, Response } from 'express';

const s3 = new AWS.S3({
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY || '',
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
    },
    region: process.env.S3_BUCKET_REGION || '',
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME || '';  // Set your bucket name

export const getPresignedUrl = async (req: Request, res: Response) => {
    const { fileName, fileType } = req.body;

    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        Expires: 60 * 60, // URL expires in 1 hour
        ContentType: fileType,
    };

    try {
        const presignedUrl = await s3.getSignedUrlPromise('putObject', params);
        res.json({ presignedUrl });
    } catch (error) {
        console.error('Error generating presigned URL:', error);
        res.status(500).json({ error: 'Failed to generate presigned URL' });
    }
};

















// from Frontend Interview Pro
// const { S3Client } = require("@aws-sdk/client-s3");
// const multer = require("multer");
// const multerS3 = require("multer-s3");

// const User = require("../models/Recipe");

// const s3 = new S3Client({
//     credentials: {
//         accessKeyId: process.env.S3_ACCESS_KEY || '',
//         secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
//     },
//     region: process.env.S3_BUCKET_REGION || '',
// });

// /**
//  * @param {string} bucket
//  */
// const upload = (bucket) =>
//     multer({
//         storage: multerS3({
//             s3,
//             bucket: bucket,
//             metadata: function (req, file, cb) {
//                 cb(null, { fieldName: file.fieldname });
//             },
//             key: function (req, file, cb) {
//                 cb(null, `image-${Date.now()}.jpeg`);
//             },
//         }),
//     });

// exports.setRecipeImage = (req, res, next) => {
//     const uploadSingle = upload("recipe-image").single(
//         "croppedImage"
//     );

//     uploadSingle(req, res, async (err) => {
//         if (err)
//             return res.status(400).json({ success: false, message: err.message });

//         const newUser = new User({ photoUrl: req.file.location });
//         await newUser.save();

//         res.status(200).json({ data: req.file.location });
//     });
// };