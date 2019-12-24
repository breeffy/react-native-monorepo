import React from 'react';
import convert from '../converter';
import PropTypes from 'prop-types';
import { Dimensions, ViewPropTypes } from 'react-native';
import { View, Text, StyleProp, ViewStyle } from 'react-native';
import { icon, parse } from '@fortawesome/fontawesome-svg-core';
import log from '../logger';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

export const DEFAULT_SIZE = 16;
export const DEFAULT_COLOR = '#000';

// Deprecated height and width defaults
const DEFAULT_HEIGHT = windowHeight * 0.1;
const DEFAULT_WIDTH = windowWidth * 0.1;

function objectWithKey(key, value) {
  return (Array.isArray(value) && value.length > 0) ||
    (!Array.isArray(value) && value)
    ? { [key]: value }
    : {};
}

function normalizeIconArgs(icon) {
  if (icon === null) {
    return null;
  }

  if (typeof icon === 'object' && icon.prefix && icon.iconName) {
    return icon;
  }

  if (Array.isArray(icon) && icon.length === 2) {
    return { prefix: icon[0], iconName: icon[1] };
  }

  if (typeof icon === 'string') {
    return { prefix: 'fas', iconName: icon };
  }
}

interface FontAwesomeIconProps<T> {
  style: StyleProp<ViewStyle> | {};
  size?: number;
  fill?: string;
  icon: object | string | T[] | null;
  mask: object | string | T[] | null;
  transform: object | string | null;
}

export default function FontAwesomeIcon({
  icon: iconArgs = null,
  mask: maskArgs = null,
  fill = DEFAULT_COLOR,
  style = {},
  size = DEFAULT_SIZE,
  transform = null
}: FontAwesomeIconProps<any>) {
  const transformObject =
    typeof transform === 'string' ? parse.transform(transform) : transform;
  const iconLookup = normalizeIconArgs(iconArgs);
  const mask = objectWithKey('mask', normalizeIconArgs(maskArgs));
  const renderedIcon = icon(iconLookup, {
    ...transformObject,
    ...mask
  });

  if (!renderedIcon) {
    log('ERROR: icon not found for icon = ', iconArgs);
    return null;
  }

  const { abstract } = renderedIcon;

  // FIXME Don't allow to use color property in style objects
  const extraProps = {
    height: size,
    width: size,
    fill: fill,
    style: style
  };

  const props: FontAwesomeIconProps<any> = {
    icon,
    mask,
    fill,
    style,
    size,
    transform
  };
  const updatedProps = Object.assign({}, props, extraProps);

  return convertCurry(abstract[0], updatedProps);
}

FontAwesomeIcon.displayName = 'FontAwesomeIcon';

const convertCurry = convert.bind(null, React.createElement);
