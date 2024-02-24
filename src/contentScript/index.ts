import {
  KEY_TASK_STATUS,
  LOADING_TEXT,
  TASK_STATUS_RUNNING,
  TASK_STATUS_STOPPED,
} from '../utils/constants'
import { elementMapping } from '../utils/element_mapping'
import { fetchDomNode, getInnerText, setInnerText } from '../utils/helper'

let timeout: NodeJS.Timeout

async function skipNetflix() {
  const configInStore = await chrome.storage.sync.get({
    [KEY_TASK_STATUS]: TASK_STATUS_STOPPED,
  })

  const enabled =
    configInStore[KEY_TASK_STATUS] && configInStore[KEY_TASK_STATUS] === TASK_STATUS_RUNNING
  if (!enabled) {
    return
  }

  try {
    const skipButton = fetchDomNode(elementMapping)
    if (!skipButton) {
      return
    }

    const { domNode, type } = skipButton
    if (!domNode) {
      return
    }

    const innerText = getInnerText(domNode, type)
    if (innerText.toLowerCase() === LOADING_TEXT.toLowerCase()) {
      return
    }

    await setInnerText(domNode, type, LOADING_TEXT)

    domNode.click()
  } catch (err) {
    console.log(`Netflix Auto: `, err)
  }
}

const startTask = () => {
  stopTask()

  timeout = setInterval(() => {
    skipNetflix()
  }, 1000)
}

const stopTask = () => {
  if (!timeout) return

  clearInterval(timeout)
}

chrome.runtime.onMessage.addListener(async (message) => {})

startTask()
