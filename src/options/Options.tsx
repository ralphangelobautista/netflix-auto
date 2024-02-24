import { useEffect, useState } from 'react'

import {
  KEY_TASK_STATUS,
  TASK_STATUS_RUNNING,
  TASK_STATUS_STOPPED,
  TYPE_TASK_STATUS_OPTIONS_UPDATED,
  TYPE_TASK_STATUS_POPUP_UPDATED,
} from '../utils/constants'
import { sleep } from '../utils/helper'

import './Options.css'

export const Options = () => {
  const [status, setStatus] = useState(TASK_STATUS_STOPPED)

  const updateStatus = async (interval: number = 0) => {
    await sleep(interval)

    chrome.storage.sync.get([KEY_TASK_STATUS], (result) => {
      setStatus(result[KEY_TASK_STATUS] || TASK_STATUS_STOPPED)
    })
  }

  useEffect(() => {
    chrome.runtime.onMessage.addListener((request) => {
      const { type } = request
      switch (type) {
        case TYPE_TASK_STATUS_POPUP_UPDATED:
          updateStatus(250)

          break

        default:
          break
      }
    })

    updateStatus()
  }, [])

  const handleOnChange = () => {
    setStatus((prevStatus) => {
      const newStatus =
        prevStatus === TASK_STATUS_RUNNING ? TASK_STATUS_STOPPED : TASK_STATUS_RUNNING
      chrome.storage.sync.set({
        [KEY_TASK_STATUS]: newStatus,
      })

      chrome.runtime.sendMessage({
        type: TYPE_TASK_STATUS_OPTIONS_UPDATED,
      })

      return newStatus
    })
  }

  return (
    <main>
      <h3>Options Page</h3>
      <div className="options">
        <input
          id="enable-auto-cb"
          type="checkbox"
          checked={status === TASK_STATUS_RUNNING}
          onChange={handleOnChange}
        />
        <label htmlFor="enable-auto-cb">Enable auto skip?</label>
      </div>
    </main>
  )
}

export default Options
