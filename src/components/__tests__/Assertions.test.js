import * as fontawesome from '@fortawesome/fontawesome-svg-core';
import FontAwesomeIcon from '../FontAwesomeIcon';
import React from 'react';
import renderer from 'react-test-renderer';
import { AssertionError } from '../../assert';

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

fontawesome.library.add(faCoffee, faCircle);

beforeEach(() => {
  console.error = jest.fn();
});

afterEach(() => {
  console.error.mockRestore();
});

describe('test assertions in FontAwesomeIcon component', () => {
  describe('when height or width props are specified without a size prop', () => {
    test('assertion error is thrown', () => {
      let catchedAssertionError = false;
      try {
        renderer
          .create(<FontAwesomeIcon icon={faCoffee} height={32} width={32} />)
          .toJSON();
      } catch (error) {
        if (error instanceof AssertionError) {
          catchedAssertionError = true;
        }
      }

      expect(catchedAssertionError).toBe(true);
    });
  });

  describe('when height or width props are specified WITH a size prop', () => {
    test('assertion error is thrown', () => {
      let catchedAssertionError = false;
      try {
        renderer
          .create(
            <FontAwesomeIcon icon={faCoffee} size={64} height={32} width={32} />
          )
          .toJSON();
      } catch (error) {
        if (error instanceof AssertionError) {
          catchedAssertionError = true;
        }
      }

      expect(catchedAssertionError).toBe(true);
    });
  });

  describe('when extra props are given', () => {
    test('assertion error is thrown', () => {
      console.error('fuck');
      let catchedAssertionError = false;
      try {
        renderer
          .create(<FontAwesomeIcon icon={faCoffee} color="purple" foo="bar" />)
          .toJSON();
      } catch (error) {
        if (error instanceof AssertionError) {
          catchedAssertionError = true;
        }
      }

      expect(catchedAssertionError).toBe(true);
    });
  });
});
