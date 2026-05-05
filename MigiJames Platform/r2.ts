import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

// R2 ใช้ S3-compatible API
const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

const BUCKET = process.env.R2_BUCKET_NAME!
const PUBLIC_URL = process.env.R2_PUBLIC_URL!  // https://pub-xxx.r2.dev

/**
 * อัปโหลดรูปภาพสินค้าขึ้น R2
 * @returns public URL ของรูป
 */
export async function uploadProductImage(
  file: Buffer,
  filename: string,
  contentType: string
): Promise<string> {
  const key = `products/${Date.now()}-${filename}`

  await r2.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: file,
      ContentType: contentType,
      // Public read access
      ACL: 'public-read',
    })
  )

  return `${PUBLIC_URL}/${key}`
}

/**
 * ลบรูปภาพออกจาก R2
 */
export async function deleteImage(imageUrl: string): Promise<void> {
  // แปลง URL กลับเป็น key
  const key = imageUrl.replace(`${PUBLIC_URL}/`, '')

  await r2.send(
    new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: key,
    })
  )
}

/**
 * สร้าง Presigned URL สำหรับ upload ตรงจาก browser (ไม่ต้องผ่าน server)
 * ใช้สำหรับรูปขนาดใหญ่
 */
export async function getUploadPresignedUrl(
  filename: string,
  contentType: string
): Promise<{ uploadUrl: string; publicUrl: string }> {
  const key = `products/${Date.now()}-${filename}`

  const uploadUrl = await getSignedUrl(
    r2,
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      ContentType: contentType,
    }),
    { expiresIn: 3600 } // 1 ชั่วโมง
  )

  return {
    uploadUrl,
    publicUrl: `${PUBLIC_URL}/${key}`,
  }
}
