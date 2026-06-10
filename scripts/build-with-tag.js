#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

// 读取 package.json 获取版本号
const packageJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
const version = packageJson.version;

// 获取当前时间戳
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);

// 获取 git commit hash (如果有)
let gitHash = 'nogit';
try {
  gitHash = execSync('git rev-parse --short HEAD', { cwd: rootDir, encoding: 'utf8' }).trim();
} catch (e) {
  // 不是 git 仓库或没有提交
}

// 构建标签: v1.0.0-20250530-123456-abc1234
const buildTag = `v${version}-${timestamp.replace(/T/g, '-').replace(/-/g, '').slice(0, 8)}-${timestamp.slice(11, 17)}-${gitHash}`;

console.log('========================================');
console.log('🚀 开始构建带标签的版本');
console.log('========================================');
console.log(`📦 版本号: ${version}`);
console.log(`🏷️  构建标签: ${buildTag}`);
console.log(`⏰ 构建时间: ${new Date().toLocaleString()}`);
console.log('========================================\n');

// 执行 vite build
console.log('📦 正在构建...\n');
try {
  execSync('npx vite build', { 
    cwd: rootDir, 
    stdio: 'inherit',
    env: { ...process.env, BUILD_TAG: buildTag }
  });
} catch (error) {
  console.error('❌ 构建失败:', error.message);
  process.exit(1);
}

// 创建带标签的输出目录
const distDir = path.join(rootDir, 'dist');
const taggedDir = path.join(rootDir, 'dist-tagged', buildTag);

console.log('\n📁 创建带标签的目录...');
fs.mkdirSync(taggedDir, { recursive: true });

// 复制 dist 内容到带标签目录
console.log(`📂 复制到: dist-tagged/${buildTag}/`);
execSync(`xcopy "${distDir}" "${taggedDir}" /E /I /Y`, { stdio: 'ignore' });

// 创建版本信息文件
const versionInfo = {
  version: version,
  buildTag: buildTag,
  buildTime: new Date().toISOString(),
  gitHash: gitHash,
  nodeVersion: process.version
};

fs.writeFileSync(
  path.join(taggedDir, 'version.json'),
  JSON.stringify(versionInfo, null, 2)
);

// 同时在 dist 根目录也创建版本信息
fs.writeFileSync(
  path.join(distDir, 'version.json'),
  JSON.stringify(versionInfo, null, 2)
);

console.log('\n========================================');
console.log('✅ 构建完成！');
console.log('========================================');
console.log(`📂 标准输出: dist/`);
console.log(`🏷️  标签版本: dist-tagged/${buildTag}/`);
console.log(`📋 版本信息: version.json`);
console.log('========================================');
