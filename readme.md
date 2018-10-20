# ThreeJS Demos
最近对ThreeJS比较感兴趣，于是在空闲时间学习了一下ThreeJS的知识并且仿照网上的一些例子做了些demo。整个程序采用npm来导入three包，开发完成后采用webpack打包，然后安装了http-server运行。
## 运行方式
- 在项目根目录运行npm install，安装three以及第三方扩展包
- 在电脑中安装webpack，具体方式自行百度，修改webpack.config.js文件，entry切换不同的路径即为不同的游戏
- 安装小型服务器http-server，命令为npm install -g http-server, 然后在项目根目录运行http-server，启动服务器
- 直接在浏览器访问http-server启动后的对应地址即可，**有时候效果更改需要清空浏览器缓存强制刷新**
## Fallen Ball
./js/fallenBall.js————该demo实现了一个小球下落的动画。整个demo参考自[《ThreeJS入门指南》](http://www.ituring.com.cn/book/miniarticle/53809)第6.3节，引入了Mr. Doob开源的stat.js库来获取实时fps及内存等信息，还引入了OrbitControls（*已写入package.json*）来控制视角的旋转缩放等操作。后期所有demo均会引用这两个库，不再做特殊说明。