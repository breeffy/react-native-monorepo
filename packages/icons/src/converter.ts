import humps from 'humps';
import { Svg, Path, Rect, Defs, Mask, G, ClipPath } from 'react-native-svg';
import type React from 'react';
import type { AbstractElement } from '@fortawesome/fontawesome-svg-core';
import type { Color, NumberProp, Styles } from 'react-native-svg';
import type { RequiredExcept } from '@breeffy/types';
import type { IconProps } from '.';

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
export type ExtraProps = {
  height: number;
  width: number;
  fill: Color;
  secondaryFill: Color;
  secondaryOpacity: NumberProp;
  style: RequiredExcept<Styles, 'color'>;
};

function convert(
  createElement: typeof React.createElement,
  element: string | AbstractElement,
  extraProps: IconProps & ExtraProps
): JSX.Element | null {
  if (typeof element === 'string') {
    return createElement(element);
  }

  const isDuotone = (element.children || []).length === 2;
  const children = (element.children || []).map((child, childIndex) => {
    const isDuotoneSecondLayer = isDuotone && childIndex === 0;
    const fillProps = isDuotoneSecondLayer
      ? {
          fill: extraProps.secondaryFill,
          fillOpacity: extraProps.secondaryOpacity
        }
      : {};
    return convert(createElement, child, {
      ...extraProps,
      ...fillProps
    });
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
        case 'focusable':
          acc.attrs[key] = val === 'true' ? true : false;
          break;
        default:
          if (
            key.indexOf('aria-') === 0 ||
            key.indexOf('data-') === 0 ||
            (key === 'fill' && val === 'currentColor')
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
      // @ts-ignore
      { ...mixins.attrs, ...extraProps },
      ...children
    );
  }
  return null;
}

export default convert;
