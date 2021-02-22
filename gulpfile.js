/*
 * @Author: lijufeng
 * @Date: 2021-01-14 13:49:00
 * @LastEditors: Wangxt
 * @LastEditTime: 2021-01-15 13:51:00
 * @Description:
 */
// 实现这个项目的构建任务

const {src, dest, parallel, series, watch } = require('gulp')
const del = require('del')
const loadPlugins = require('gulp-load-plugins');
const plugins = loadPlugins()// 自动加载插件
const browserSync = require('browser-sync');
const bs = browserSync.create()

const data = {
  menus: [
      {
          name: 'Home',
          icon: 'aperture',
          link: 'index.html'
      },
      {
          name: 'Features',
          link: 'features.html'
      },
      {
          name: 'About',
          link: 'about.html'
      },
      {
          name: 'Contact',
          link: '#',
          children: [
              {
                  name: 'Twitter',
                  link: 'https://twitter.com/w_zce'
              },
              {
                  name: 'About',
                  link: 'https://weibo.com/zceme'
              },
              {
                  name: 'divider'
              },
              {
                  name: 'About',
                  link: 'https://github.com/zce'
              }
          ]
      }
  ],
  pkg: require('./package.json'),
  date: new Date()
}

// 样式编译
const style = () => {
  return src('src/assets/styles/*.scss',{ base: 'src' }).pipe(plugins.sass({ outputStyle: 'expanded' })).pipe(dest('dist'))
}

// 脚本编译
const script = () => {
  return src('src/assets/scripts/*.js', { base: 'src' }).pipe(plugins.babel()).pipe(dest('dist'))
}

// 页面模板编译
const page = () => {
  return src('src/*.html', { base: 'src' }).pipe(plugins.swig({data}))
      .pipe(dest('dist'))
}

// 图片和文字编译
const image = () => {
  return src('src/assets/images/**', { base: 'src' })
      .pipe(plugins.imagemin())
      .pipe(dest('dist'))
}
// 文字
const font = () => {
  return src('src/assets/fonts/**', { base: 'src' })
      .pipe(plugins.imagemin())
      .pipe(dest('dist'))
}
// 其他文件以及文件清除
const extra = () => {
  return src('public/**', { base: 'public' })
      .pipe(dest('dist'))
}
// 文件清理
const clean = () => {
  return del(['dist', 'temp'])
}

// 监听修改文件，进行文件实时响应
const serve = () => {
  watch('src/assets/styles/*.scss', style)
  watch('src/assets/scripts/*.js', script)
  watch('src/*.html', page)
  watch([
      'src/assets/images/**',
      'src/assets/fonts/**',
      'public/**'
  ], bs.reload)

  bs.init({
      notify: false,
      port: 2080,
      // open: false,
      // files: 'dist/**',
      server: {
          baseDir: ['dist','src','public'],
          routes: {
              '/node_modules': 'node_modules'
          }
      }
  })
}

const compile = parallel(style, script, page, image, font);
const build = series(clean, parallel(compile, extra))
const build_serve = series(build, serve)

module.exports =  {
  compile,
  build,
  clean,
  serve,
  build_serve
}