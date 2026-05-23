export function talkTitle(path: string): string {
  const segments = path.split('/')
  return segments[segments.length - 1]
}
