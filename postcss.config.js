const path = require("path");

module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-cssnext')({
      "browserslist": [
        "> 1%",
        "last 2 versions"
      ],
      features: {
        customProperties: {
          variables: require(path.join(__dirname, "src/variables.js"))
        }
      }
    })
  ]
}
