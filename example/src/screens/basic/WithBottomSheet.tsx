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

export const WithBottomSheet = () => {
  const [contentHeight, setContentHeight] = useState(0);
  const snapPoints = useMemo(() => [contentHeight], [contentHeight]);
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
          label="Present"
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
          activeOffsetY={[-20, 20]}
        >
          <BottomSheetView onLayout={handleOnLayout}>
            <CalendarSheet />
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
