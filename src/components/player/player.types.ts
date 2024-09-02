export interface HTMLCustomVideoElement extends HTMLVideoElement {
  mozRequestFullScreen?: () => Promise<void>,
  webkitRequestFullscreen?: () => Promise<void>,
  msRequestFullscreen?: () => Promise<void>
}

export enum EnumPlayerQuality {
  'original' = 'Original',
  '1080p' = '1080p',
  '728p' = '728p',
  '480p' = '480p',
  '360p' = '360p',
}