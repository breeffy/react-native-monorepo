import React from 'react';
import convert from '../converter';
import { StyleSheet } from 'react-native';
import {
  icon as makeIcon,
  parse,
  findIconDefinition
} from '@fortawesome/fontawesome-svg-core';
import { invariant } from '@breeffy/invariants';
import { isObjectHasDefinedProperty } from '../types';
import type { ViewStyle } from 'react-native';
import type { Styles, Color, NumberProp } from 'react-native-svg';
import type {
  IconProp,
  Transform,
  IconLookup,
  IconPrefix,
  IconName
} from '@fortawesome/fontawesome-svg-core';
import type { ExtraProps } from '../converter';
import type { Key } from '../types';

export const DEFAULT_SIZE = 16;
export const DEFAULT_COLOR = '#000';
export const DEFAULT_SECONDARY_OPACITY = 0.4;

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

export interface IconProps {
  icon: IconProp;
  style?: Styles | Styles[];
  size?: number;
  color?: Color;
  secondaryColor?: Color;
  secondaryOpacity?: NumberProp;
  mask?: IconProp;
  transform?: string | Transform;
  testID?: ViewStyle['testID'];
}

export const Icon = ({
  icon,
  mask,
  style = {},
  size = DEFAULT_SIZE,
  color,
  secondaryColor,
  secondaryOpacity = DEFAULT_SECONDARY_OPACITY,
  transform,
  testID,
  ...otherProps
}: IconProps): JSX.Element | null => {
  // Here we test essential invariants
  invariant(
    typeof icon !== undefined,
    `[ERROR]: property "icon" is required, but it is: ${icon}`
  );
  invariant(
    Object.getOwnPropertyNames(otherProps).length === 0,
    `[ERROR]: properties [${Object.getOwnPropertyNames(
      otherProps
    )}] are not supported`
  );

  const iconLookup: IconLookup = normalizeIconArgs(icon);

  invariant(
    findIconDefinition(iconLookup) !== undefined,
    `[ERROR]: can't find icon definition for [${iconLookup.prefix}, ${iconLookup.iconName}]`
  );

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

  invariant(
    renderedIcon !== undefined || renderedIcon !== null,
    `[ERROR]: icon for [${
      (iconLookup.prefix, iconLookup.iconName)
    }] is undefined or null`
  );

  const { abstract } = renderedIcon;

  let styleObject: Styles = {};
  if (typeof style === 'object') {
    if (Array.isArray(style)) {
      styleObject = StyleSheet.flatten<Styles>(style as Styles[]);
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

  let finalSecondaryColor: Color =
    secondaryColor === undefined ? finalColor : secondaryColor;

  const extraProps: ExtraProps = {
    height: size,
    width: size,
    fill: finalColor,
    secondaryFill: finalSecondaryColor,
    secondaryOpacity: secondaryOpacity,
    style: finalStyle
  };

  const props: IconProps = {
    icon,
    mask,
    size,
    transform
  };
  const updatedProps = Object.assign({}, props, extraProps);
  return convert(React.createElement, abstract[0], updatedProps);
};
