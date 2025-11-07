// src/lib/supabase-image.ts
// Supabase Storage CDN helper for fast, optimized image delivery

const SUPABASE_URL = 'https://nftofcjmsuwrzzrahozd.supabase.co'
const STORAGE_BUCKET = 'church-images'

/**
 * Get Supabase Storage CDN URL with optional transformations
 * @param filename - Filename in the bucket (e.g., 'samwise.png')
 * @param options - Image transformation options
 */
export function getSupabaseImageUrl(
  filename: string,
  options?: {
    width?: number
    height?: number
    quality?: number // 1-100
    format?: 'origin' | 'webp' // Automatic format conversion
  }
) {
  let url = `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${filename}`

  // Add image transformations (resize, quality, format)
  if (options && (options.width || options.height || options.quality || options.format)) {
    const params = new URLSearchParams()

    if (options.width) params.append('width', options.width.toString())
    if (options.height) params.append('height', options.height.toString())
    if (options.quality) params.append('quality', options.quality.toString())
    if (options.format) params.append('format', options.format)

    url = `${SUPABASE_URL}/storage/v1/render/image/public/${STORAGE_BUCKET}/${filename}?${params.toString()}`
  }

  return url
}

// Direct URLs for each image (cached)
export const SUPABASE_IMAGES = {
  // Hero & Banners
  samwise: `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/samwise.png`,

  // Sermons & Content
  aiminlife: `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/aiminlife.png`,
  miracle: `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/miracle.png`,

  // Locations
  church: `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/church.png`,
  sunnyvalehighschool: `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/sunnyvalehighschool.avif`,

  // Logos & Branding
  logowordhome: `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/logowordhome.svg`,

  // People
  pastorfamily: `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/pastorfamily.jpg`,
} as const

// Helper for responsive images with WebP conversion
export function getResponsiveImage(filename: string, width: number) {
  return getSupabaseImageUrl(filename, { width, quality: 85, format: 'webp' })
}
