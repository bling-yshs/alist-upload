# AList Upload GitHub Action

A GitHub Action for uploading files to an AList server.

## Features

- Upload single or multiple files to AList server
- Support for file glob patterns
- Options to overwrite existing files

## Usage

```yaml
- name: Upload to AList
  uses: bling-yshs/alist-upload@v0.0.1
  with:
    alist-url: 'https://your-alist-server.com'
    alist-username: ${{ secrets.ALIST_USERNAME }}
    alist-password: ${{ secrets.ALIST_PASSWORD }}
    file-path: 'dist/**/*.zip'
    remote-dir: '/uploads'
    overwrite-exist-file: 'true'
```

## Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| alist-url | Yes | AList server URL |
| alist-username | Yes | AList username for authentication |
| alist-password | Yes | AList password for authentication |
| file-path | Yes | File path using glob pattern |
| remote-dir | Yes | Remote directory in AList where files will be uploaded |
| overwrite-exist-file | No | Whether to overwrite existing files on the remote server (true/false) |

## License

MIT

---

# AList 上传 GitHub Action

一个用于将文件上传到 AList 服务器的 GitHub Action。

## 功能特点

- 支持上传单个或多个文件到 AList 服务器
- 支持文件 glob 模式匹配
- 可选择是否覆盖已存在的文件

## 使用方法

```yaml
- name: 上传到 AList
  uses: bling-yshs/alist-upload@v0.0.1
  with:
    alist-url: 'https://your-alist-server.com'
    alist-username: ${{ secrets.ALIST_USERNAME }}
    alist-password: ${{ secrets.ALIST_PASSWORD }}
    file-path: 'dist/**/*.zip'
    remote-dir: '/uploads'
    overwrite-exist-file: 'true'
```

## 参数说明

| 参数 | 是否必需 | 说明 |
|------|----------|------|
| alist-url | 是 | AList 服务器 URL |
| alist-username | 是 | AList 用户名，用于身份验证 |
| alist-password | 是 | AList 密码，用于身份验证 |
| file-path | 是 | 要上传的文件路径，支持 glob 模式 |
| remote-dir | 是 | AList 中的远程目录，文件将被上传到该目录 |
| overwrite-exist-file | 否 | 是否覆盖远程服务器上已存在的文件（true/false） |

## 许可证

MIT
