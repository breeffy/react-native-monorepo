import React from 'react';
import convert from '../converter';
import { StyleSheet } from 'react-native';
import {
  icon as makeIcon,
  parse,
  IconProp,
  Transform,
  IconLookup,
  IconPrefix,
  IconName
} from '@fortawesome/fontawesome-svg-core';

import { isObjectHasDefinedProperty, Key } from '../types';
import { assert } from '../assert';
import { Styles, Color } from 'react-native-svg';

export const DEFAULT_SIZE = 16;
export const DEFAULT_COLOR = '#000';

function objectWithProperty(key: Key, value: any): object {
  return (Array.isArray(value) && value.length > 0) ||
    (!Array.isArray(value) && value)
    ? { [key]: value }
    : {};
}

function normalizeIconArgs(icon: IconProp): IconLookup {
  if (
    isObjectHasDefinedProperty(icon, 'prefix') &&
    isObjectHasDefinedProperty(icon, 'iconName')
  ) {
    return icon;
  }

  // FIXME: Added to fix "expression is too complex to represent"
  // @ts-ignore
  icon = icon as IconName | [IconPrefix, IconName];

  if (Array.isArray(icon) && icon.length === 2) {
    return { prefix: icon[0], iconName: icon[1] };
  }

  // FIXME: Typescript doesn't understand type reduction
  icon = icon as IconName;
  return { prefix: 'fas', iconName: icon };
}

interface FontAwesomeIconProps<T> {
  icon: IconProp;
  // FIXME: I think something weird on resulting types of StyleProp<ExtendedViewStyle>
  // FIXME: It's included some Recursive Array, I don't think it's supported by RN
  style?: Styles | ReadonlyArray<Styles>;
  size?: number;
  color?: Color;
  mask?: IconProp;
  transform?: string | Transform;
}

export default function FontAwesomeIcon({
  icon,
  mask,
  style = {},
  size = DEFAULT_SIZE,
  color,
  transform = {},
  ...otherProps
}: FontAwesomeIconProps<any>): JSX.Element | undefined {
  // Here we test essential invariants
  assert(
    typeof icon !== undefined,
    `[ERROR]: property "icon" is required, but it is: ${icon}`
  );
  assert(
    Object.getOwnPropertyNames(otherProps).length === 0,
    `[ERROR]: properties [${Object.getOwnPropertyNames(
      otherProps
    )}] are not supported`
  );

  const iconLookup: IconLookup = normalizeIconArgs(icon);
  const transformObject = objectWithProperty(
    'transform',
    typeof transform === 'string' ? parse.transform(transform) : transform
  );
  const maskObject = objectWithProperty(
    'mask',
    mask !== undefined ? normalizeIconArgs(mask) : mask
  );
  const renderedIcon = makeIcon(iconLookup, {
    ...transformObject,
    ...maskObject
  });

  const { abstract } = renderedIcon;

  let styleObject: Styles = {};
  if (typeof style === 'object') {
    if (Array.isArray(style)) {
      styleObject = StyleSheet.flatten(style);
    } else {
      styleObject = style;
    }
  }

  const { color: styleColor, ...finalStyle } = styleObject;

  let finalColor: Color = DEFAULT_COLOR;
  if (color === undefined) {
    if (styleColor !== undefined) finalColor = styleColor;
  } else {
    finalColor = color;
  }

  const extraProps = {
    height: size,
    width: size,
    fill: finalColor,
    style: finalStyle
  };

  const props: FontAwesomeIconProps<any> = {
    icon,
    mask,
    size,
    transform
  };
  const updatedProps = Object.assign({}, props, extraProps);
  return convert(React.createElement, abstract[0], updatedProps);
}

FontAwesomeIcon.displayName = 'FontAwesomeIcon';
