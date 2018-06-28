const CleanCSS = require("clean-css");
const UglifyJS = require("uglify-js");

module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addFilter("jsmin", function(code) {
    let minified = UglifyJS.minify(code);
    if( minified.error ) {
      console.log("UglifyJS error: ", minified.error);
      return code;
    }
    return minified.code;
  });

  eleventyConfig.addNunjucksFilter("prepend", function(value, prepender) {
    return value === '/' ? prepender : prepender + value;
  });


  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/icons");
  eleventyConfig.addPassthroughCopy("src/sw.js");

  return {
    templateFormats: [
      "njk",
      "md",
      "html"
    ],
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "www"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: false,
    passthroughFileCopy: true
  };
};
