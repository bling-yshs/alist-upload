import * as fs from 'node:fs'
import * as path from 'node:path'
import * as core from '@actions/core'
import * as glob from '@actions/glob'

// 获取 Alist token
async function getToken(url: string, username: string, password: string): Promise<string> {
  try {
    core.info('正在获取 token...')

    const response = await fetch(`${url}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })

    const data = await response.json()

    if (data.code === 200 && data.data && data.data.token) {
      core.info('token 获取成功!')
      return data.data.token
    }
    throw new Error(`获取 token 失败: ${JSON.stringify(data)}`)
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`获取 token 时发生错误: ${error.message}`)
    }
    throw new Error(`获取 token 时发生错误: ${String(error)}`)
  }
}

// 上传文件
async function uploadFile(url: string, filePath: string, remotePath: string, token: string): Promise<boolean> {
  try {
    const fileContent = fs.readFileSync(filePath)

    core.info(`上传文件 ${filePath} 到 ${remotePath}`)

    const encodedRemotePath = encodeURIComponent(remotePath)

    const response = await fetch(`${url}/api/fs/put`, {
      method: 'PUT',
      headers: {
        Authorization: token,
        'File-Path': encodedRemotePath,
        'As-Task': 'true',
        'Content-Type': 'application/octet-stream',
      },
      body: fileContent,
    })

    const data = await response.json()
    core.info(`上传响应: ${JSON.stringify(data)}`)
    return response.ok
  } catch (error: unknown) {
    if (error instanceof Error) {
      core.error(`上传文件 ${filePath} 失败: ${error.message}`)
    } else {
      core.error(`上传文件 ${filePath} 失败: ${String(error)}`)
    }
    return false
  }
}

async function main() {
  try {
    // 获取输入参数
    const alistUrl = core.getInput('alist-url', { required: true })
    const alistUsername = core.getInput('alist-username', { required: true })
    const alistPassword = core.getInput('alist-password', { required: true })
    const filePath = core.getInput('file-path', { required: true })
    let remoteDir = core.getInput('remote-dir', { required: true })
    const overwriteExistFile = core.getInput('overwrite-exist-file') === 'true'

    // 处理远程路径格式
    if (!remoteDir.startsWith('/')) {
      remoteDir = `/${remoteDir}`
    }
    if (!remoteDir.endsWith('/')) {
      remoteDir += '/'
    }

    // 获取 token
    const token = await getToken(alistUrl, alistUsername, alistPassword)

    // 获取匹配的文件
    const globber = await glob.create(filePath)
    const files = await globber.glob()

    if (files.length === 0) {
      core.warning(`没有找到匹配 ${filePath} 的文件`)
      return
    }

    // 上传文件
    let successCount = 0
    let failCount = 0

    for (const file of files) {
      const stats = fs.statSync(file)

      if (stats.isDirectory()) {
        core.info(`${file} 是目录，跳过`)
        continue
      }

      // 构建远程路径
      const fileName = path.basename(file)
      const remotePath = `${remoteDir}${fileName}`

      // 上传文件
      if (await uploadFile(alistUrl, file, remotePath, token)) {
        successCount++
      } else {
        failCount++
      }
    }

    // 输出结果
    core.info('\n上传完成!')
    core.info(`成功: ${successCount} 个文件`)
    core.info(`失败: ${failCount} 个文件`)

    // 设置输出
    core.setOutput('time', new Date().toTimeString())
  } catch (error: unknown) {
    core.setFailed(`Action 失败: ${error instanceof Error ? error.message : String(error)}`)
  }
}

main()
