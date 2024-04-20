export const idGenerator = (prefix) => {
  prefix = (typeof prefix == "undefined") ? "" : prefix
  return prefix+Math.random().toString(36).substring(2, 8)
}