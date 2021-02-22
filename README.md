### 使用说明：

```javascript
npm install
// 安装依赖

// 命令配置
npm run clean === gulp clean // 清理文件夹
npm run compile === gulp compile // 只操作得文件打包编译
npm run build === gulp build // 执行文件打包，用于生产
npm run serve === gulp serve // 开启服务，前提是run build 再执行serve
npm run build_serve === gulp build_serve // 合并gulp build 跟serve
```


### 编程思路：

安装项目所需依赖： npm install 
安装gulp：npm install gulp

1. 打包css 文件：
安装 scss 编译文件： npm install gulp-sass --save-dev 
执行gulp style 后dist 下生成main.css 文件(格式不正确),
在sass 中添加 outputStyle: ‘expanded’ 属性，保证打包得文件和常规css 文件格式一致

2. 打包js 文件：
安装 js 编译文件： npm install gulp-babel --save-dev 
执行gulp script报错
继续执行npm install --save-dev @babel/core @babel/preset-env

3. 打包编译html 文件
执行gulp page
此时虽然打包成功，但是模板没有编译
执行 npm install --save-dev gulp-swig 安装模板引擎

4. 打包压缩font\image\以及其他公共 文件
npm install gulp-imagemin --save-dev
文件编译完成，但是每需要一个编译插件都需要手动引入，解决这个问题可以引入gulp-load-plugins:
npm install --save-dev gulp-load-plugins

5. 使用gulp.parallel 将style script page image font 同步编译

6. 文件删除：
使用del模块，编写文件删除指令-clean：
npm install --save-dev del

7. 修改可以实时同步到浏览器安装browser-sync:
npm install --save-dev browser-sync
