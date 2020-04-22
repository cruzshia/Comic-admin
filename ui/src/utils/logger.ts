import { isDev } from '@src/common/appConfig'

function cloneArgs(args: any[]) {
  return args.map(arg => (typeof arg === 'object' ? JSON.parse(JSON.stringify(arg)) : arg))
}

function logFunc(func: keyof Console) {
  return isDev ? (...args: any[]) => console[func](...cloneArgs(args)) : () => {}
}

export default {
  log: logFunc('log'),
  info: logFunc('info'),
  error: logFunc('error'),
  warn: logFunc('warn')
}
