export default async function localIcon(name: string) {
  const icons = import.meta.glob('./local/*.svg', { as: 'raw' });
  return icons[`./local/${name}.svg`]();
}
