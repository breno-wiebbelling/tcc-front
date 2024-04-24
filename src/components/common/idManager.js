export const idGenerator = (prefix) => {
  prefix = (typeof prefix == "undefined") ? "genId" : prefix
  return prefix+Math.random().toString(36).substring(2, 8)
}