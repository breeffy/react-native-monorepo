import React from 'react';
import { StyleSheet } from 'react-native';
import renderer from 'react-test-renderer';
import * as fontawesome from '@fortawesome/fontawesome-svg-core';
import { Icon } from '..';
import { DEFAULT_SIZE, DEFAULT_SECONDARY_OPACITY } from '../components/Icon';

jest.spyOn(React, 'createElement');

const faCoffee = {
  prefix: 'fas',
  iconName: 'coffee',
  icon: [
    640,
    512,
    [],
    'f0f4',
    'M192 384h192c53 0 96-43 96-96h32c70.6 0 128-57.4 128-128S582.6 32 512 32H120c-13.3 0-24 10.7-24 24v232c0 53 43 96 96 96zM512 96c35.3 0 64 28.7 64 64s-28.7 64-64 64h-32V96h32zm47.7 384H48.3c-47.6 0-61-64-36-64h583.3c25 0 11.8 64-35.9 64z'
  ]
};

const faCircle = {
  prefix: 'fas',
  iconName: 'circle',
  icon: [
    640,
    512,
    [],
    'f0f4',
    'M192 384h192c53 0 96-43 96-96h32c70.6 0 128-57.4 128-128S582.6 32 512 32H120c-13.3 0-24 10.7-24 24v232c0 53 43 96 96 96zM512 96c35.3 0 64 28.7 64 64s-28.7 64-64 64h-32V96h32zm47.7 384H48.3c-47.6 0-61-64-36-64h583.3c25 0 11.8 64-35.9 64z'
  ]
};

const faAcorn = {
  prefix: 'fad',
  iconName: 'acorn',
  icon: [
    640,
    512,
    [],
    'f0f4',
    [
      'M32 256h384a258.87 258.87 0 0 1-143.11 231.55L224 512l-48.89-24.45A258.87 258.87 0 0 1 32 256z',
      'M448 160v32a32 32 0 0 1-32 32H32a32 32 0 0 1-32-32v-32a96 96 0 0 1 96-96h106a132.41 132.41 0 0 1 29.41-58.64 15.7 15.7 0 0 1 11.31-5.3 15.44 15.44 0 0 1 12 4.72L266 16.1a16 16 0 0 1 .66 21.9 84.32 84.32 0 0 0-15.16 26H352a96 96 0 0 1 96 96z'
    ]
  ]
};

const blueHex = '0000ff';
const redHex = 'ff0000';

function rgbToHex(r, g, b) {
  return [r, g, b]
    .map(c => {
      const hex = c.toString(16);
      return hex.length == 1 ? `0${hex}` : hex;
    })
    .join('');
}

function decimalToHex(decimal) {
  return decimal.toString(16).substr(2, 6);
}

// react-native-svg changed the way it uses the `fill` attribute across versions. Older versions
// return [_, r, g, b, _] (where 0 <= {r,g,b} <= 1), while other versions return arrays, and even
// scalar values... We, much like the Borg, will adapt.
function getActualFillColorHex(element) {
  const fillProp = element.props.fill;
  if (!Array.isArray(fillProp)) {
    // rn-svg v11 use a simple sclar value, representing the decimal value of the color
    // @link https://github.com/react-native-community/react-native-svg/blob/v11.0.1/__tests__/__snapshots__/css.test.tsx.snap
    // https://github.com/react-native-community/react-native-svg/blob/v12.1.0/__tests__/__snapshots__/css.test.tsx.snap#L158
    return decimalToHex(fillProp);
  } else if (fillProp.length === 5) {
    // rn-svg <= v8 return an array [_, r, g, b, _], where {rgb} are in the range of {0,1}
    // @note no links provided because rn-svg didn't include any tests in those versions
    return rgbToHex(fillProp[1] * 255, fillProp[2] * 255, fillProp[3] * 255);
  } else if (fillProp.length === 2) {
    // rn-svg v9, and v10 return an array with shape [_, DECIMAL_COLOR]
    // @link https://github.com/react-native-community/react-native-svg/blob/v9.14.0/__tests__/__snapshots__/css.test.tsx.snap#L159
    // @link https://github.com/react-native-community/react-native-svg/blob/v10.1.0/__tests__/__snapshots__/css.test.tsx.snap#L159
    return decimalToHex(fillProp[1]);
  }

  return null;
}

fontawesome.library.add(faCoffee, faCircle, faAcorn);

test.skip('renders with icon specified as array', () => {
  const tree = renderer.create(<Icon icon={['fas', 'coffee']} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test.skip('renders with icon object prop', () => {
  const tree = renderer.create(<Icon icon={faCoffee} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test.skip('renders with mask and transform', () => {
  const tree = renderer
    .create(
      <Icon icon={faCircle} mask={faCoffee} transform='shrink-9 right-4' />
    )
    .toJSON();
  // modify the clipPath and mask identifiers to be fixed, so they aren't regenerated each time and thus
  // our snapshot will remain stable across test runs
  const maskId = 'mask-1';
  const clipId = 'clip-1';

  // clip id
  tree.children[0].children[0].children[0].props.name = clipId;
  tree.children[0].children[1].props.clipPath = clipId;

  // mask id
  tree.children[0].children[0].children[1].props.name = maskId;
  tree.children[0].children[1].props.mask = maskId;

  // remove the clipPath prop, if present, to normalize the shape across versions of react-native-svg.
  // in version ^7.1.2, there was a clipRule prop here. in version ^8.0.8 there's not.
  // normalizing this lets us match more fuzzily and have this same test work in both version scenarios.
  tree.children[0].children[1].props = {
    ...tree.children[0].children[1].props,
    clipRule: undefined
  };

  expect(tree).toMatchSnapshot();
});

test.skip('renders transform equivalently when assigning prop as string or object', () => {
  const firstTree = renderer
    .create(<Icon icon={faCoffee} transform='shrink-9 right-4' />)
    .toJSON();
  expect(firstTree).toMatchSnapshot();

  const secondTree = renderer
    .create(
      <Icon
        icon={faCoffee}
        transform={fontawesome.parse.transform('shrink-9 right-4')}
      />
    )
    .toJSON();
  expect(secondTree).toMatchObject(firstTree);
});

describe('color', () => {
  describe('when color is given in StyleSheet and NO color prop', () => {
    test('assigns StyleSheet color to fill and removes style.color', () => {
      const styles = StyleSheet.create({
        icon: {
          color: 'blue'
        }
      });
      const tree = renderer
        .create(<Icon icon={faCoffee} style={styles.icon} />)
        .toJSON();
      expect(tree.props.fill).toEqual('blue');
      expect(tree.props.style.filter(s => s.color === 'blue').length).toEqual(
        0
      );
    });
    describe('when other style properties are also given', () => {
      test('the non-color style properties are passed through, though the color style property is not', () => {
        const styles = StyleSheet.create({
          icon: {
            color: 'blue',
            backgroundColor: 'yellow'
          }
        });
        const tree = renderer
          .create(<Icon icon={faCoffee} style={styles.icon} />)
          .toJSON();
        expect(
          tree.props.style.filter(s => s.backgroundColor === 'yellow').length
        ).toEqual(1);
        expect(tree.props.style.filter(s => s.color === 'blue').length).toEqual(
          0
        );
      });
    });
  });
  describe('when color prop is given and NO style.color is given', () => {
    test('renders with color given in color prop', () => {
      const tree = renderer
        .create(<Icon icon={faCoffee} color={'purple'} />)
        .toJSON();
      expect(tree.props.fill).toEqual('purple');
      expect(tree.props.tintColor).toBeUndefined();
      const path = tree.children[0].children.find(c => c.type === 'RNSVGPath');

      // A fill of [2] on an RNSVGPath would correspond to fill="currentColor".
      // react-native-svg seems to have sort of handling of currentColor, but it doesn't seem to accomplish
      // what we want, so our component's convert() should be stripping out any fill="currentColor" that the
      // fontawesome-svg-core adds to the elements it renders.
      expect(path.props.fill).not.toEqual([2]);
    });
  });
  describe('when color is specified both by a color prop AND StyleSheet', () => {
    test('color prop overrides style.color', () => {
      const tree = renderer
        .create(
          <Icon icon={faCoffee} color={'blue'} style={{ color: 'red' }} />
        )
        .toJSON();
      expect(tree.props.fill).toEqual('blue');
      expect(tree.props.tintColor).toBeUndefined();
      const path = tree.children[0].children.find(c => c.type === 'RNSVGPath');
      expect(path.fill).toBeUndefined();
    });
  });
});

describe('size', () => {
  describe('when no size, width, or height props are specified', () => {
    test('default size is assigned', () => {
      const tree = renderer.create(<Icon icon={faCoffee} />).toJSON();
      expect(tree.props.height).toEqual(DEFAULT_SIZE);
      expect(tree.props.width).toEqual(DEFAULT_SIZE);
    });
  });
  describe('when only a size prop is specified', () => {
    test('the given size is assigned', () => {
      const tree = renderer.create(<Icon icon={faCoffee} size={32} />).toJSON();
      expect(tree.props.height).toEqual(32);
      expect(tree.props.width).toEqual(32);
    });
  });
});

describe('exception', () => {
  let originalError = null;

  beforeEach(() => {
    originalError = console.error;
    console.error = jest.fn();
  });
  afterEach(() => {
    console.error = originalError;
  });

  describe('when height or width props are specified without a size prop', () => {
    test('invariant exception is thrown', () => {
      expect(() => {
        renderer
          .create(<Icon icon={faCoffee} height={32} width={32} />)
          .toJSON();
      }).toThrowError('invariant');
    });
  });
  describe('when height or width props are specified with a size prop', () => {
    test('invariant exception is thrown', () => {
      expect(() => {
        renderer
          .create(<Icon icon={faCoffee} size={64} height={32} width={32} />)
          .toJSON();
      }).toThrowError('invariant');
    });
  });
  describe('when extra props are given', () => {
    test('invariant exception is thrown', () => {
      expect(() => {
        renderer
          .create(<Icon icon={faCoffee} color='purple' foo='bar' />)
          .toJSON();
      }).toThrowError('invariant');
    });
  });
});

describe('convert focusable attribute', () => {
  test('no title leads to focusable false', () => {
    const tree = renderer.create(<Icon icon={faCoffee} />).toJSON();

    React.createElement.mock.calls
      .map(([_c, attrs, _children]) => attrs)
      .filter(attrs => 'focusable' in attrs)
      .forEach(({ focusable }) => {
        expect(focusable).toEqual(false);
      });
  });
});

describe('when style is given an array and not an object', () => {
  test('it uses the style objects in array', () => {
    const tree = renderer
      .create(
        <Icon
          icon={faCoffee}
          style={[{ color: 'red' }, { backgroundColor: 'yellow' }]}
        />
      )
      .toJSON();
    expect(tree.props.style.filter(s => s.color === 'red').length).toEqual(0);
    expect(
      tree.props.style.filter(s => s.backgroundColor === 'yellow').length
    ).toEqual(1);
  });
});

describe('duotone support', () => {
  describe('when NO secondary color or opacity are given', () => {
    test('use the primary color at 40% opacity as the secondary color', () => {
      const styles = StyleSheet.create({
        icon: {
          color: 'blue'
        }
      });
      const tree = renderer
        .create(<Icon icon={faAcorn} style={styles.icon} />)
        .toJSON();
      const primaryLayer = tree.children[0].children[0].children[1];
      const secondaryLayer = tree.children[0].children[0].children[0];
      expect(getActualFillColorHex(primaryLayer)).toEqual(blueHex);
      expect(secondaryLayer.props.fillOpacity).toEqual(0.4);
    });
  });
  describe('when secondary opacity was given, but NO secondary color is given', () => {
    test('use the primary color with the secondary opacity given', () => {
      const styles = StyleSheet.create({
        icon: {
          color: 'blue'
        }
      });
      const tree = renderer
        .create(
          <Icon icon={faAcorn} style={styles.icon} secondaryOpacity={0.123} />
        )
        .toJSON();
      const primaryLayer = tree.children[0].children[0].children[1];
      const secondaryLayer = tree.children[0].children[0].children[0];
      expect(getActualFillColorHex(primaryLayer)).toEqual(blueHex);
      expect(secondaryLayer.props.fillOpacity).toEqual(0.123);
    });
  });
  describe('when secondary color is given, but no secondary opacity', () => {
    test('use the given secondary color, with default secondary opacity', () => {
      const styles = StyleSheet.create({
        icon: {
          color: 'blue'
        }
      });
      const tree = renderer
        .create(
          <Icon icon={faAcorn} style={styles.icon} secondaryColor={'red'} />
        )
        .toJSON();
      const secondaryLayer = tree.children[0].children[0].children[0];
      expect(getActualFillColorHex(secondaryLayer)).toEqual(redHex);
      expect(secondaryLayer.props.fillOpacity).toEqual(
        DEFAULT_SECONDARY_OPACITY
      );
    });
  });
  describe('when secondary color and secondary opacity are given', () => {
    test('use both the given secondary color and opacity', () => {
      const styles = StyleSheet.create({
        icon: {
          color: 'blue'
        }
      });
      const tree = renderer
        .create(
          <Icon
            icon={faAcorn}
            style={styles.icon}
            secondaryColor={'red'}
            secondaryOpacity={0.123}
          />
        )
        .toJSON();
      const secondaryLayer = tree.children[0].children[0].children[0];
      expect(getActualFillColorHex(secondaryLayer)).toEqual(redHex);
      expect(secondaryLayer.props.fillOpacity).toEqual(0.123);
    });
  });
});

export {};
