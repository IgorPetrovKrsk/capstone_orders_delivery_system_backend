import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Request, Response } from 'express'
import dotenv from 'dotenv';

dotenv.config();
const awsBucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_REGION;

const s3 = new S3Client({
    region: region,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
    },
});

export async function getAwsUrl(req: Request, res: Response) {
    const key = `uploads/${Date.now()}.jpg`

    const command = new PutObjectCommand({
        Bucket: awsBucketName,
        Key: key,
        ContentType: "image/jpeg",
    });
    
    const url = await getSignedUrl(s3, command, { expiresIn: 60 });
    const staticUrl = `https://${awsBucketName}.s3.${region}.amazonaws.com/${key}`;

    res.json({ url, staticUrl });
}

export default { getAwsUrl }