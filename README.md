## 问题解决
#### 浏览器跨域
```$xslt
open -n /Applications/Google\ Chrome.app/ --args --disable-web-security  --user-data-dir=/Users/jinxunmediapty.ltd/chromeTmp
``
## 目录结构
### src下
assets ： 静态资源
axios ： http请求  
components ： 组件
constant : 常量
directive: vue 指令
filter: vue 过滤器
log : 日志输出用
native ： 调用原生安卓或者原生IOS方法
router ： 路由
views ：页面
store ： vuex 状态管理

## 运行
npm run dev
## 打包
npm run build -- h5 
npm run build -- android
npm run build -- ios
## 使用生产环境
npm run build -- h5 production
## 使用预生产环境
npm run build -- h5 prev

### 添加es6支持
创建.babelrc文件
```
{
  "presets": ["es2015", "flow-vue", "stage-0", "stage-2"],
  "plugins": ["transform-vue-jsx"],
  "comments": false,
  "env": {
    "production": {
      "plugins": [
        ["transform-runtime", { "polyfill": false, "regenerator": false }]
      ]
    }
  }
}
```
安装 es2015
```
npm install --save-dev babel-preset-es2015
```
### 添加less支持
```
npm install less less-loader --save
```
```
{     //添加less支持
          test: /\.less$/,
          loader: "style-loader!css-loader!less-loader",

      },
```

### 添加vuex支持
```
npm install vuex --save
```