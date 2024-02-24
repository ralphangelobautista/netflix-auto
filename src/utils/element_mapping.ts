import { NETFLIX } from './constants'

export interface ElementMapping {
  type: string
  selector: string
}

export const elementMapping: ElementMapping[] = [
  {
    type: NETFLIX,
    selector: '[data-uia="player-skip-intro"]',
  },
  {
    type: NETFLIX,
    selector: "[aria-label='Skip Intro']",
  },
  {
    type: NETFLIX,
    selector: '[data-uia="player-skip-recap"]',
  },
  {
    type: NETFLIX,
    selector: "[aria-label='Skip Recap']",
  },
  {
    type: NETFLIX,
    selector: '[data-uia="next-episode-seamless-button"]',
  },
  {
    type: NETFLIX,
    selector: "[aria-label='Continue Playing']",
  },
  {
    type: NETFLIX,
    selector: '.skip-credits > a',
  },
  {
    type: NETFLIX,
    selector: '.interrupter-actions > .nf-icon-button:first-child',
  },
]
