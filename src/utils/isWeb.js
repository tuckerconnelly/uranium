const WEB_VOID_ELEMENTS = ['input', 'TextInput']

export function isWebVoidElement(element) {
  return (
    WEB_VOID_ELEMENTS.indexOf(element.type) !== -1 ||
    WEB_VOID_ELEMENTS.indexOf(element.type.displayName) !== -1
  )
}

// HACK global.__BUNDLE_START_TIME__ is only present in React Native
export default function isWeb() { return !global.__BUNDLE_START_TIME__ }
