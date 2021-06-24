import { regExps } from '../utils/regexps.js';

export function setUtm(htmlDocument, {source = '', medium = '', campaign = '', content = '', term = ''}) {
  const links = htmlDocument.querySelectorAll('a');
  let utmString = `utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign}`;
  utmString += (content !== '') ? `&utm_content=${content}` : '';
  utmString += (term !== '') ? `&utm_term=${term}` : '';

  links.forEach((link) => {
    if (~link.href.search('tel:') || ~link.href.search('mailto:') || link.href === location.href || !link.href) {
      return;
    }

    if (~link.href.search(regExps.doubleBraces)) {
      let brokenAttributes = {};
      let openingAttrPart;
      let closingAttrPart;

      for (let attr of link.attributes) {
        if (~attr.name.search(regExps.doubleBraces) || ~attr.value.search(regExps.doubleBraces)) {
          brokenAttributes[attr.name] = attr.value;
        }
      }

      for (let [key, value] of Object.entries(brokenAttributes)) {
        if (~key.search(regExps.openingDoubleBraces)) {
          openingAttrPart = key;
        }
        if (~value.search(regExps.openingDoubleBraces)) {
          openingAttrPart = value;
        }
        if (~key.search(regExps.closingDoubleBraces)) {
          closingAttrPart = key;
        }
        if (~value.search(regExps.closingDoubleBraces)) {
          closingAttrPart = value;
        }
        link.removeAttribute(key);

        if (openingAttrPart && closingAttrPart) {
          let linkHref = `${openingAttrPart}${closingAttrPart}`;
          while (linkHref.indexOf('"') !== -1) {
            linkHref = linkHref.replace('"', '');
          }
          linkHref = linkHref.replace('customField(', 'customField("');
          linkHref = linkHref.replace(')}}', '")}}');

          if (linkHref.includes('?tag={{')) {
            linkHref = linkHref.replace('?tag={{customer.customField("unsubscribe")}}', '');
            linkHref += `?${utmString}&tag={{customer.customField("unsubscribe")}}`;
          }

          link.setAttribute('href', linkHref);
        }
      }
      return;
    }

    if (~link.href.search(regExps.questionMark)) {
      link.href = `${link.href}&${utmString}`;
    } else {
      link.href = `${link.href}?${utmString}`;
    }
  });
}
