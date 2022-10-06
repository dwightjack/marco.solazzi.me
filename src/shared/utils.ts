export function toStyleAttribute(input: Record<string, any>) {
  const style: Record<string, any> = {};
  const keys: string[] = [];

  for (const [key, value] of Object.entries(input)) {
    if (value !== undefined) {
      style[key] = value;
      keys.push(key);
    }
  }
  if (keys.length === 0) {
    return undefined;
  }
  return style;
}
