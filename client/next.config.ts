import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: process.env.LOCAL_IP
    ? process.env.LOCAL_IP.split(',')
    : []
};

export default nextConfig;