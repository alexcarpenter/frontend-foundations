module.exports = function(eleventyConfig) {

  return {
    templateFormats: [
      "njk"
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
