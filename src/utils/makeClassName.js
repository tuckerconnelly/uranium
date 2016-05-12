import Hashes from 'jshashes'

// Recursively removes functions and nested objects from an object
// Needed because Animated.values had circular dependencies
// which were throwing errors in JSON.stringify below
const flatten = object => {
  const cleanObject = {}
  for (const key in object) {
    if (!object.hasOwnProperty(key)) continue
    cleanObject[key] =
      typeof object[key] === 'object' ||
      typeof object[key] === 'function' ?
        object[key].toString() :
        object[key]
  }
  return cleanObject
}

// Uses a 7-length substring of the MD5 of the css for a unique
// id for className
export default css => {
  const cssHash = new Hashes.MD5().hex(JSON.stringify(flatten(css))).substr(0, 7)
  return `ur-${cssHash}`
}
