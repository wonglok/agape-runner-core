const path = require('path')
const nextConfig = {
  webpack(config, { isServer }) {
    // audio support

    config.experiments = { ...config.experiments, asyncWebAssembly: true }
    config.performance = {
      // we dont want the wasm blob to generate warnings
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    }

    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
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
  reactStrictMode: true,
}

module.exports = nextConfig

// const plugins = require('next-compose-plugins')
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })

// const withOffline = require('next-offline')

// // manage i18n
// if (process.env.EXPORT !== 'true') {
//   nextConfig.i18n = {
//     locales: ['en-US'],
//     defaultLocale: 'en-US',
//   }
// }

// module.exports = plugins(
//   [
//     // [
//     //   withOffline,
//     //   {
//     //     workboxOpts: {
//     //       swDest: process.env.NEXT_EXPORT
//     //         ? 'service-worker.js'
//     //         : 'static/service-worker.js',
//     //       runtimeCaching: [
//     //         {
//     //           urlPattern: /^https?.*/,
//     //           handler: 'NetworkFirst',
//     //           options: {
//     //             cacheName: 'offlineCache',
//     //             expiration: {
//     //               maxEntries: 200,
//     //             },
//     //           },
//     //         },
//     //       ],
//     //     },
//     //     async rewrites() {
//     //       return [
//     //         {
//     //           source: '/service-worker.js',
//     //           destination: '/_next/static/service-worker.js',
//     //         },
//     //       ]
//     //     },
//     //   },
//     // ],
//     withBundleAnalyzer,
//   ],
//   nextConfig
// )

// let path = require('path')

// const nextConfig = {
//   webpack(config, { isServer }) {
//     // audio support
//     config.module.rules.push({
//       test: /\.(ogg|mp3|m4v|mp4|wav|mpe?g)$/i,
//       exclude: config.exclude,
//       use: [
//         {
//           loader: require.resolve('url-loader'),
//           options: {
//             limit: config.inlineImageLimit,
//             fallback: require.resolve('file-loader'),
//             publicPath: `${config.assetPrefix}/_next/static/images/`,
//             outputPath: `${isServer ? '../' : ''}static/images/`,
//             name: '[name]-[hash].[ext]',
//             esModule: config.esModule || false,
//           },
//         },
//       ],
//     })

//     // shader support
//     config.module.rules.push({
//       test: /\.(glsl|vs|fs|vert|frag)$/,
//       exclude: /node_modules/,
//       use: ['raw-loader', 'glslify-loader'],
//     })

//     config.resolve = {
//       ...config.resolve,
//       alias: {
//         ...config.resolve.alias,
//         'three/nodes$': path.resolve(
//           __dirname,
//           './node_modules/three144/examples/jsm/nodes/Nodes.js'
//         ),
//         'three-nodes': path.resolve(
//           __dirname,
//           './node_modules/three144/examples/jsm/nodes/'
//         ),
//       },
//     }

//     return config
//   },
// }

// // manage i18n
// if (process.env.EXPORT !== 'true') {
//   nextConfig.i18n = {
//     locales: ['en-US'],
//     defaultLocale: 'en-US',
//   }
// }

// const KEYS_TO_OMIT = [
//   'webpackDevMiddleware',
//   'configOrigin',
//   'target',
//   'analyticsId',
//   'webpack5',
//   'amp',
//   'assetPrefix',
//   'basePath',
//   'generateEtags',
//   'i18n',
//   'pwa',
//   'experimental',
// ]

// module.exports = (_phase, { defaultConfig }) => {
//   // const plugins = [
//   //   // [
//   //   //   withPWA,
//   //   //   {
//   //   //     pwa: {
//   //   //       dest: 'public',
//   //   //       disable: process.env.NODE_ENV === 'development',
//   //   //       runtimeCaching,
//   //   //     },
//   //   //   },
//   //   // ],
//   //   // [withBundleAnalyzer, {}],
//   // ]

//   const wConfig = {
//     ...defaultConfig,
//     ...nextConfig,
//   }

//   const finalConfig = {}
//   Object.keys(wConfig).forEach((key) => {
//     if (!KEYS_TO_OMIT.includes(key)) {
//       finalConfig[key] = wConfig[key]
//     }
//   })

//   return finalConfig
// }
