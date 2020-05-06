export function keysAppend(object) {
  const data = new FormData();
  const keys = Object.keys(object);
  for (const key of keys) {
    if (object[key] !== "") {
      data.append(key, object[key]);
    }
  }

  return data;
}
