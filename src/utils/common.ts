export function removeLastDirectoryPartOf(url: string) {
  const arr = url.split('/');
  arr.pop();
  return arr.join('/');
}
