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

// https://gist.github.com/ca0v/73a31f57b397606c9813472f7493a940?permalink_comment_id=4307328#gistcomment-4307328
export function debounce<F extends (...args: Parameters<F>) => ReturnType<F>>(
  func: F,
  waitFor = 300,
): (...args: Parameters<F>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };
}
