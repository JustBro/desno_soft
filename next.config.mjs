/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Добавляем конфигурацию для вывода консольных логов в браузер
    config.optimization.minimize = false;
    config.devtool = 'cheap-module-source-map';
    config.output.devtoolModuleFilenameTemplate = (info) =>
      `webpack:///${info.resourcePath.replace(/\\/g, '/')}`;

    return config;
  },
};

export default nextConfig;
