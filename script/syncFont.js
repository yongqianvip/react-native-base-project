/**
 * synchronous fonts to android
 */

const child_process = require('child_process');
const fs = require('fs');

const subPath = __dirname.substring(0, __dirname.lastIndexOf('/'));
const src = subPath + '/assets/fonts/iconfont.ttf';
const dest = subPath + '/android/app/src/main/assets/fonts/';
const mkSrc = subPath + '/android/app/src/main/assets/fonts';

console.log(`src path ${ src }`);
console.log(`dest path ${ dest }`);

if (!fs.existsSync(mkSrc)) {
	fs.mkdirSync(mkSrc);
	console.log('更新目录创建成功!');
}

child_process.execSync(`cp ${ src } ${ dest }`);

console.log('congratulations, synchronous success');