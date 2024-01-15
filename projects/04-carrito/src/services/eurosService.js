export function EuroFormat (importe) {
  if (!importe) return '0 €'
  return `${new Intl.NumberFormat().format(importe)} €`
}