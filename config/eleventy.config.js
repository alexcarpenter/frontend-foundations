const { DateTime } = require('luxon')
const slugify = require('@sindresorhus/slugify')
const CleanCSS = require('clean-css')
const UglifyJS = require('uglify-js')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const markdown = require('markdown-it')({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
})

module.exports = function(eleventyConfig) {
  const parseDate = str => {
    if (str instanceof Date) {
      return str
    }
    const date = DateTime.fromISO(str, { zone: 'utc' })
    return date.toJSDate()
  }

  eleventyConfig.addPlugin(pluginRss)

  eleventyConfig.addFilter(
    'cssmin',
    code => new CleanCSS({}).minify(code).styles
  )

  eleventyConfig.addFilter('jsmin', code => {
    let minified = UglifyJS.minify(code)
    if (minified.error) {
      console.log('UglifyJS error: ', minified.error)
      return code
    }
    return minified.code
  })

  eleventyConfig.addFilter('markdownify', str => markdown.render(str))
  eleventyConfig.addFilter('markdownify_inline', str =>
    markdown.renderInline(str)
  )

  eleventyConfig.addFilter('slugify', str => slugify(str))

  eleventyConfig.addFilter('permalink', str => str.replace(/\.html/g, ''))

  eleventyConfig.addFilter('readableDate', dateObj =>
    DateTime.fromJSDate(dateObj).toFormat('dd LLL yyyy')
  )

  eleventyConfig.addFilter('date_formatted', obj => {
    const date = parseDate(obj)
    return DateTime.fromJSDate(date).toFormat('yyyy/MM/dd')
  })

  eleventyConfig.addNunjucksFilter('prepend', (value, prepender) => {
    return value === '/' ? prepender : prepender + value
  })

  eleventyConfig.addCollection('jobs', collection => {
    return collection
      .getFilteredByGlob('**/jobs/*.md')
      .reverse()
      .filter(item => item.data.status === 'open')
  })

  eleventyConfig.addCollection('posts', collection => {
    return collection.getFilteredByGlob('**/posts/!(index)*.md').reverse()
  })

  eleventyConfig.addLayoutAlias('default', 'layouts/default.njk')
  eleventyConfig.addLayoutAlias('markdown', 'layouts/markdown.njk')
  eleventyConfig.addLayoutAlias('page', 'layouts/page.njk')

  eleventyConfig.addPassthroughCopy('src/icons')
  eleventyConfig.addPassthroughCopy('src/sw.js')

  return {
    templateFormats: ['njk', 'md', 'html'],
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: 'www'
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: false,
    passthroughFileCopy: true
  }
}
