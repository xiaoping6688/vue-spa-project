deploy-webpack-plugin
===
A webpack plugin to deploy complied static resources and template files to local or remote directory.

### Example
```javascript 
// webpack.config.js
var DeployWebpackPlugin = require('deploy-webpack-plugin');
module.exports = {
    // ...
    plugins: [
        new DeployPlugin({
            "receiver": "http://remote_server:3333/receiver", // optional, deploy to local directory when omitted
            "staticDir": "/Users/xxx/repos/tmp/test/static", // .js,.css,images will end up here
            "tplDir": "/Users/xxx/repos/tmp/test/template" // .html ends up here
        })
    ]
};
```