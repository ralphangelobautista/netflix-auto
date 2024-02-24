import { ElementMapping } from './element_mapping'
import { NETFLIX } from './constants'

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function fetchDomNode(elements: ElementMapping[]) {
  for (const element of elements) {
    const { selector } = element
    const domNode = document.querySelector(selector) as HTMLElement

    if (domNode) {
      return { ...element, domNode }
    }
  }

  return null
}

export function getInnerText(domNode: HTMLElement, type: string) {
  if (type === NETFLIX && domNode.firstElementChild) {
    return (domNode.firstElementChild as HTMLElement).innerText
  }

  return domNode.innerText
}

export async function setInnerText(domNode: HTMLElement, type: string, text: string) {
  if (type === NETFLIX && domNode.firstElementChild) {
    ;(domNode.firstElementChild as HTMLElement).innerText = text
    await sleep(250)

    return
  }

  domNode.innerText = text
  await sleep(250)
}
