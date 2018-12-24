/**
 * 重要：这个文件不会被webpack打包压缩，方便在编译后直接修改配置设置，不用再次打包。
 * baseUrl: 基础API域名地址
 * baseImagePath: 项目图片存放地址或多服务器时候可以使用，如果添加了多服务器，注意修改fetch.js中的文件
 */
let baseUrl = 'http://api.map.baidu.com/telematics/v3';

export { baseUrl };
