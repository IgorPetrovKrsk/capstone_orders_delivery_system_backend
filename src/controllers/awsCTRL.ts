import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Request, Response } from 'express'
import dotenv from 'dotenv';

dotenv.config();
const awsBucketName = process.env.AWS_BUCKET_NAME;

const s3 = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
  },
});

export async function getAwsUrl(req: Request, res: Response) {
    const command = new PutObjectCommand({
        Bucket: awsBucketName,
        Key: `uploads/${Date.now()}.jpg`,
        ContentType: "image/jpeg",
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 60 });

    res.json({ url });
}

export default { getAwsUrl }