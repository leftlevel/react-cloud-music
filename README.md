# react-cloud-music
#### react-cloud-music—— 一个React打造的网易云音乐页面播放器

在学完 React 基础后，我打算用它来做一个我期待已久的网易云小项目，顺便学习 hook 的用法和巩固 redux 的用法。

此项目能够从0开始搭建脚手架并逐渐完善 特此感谢 Binaryify 提供的后端[NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi/) 和 ImloserLee 提供的[源码](https://github.com/ImloserLee/react-netease-music)参考，我在源码基础上继续优化 bug 及新增了一部分功能

#### 技术栈
- React、React-Router、React-Redux、Redux-thunk等
- UI库 Ant Design
- 列表滚动 better-scroll
- Sass（CSS 预处理器）
#### 界面预览
![img](https://note.youdao.com/yws/api/personal/file/D3373A71EC884B9A9E86BE6A39638121?method=download&shareKey=2aacf8acddad1140a7cf4d22b768b766)

![img](https://note.youdao.com/yws/api/personal/file/1DCC81BAFAE140338A87FF9092AC0771?method=download&shareKey=83371cc7c8cb8584aa90790555d82ac7)

![img](https://note.youdao.com/yws/api/personal/file/A661D9A1A9B04B23BD8EBCA5B28D6F90?method=download&shareKey=e5cf89cda8d69a8432f30ba3387ea4cd)

![img](https://note.youdao.com/yws/api/personal/file/F69BBC3325A04137904845F6CF51775F?method=download&shareKey=0b990de31c09682e4eaf1bcd633dccde)

#### 目前完成功能
- [x] 支持主题切换
- [x] Uid 登录/登出
- [x] 推荐歌单
- [x] 发现音乐
- [x] 最新音乐
- [x] 最新MV（支持MV播放）
- [x] 个人的歌单
- [x] 收藏的歌单
- [x] 当前/历史播放列表
- [x] 歌词高亮
- [x] 相似歌曲
- [x] 相似歌单
- [x] 相似MV
- [x] 热门搜索
- [x] 历史搜索
- [x] 精致播放器
- [x] 歌曲/歌单/MV详情
- [x] 歌曲/歌单/MV评论
- [x] 相似歌曲
- [x] 更多功能还在完善...
#### Project clone
```
git clone -b master https://github.com/leftlevel/react-cloud-music
```

#### Project setup
```
yarn install
```

#### Compiles and hot-reloads for development
```
yarn start
```

#### Compiles and minifies for production
```
yarn build
```

