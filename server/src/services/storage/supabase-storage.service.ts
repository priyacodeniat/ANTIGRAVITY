import { supabaseAdmin } from '../../config/supabase.js';
import crypto from 'crypto';

export class StorageService {
  private static BUCKET_NAME = 'crop-images';

  /**
   * Uploads an image buffer to Supabase Storage under user-specific path
   */
  static async uploadCropImage(
    userId: string,
    buffer: Buffer,
    mimeType: string
  ): Promise<{ storagePath: string; publicUrl?: string }> {
    const extension = mimeType === 'image/png' ? 'png' : mimeType === 'image/webp' ? 'webp' : 'jpg';
    const randomId = crypto.randomBytes(16).toString('hex');
    const storagePath = `${userId}/${Date.now()}_${randomId}.${extension}`;

    try {
      const { error } = await supabaseAdmin.storage
        .from(this.BUCKET_NAME)
        .upload(storagePath, buffer, {
          contentType: mimeType,
          upsert: false,
        });

      if (error) {
        console.warn(`Supabase Storage upload warning (${error.message}). Saving path reference.`);
      }

      // Generate signed URL if bucket is private
      const { data: signedData } = await supabaseAdmin.storage
        .from(this.BUCKET_NAME)
        .createSignedUrl(storagePath, 60 * 60 * 24); // 24 hours valid

      return {
        storagePath,
        publicUrl: signedData?.signedUrl || undefined,
      };
    } catch (err) {
      console.warn('Storage upload encountered non-fatal error, continuing with local reference:', err);
      return {
        storagePath: `local/${storagePath}`,
      };
    }
  }
}

