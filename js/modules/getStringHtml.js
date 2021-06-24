export default function getStringHtml(htmlDocument) {
  let serializer = new XMLSerializer();
  let rawHtmlString = serializer.serializeToString(htmlDocument);
  while (rawHtmlString.indexOf('&amp;') !== -1 || rawHtmlString.indexOf('%26') !== -1) {
    rawHtmlString = rawHtmlString.replace('&amp;', '&');
    rawHtmlString = rawHtmlString.replace('%26', '&');
  }
  while (rawHtmlString.indexOf('&lt;') !== -1 || rawHtmlString.indexOf('%3C') !== -1) {
    rawHtmlString = rawHtmlString.replace('&lt;', '<');
    rawHtmlString = rawHtmlString.replace('%3C', '<');
  }
  while (rawHtmlString.indexOf('&gt;') !== -1 || rawHtmlString.indexOf('%3E') !== -1) {
    rawHtmlString = rawHtmlString.replace('&gt;', '>');
    rawHtmlString = rawHtmlString.replace('%3E', '>');
  }
  while (rawHtmlString.indexOf('&quot;') !== -1 || rawHtmlString.indexOf('%22') !== -1) {
    rawHtmlString = rawHtmlString.replace('&quot;', '"');
    rawHtmlString = rawHtmlString.replace('%22', '"');
  }
  while (rawHtmlString.indexOf('&apos;') !== -1 || rawHtmlString.indexOf('%27') !== -1) {
    rawHtmlString = rawHtmlString.replace('&apos;', '\'');
    rawHtmlString = rawHtmlString.replace('%27', '\'');
  }
  return rawHtmlString;
}
