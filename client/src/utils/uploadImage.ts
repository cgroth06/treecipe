// utils/uploadImage.ts
import axios from 'axios';

// Function to upload the image to AWS S3
export const uploadImageToS3 = async (file: File) => {
    try {
        const presignedUrlResponse = await axios.get('/api/get-presigned-url');
        const { url, fields } = presignedUrlResponse.data;

        const formData = new FormData();
        Object.keys(fields).forEach(key => {
            formData.append(key, fields[key]);
        });
        formData.append('file', file);

        const uploadResponse = await axios.post(url, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        return uploadResponse.data;
    } catch (err) {
        console.error('Error uploading image:', err);
        throw new Error('Image upload failed');
    }
};
