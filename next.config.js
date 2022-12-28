let path = require('path')

const nextConfig = {
  webpack(config, { isServer }) {
    // audio support
    config.module.rules.push({
      test: /\.(ogg|mp3|m4v|mp4|wav|mpe?g)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            limit: config.inlineImageLimit,
            fallback: require.resolve('file-loader'),
            publicPath: `${config.assetPrefix}/_next/static/images/`,
            outputPath: `${isServer ? '../' : ''}static/images/`,
            name: '[name]-[hash].[ext]',
            esModule: config.esModule || false,
          },
        },
      ],
    })

    // shader support
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    })

    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        'three/nodes$': path.resolve(
          __dirname,
          './node_modules/three144/examples/jsm/nodes/Nodes.js'
        ),
        'three-nodes': path.resolve(
          __dirname,
          './node_modules/three144/examples/jsm/nodes/'
        ),
      },
    }

    return config
  },
}

// manage i18n
if (process.env.EXPORT !== 'true') {
  nextConfig.i18n = {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  }
}

const KEYS_TO_OMIT = [
  'webpackDevMiddleware',
  'configOrigin',
  'target',
  'analyticsId',
  'webpack5',
  'amp',
  'assetPrefix',
  'basePath',
  'generateEtags',
  'i18n',
  'pwa',
  'experimental',
]

module.exports = (_phase, { defaultConfig }) => {
  // const plugins = [
  //   // [
  //   //   withPWA,
  //   //   {
  //   //     pwa: {
  //   //       dest: 'public',
  //   //       disable: process.env.NODE_ENV === 'development',
  //   //       runtimeCaching,
  //   //     },
  //   //   },
  //   // ],
  //   // [withBundleAnalyzer, {}],
  // ]

  const wConfig = {
    ...defaultConfig,
    ...nextConfig,
  }

  const finalConfig = {}
  Object.keys(wConfig).forEach((key) => {
    if (!KEYS_TO_OMIT.includes(key)) {
      finalConfig[key] = wConfig[key]
    }
  })

  return finalConfig
}
