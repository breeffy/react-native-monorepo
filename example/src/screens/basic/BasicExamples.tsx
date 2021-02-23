import React, { memo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { CalendarSheet } from '@breeffy/react-native-calendar';

interface ExampleScreenProps {
  title: string;
  type: 'FlatList' | 'SectionList' | 'ScrollView' | 'View';
  count?: number;
}

const createExampleScreen = ({ type, count = 25 }: ExampleScreenProps) =>
  memo(() => {
    //#region state
    const [
      enableContentPanningGesture,
      setEnableContentPanningGesture
    ] = useState(true);
    const [
      enableHandlePanningGesture,
      setEnableHandlePanningGesture
    ] = useState(true);
    //#endregion

    return (
      <View style={styles.container}>
        {/* <View
          style={{ width: 200, height: 200, backgroundColor: 'orange' }}
        ></View> */}
        <CalendarSheet
          scrollEnabled={false}
          onTextTagSelectionChange={(id, isSelected) => {}}
        />
        {/* <BigSquare /> */}
      </View>
    );
  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column-reverse'
    // backgroundColor: 'orange'
    // padding: 64
  },
  title: {
    fontSize: 46,
    lineHeight: 46,
    fontWeight: '800'
  },
  headerContainer: {
    paddingVertical: 24,
    backgroundColor: 'white'
  },
  buttonContainer: {
    marginBottom: 6
  }
});

export const FlatListExampleScreen = createExampleScreen({
  title: 'Selection Mode: One Day',
  type: 'FlatList'
});

export const ScrollViewExampleScreen = createExampleScreen({
  title: 'Title',
  type: 'ScrollView'
});

export const SectionListExampleScreen = createExampleScreen({
  title: 'Title',
  type: 'SectionList'
});

export const ViewExampleScreen = createExampleScreen({
  title: 'Title',
  type: 'View',
  count: 8
});
