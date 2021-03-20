import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

interface WithBottomSheetProps {
  title: string;
  type: 'FlatList' | 'SectionList' | 'ScrollView' | 'View';
  count?: number;
}

export const WithBottomSheet = ({}: WithBottomSheetProps) => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // renders
  return (
    <View style={styles.container}>
      {/* @ts-ignore */}
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        // handleComponent={}
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column-reverse',
    padding: 24,
    backgroundColor: 'grey'
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center'
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
