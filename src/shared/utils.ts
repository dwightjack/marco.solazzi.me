export function toStyleAttribute(input: Record<string, unknown>) {
  const style: Record<string, string | number> = {};
  const keys: string[] = [];

  for (const [key, value] of Object.entries(input)) {
    if (typeof value === 'string' || typeof value === 'number') {
      style[key] = value;
      keys.push(key);
    }
  }
  if (keys.length === 0) {
    return undefined;
  }
  return style;
}

export function computedSpace(
  space?: number | number[],
  { prefix = '--' } = {},
): Record<string, number | undefined> {
  if (!space) {
    return {};
  }
  if (typeof space === 'number') {
    return { [`${prefix}space`]: space };
  }
  return {
    [`${prefix}space-c`]: space[0],
    [`${prefix}space-r`]: space[1],
  };
}
