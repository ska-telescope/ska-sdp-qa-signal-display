export function removeLastDirectoryPartOf(url: string) {
  let arr = url.split("/");
  arr.pop();
  return arr.join("/");
}
