export default function postProcessHtmlString(html) {
  return html.replace(/href=".*(?=\*\[link_unsubscribe\]\*).*"/g, 'href="*[link_unsubscribe]*"')
}
