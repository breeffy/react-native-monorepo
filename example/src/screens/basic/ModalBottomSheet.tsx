import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider
} from '@gorhom/bottom-sheet';
import { CalendarSheet } from '../../components/calendarSheet';
import { useContainerStyle } from './hooks';
import { Button, ButtonType } from '../../components/button';
import { BottomSheetHandle } from '../bottomsheet/BottomSheetHandle';
import type { CalendarMethods } from '@breeffy/react-native-calendar';

export const ModalBottomSheet = () => {
  const [contentHeight, setContentHeight] = useState(0);
  const snapPoints = useMemo(() => [contentHeight], [contentHeight]);

  const calendarSheetRef = useRef<CalendarMethods | null>(null);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handlePresentPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const handleDismissPress = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  const handleOnLayout = useCallback(
    ({
      nativeEvent: {
        layout: { height }
      }
    }) => {
      setContentHeight(height);
    },
    []
  );

  const containerStyle = useContainerStyle(styles.container);

  return (
    <View style={containerStyle}>
      <View style={styles.buttonGroup}>
        <Button
          label="Show"
          type={ButtonType.SECONDARY}
          style={styles.buttonContainer}
          onPress={handlePresentPress}
        />
        <Button
          label="Dismiss"
          type={ButtonType.SECONDARY}
          style={styles.buttonContainer}
          onPress={handleDismissPress}
        />
      </View>

      <BottomSheetModalProvider>
        {/* @ts-ignore */}
        <BottomSheetModal
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          handleComponent={BottomSheetHandle}
          waitFor={calendarSheetRef}
        >
          <BottomSheetView onLayout={handleOnLayout}>
            <CalendarSheet ref={calendarSheetRef} />
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  buttonGroup: {
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingHorizontal: 12
  },
  buttonContainer: {
    marginTop: 6
  }
});
