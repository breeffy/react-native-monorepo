import React from 'react';
import humps from 'humps';
import { Svg, Path, Rect, Defs, Mask, G, ClipPath } from 'react-native-svg';
import { AbstractElement } from '@fortawesome/fontawesome-svg-core';

const svgObjectMap = {
  svg: Svg,
  path: Path,
  rect: Rect,
  defs: Defs,
  mask: Mask,
  g: G,
  clipPath: ClipPath
};

type Tags = keyof typeof svgObjectMap;

function convert(
  createElement: typeof React.createElement,
  element: string | AbstractElement,
  extraProps = {}
): JSX.Element | null {
  if (typeof element === 'string') {
    return createElement(element);
  }

  const children = (element.children || []).map(child => {
    return convert(createElement, child);
  });

  const mixins = Object.keys(element.attributes || {}).reduce(
    (acc, key) => {
      const val = element.attributes[key];
      switch (key) {
        case 'class':
        case 'role':
        case 'style':
        case 'xmlns':
          delete element.attributes[key];
          break;
        default:
          if (
            key.indexOf('aria-') === 0 ||
            key.indexOf('data-') === 0 ||
            ('fill' === key && 'currentColor' === val)
          ) {
            delete element.attributes[key];
          } else {
            acc.attrs[humps.camelize(key)] = val;
          }
      }
      return acc;
    },
    { attrs: {} } as { attrs: { [key: string]: any } }
  );

  if (svgObjectMap.hasOwnProperty(element.tag)) {
    return createElement(
      svgObjectMap[element.tag as Tags],
      { ...mixins.attrs, ...extraProps },
      ...children
    );
  }
  return null;
}

export default convert;
