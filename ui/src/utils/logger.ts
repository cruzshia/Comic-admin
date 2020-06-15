import { isDev } from '@src/common/appConfig'

function cloneArgs(args: any[]) {
  return args.map(arg => (typeof arg === 'object' ? JSON.parse(JSON.stringify(arg)) : arg))
}

const enableLogger = localStorage.getItem('__vearth_log__') === 'open'

function logFunc(func: keyof Console) {
  return isDev || enableLogger ? (...args: any[]) => console[func](...cloneArgs(args)) : () => {}
}

export default {
  log: logFunc('log'),
  info: logFunc('info'),
  error: logFunc('error'),
  warn: logFunc('warn')
}
