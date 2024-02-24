import { defineManifest } from '@crxjs/vite-plugin'
import packageData from '../package.json'

//@ts-ignore
const isDev = process.env.NODE_ENV == 'development'

export default defineManifest({
  name: `${packageData.displayName || packageData.name}${isDev ? ` ➡️ Dev` : ''}`,
  description: packageData.description,
  version: packageData.version,
  manifest_version: 3,
  icons: {
    16: 'img/icon16.png',
    32: 'img/icon32.png',
    48: 'img/icon48.png',
    128: 'img/icon128.png',
  },
  action: {
    default_popup: 'popup.html',
    default_icon: 'img/icon48.png',
  },
  options_page: 'options.html',
  devtools_page: 'devtools.html',
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
    persistent: false,
  },
  content_scripts: [
    {
      matches: ['http://*.netflix.com/*', 'https://*.netflix.com/*'],
      js: ['src/contentScript/index.ts'],
      run_at: 'document_end',
      all_frames: true,
    },
  ],
  host_permissions: ['http://*.netflix.com/*', 'https://*.netflix.com/*'],
  web_accessible_resources: [
    {
      resources: ['img/icon16.png', 'img/icon32.png', 'img/icon48.png', 'img/icon128.png'],
      matches: [],
    },
  ],
  permissions: ['storage', 'tabs'],
})
