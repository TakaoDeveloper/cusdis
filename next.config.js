module.exports = {
  rewrites() {
    return [
      {
        source: '/doc',
        destination: '/doc/index.html'
      }
    ]
  },
  async headers() {
    return [
      {
        source: '/*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          }
        ]
      }
    ]
  }
}