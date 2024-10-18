export default function pluralize(noun: string) {
  if (
    noun.endsWith('y') &&
    !noun.endsWith('ay') &&
    !noun.endsWith('ey') &&
    !noun.endsWith('oy') &&
    !noun.endsWith('uy')
  ) {
    return noun.slice(0, -1) + 'ies'
  } else if (
    noun.endsWith('s') ||
    noun.endsWith('sh') ||
    noun.endsWith('ch') ||
    noun.endsWith('x') ||
    noun.endsWith('z')
  ) {
    return noun + 'es'
  } else if (noun.endsWith('o')) {
    return noun + 'es'
  } else {
    return noun + 's'
  }
}
