import { createMDX } from 'fumadocs-mdx/next';
import '@rtecn/env/web';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // typedRoutes: true, // disabled due to Next.js 16 bug with @base-ui/react Form types
  reactCompiler: true,
  transpilePackages: ['@rtecn/editor'],
  async rewrites() {
    return [
      {
        source: '/docs/:path*.md',
        destination: '/llms.mdx/docs/:path*',
      },
    ];
  },
};

const withMDX = createMDX();
export default withMDX(nextConfig);
