import React, { useMemo } from 'react';
import Showcase from '@gorhom/showcase-template';
import { useNavigation } from '@react-navigation/native';
import { useSafeArea } from 'react-native-safe-area-context';
import { version, description } from '../../../package.json';

const data = [
  {
    title: 'Selection Mode',
    data: [
      {
        name: 'One Day',
        slug: 'Basic/FlatListExample',
      },
      {
        name: 'Multiple Days',
        slug: 'Basic/ScrollViewExample',
      },
    ],
  },
  {
    title: 'Pagination Mode',
    data: [
      {
        name: 'Enabled',
        slug: 'Basic/ViewExample',
      },
      {
        name: 'Disabled',
        slug: 'Basic/ScrollViewExample',
      },
    ],
  },
];

const RootScreen = () => {
  // hooks
  const { navigate } = useNavigation();
  const safeInsets = useSafeArea();

  // variables
  const author = useMemo(
    () => ({
      username: 'Victor Malov',
      url: 'https://github.com/breeffy/react-native-calendar',
    }),
    []
  );

  // callbacks
  const handleOnPress = (slug: string) => navigate(slug);

  // renders
  return (
    <Showcase
      theme="light"
      version={version}
      name="Calendar"
      description={description}
      author={author}
      data={data}
      safeInsets={safeInsets}
      handleOnPress={handleOnPress}
    />
  );
};

export default RootScreen;
