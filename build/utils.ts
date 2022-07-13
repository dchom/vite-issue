import fs from 'fs';
import path from 'path';

export const isDevFn = (mode: string): boolean => {
  return mode === 'development';
}

export const isProdFn = (mode: string): boolean => {
  return mode === 'production';
}

/**
 * 是否生成包预览
 */
export const isReportMode = (): boolean => {
  return process.env.REPORT === 'true';
}

// 读取所有环境变量配置文件到process.env 
export const wrapperEnv = (envConf: Recordable): ViteEnv => {
  const ret: any = {};

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n');
    realName = realName === 'true' ? true : realName === 'false' ? false : realName;

    if (envName === 'VITE_PORT') {
      realName = Number(realName);
    }
    if (envName === 'VITE_PROXY') {
      try {
        realName = JSON.parse(realName);
      } catch (error) {}
    }
    ret[envName] = realName;
    process.env[envName] = realName;
  }
  return ret;
}

/**
 * 获取以指定前缀开始的环境变量 
 * @param match prefix
 * @param confFiles ext
 */
export const getEnvConfig = () => {
  let envConfig = {};
  return envConfig;
}

/**
 * 获取用户根目录
 * @param dir file path
 */
export function getRootPath(...dir: string[]) {
  return path.resolve(process.cwd(), ...dir);
}
