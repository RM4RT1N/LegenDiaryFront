const Dotenv = require('dotenv-webpack');
module.exports = {
    resolve: {
        fallback: {
            crypto: require.resolve('crypto-browserify'),
            stream: require.resolve('stream-browserify')
        }
    },
    plugins: [
        new Dotenv()
    ]

}