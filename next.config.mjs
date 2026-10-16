/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

function resolveBasePath() {
  if (process.env.NEXT_PUBLIC_BASE_PATH !== undefined) {
    return process.env.NEXT_PUBLIC_BASE_PATH;
  }
  if (process.env.GITHUB_REPOSITORY) {
    const repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
    if (repoName && !repoName.endsWith('.github.io')) {
      return `/${repoName}`;
    }
    return '';
  }
  return isProd ? '/portfolio' : '';
}

const basePath = resolveBasePath();

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: basePath === '' ? undefined : basePath,
  assetPrefix: basePath === '' ? undefined : `${basePath}/`,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
