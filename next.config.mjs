/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com','asset.cloudinary.com'],  // أضف Cloudinary كمصدر للصور
      },
};

export default nextConfig;
