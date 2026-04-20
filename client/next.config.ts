import { networkInterfaces } from 'node:os';
import type { NextConfig } from 'next';

const allowedDevOrigins = Array.from(
  new Set(
    Object.values(networkInterfaces())
      .flat()
      .filter((networkInterface): networkInterface is NonNullable<typeof networkInterface> => Boolean(networkInterface))
      .filter(({ family, internal }) => family === 'IPv4' && !internal)
      .map(({ address }) => address),
  ),
);

const nextConfig: NextConfig = {
  allowedDevOrigins,
};

export default nextConfig;
