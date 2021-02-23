import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { useCallbackOne } from 'use-memo-one';
import type { DateTime } from 'luxon';
import { Calendar, CalendarProps } from './Calendar';
import type { CalendarMethods, ViewStyleProp } from './types';

export type CalendarSheetProps = {
  scrollEnabled?: boolean;
  onDaySelectionChange?: CalendarProps['onDaySelectionChange'];
  // onScrollBeginDrag?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  // onTopReached?(): void;
} & ViewStyleProp;

export const CalendarSheet = ({
  style,
  onDaySelectionChange
}: CalendarSheetProps) => {
  // const [tagsState, updateTagsState] = useImmer(tags);ы
  // const [tagsRef, updateTags] = useImmerRef(tags, []);
  // const state = useRef(tags);
  const calendarRef = useRef<CalendarMethods>(null);

  // const onTagSelectionChanged = useCallbackOne(
  //   (
  //     data: FunctionParameters<
  //       BottomSheetTypes.Properties.Tags['onSelectionChanged']
  //     >[0]
  //   ) => {
  //     if (data !== undefined) {
  //       updateTags((draft) => {
  //         const tag = draft.get(data.id);
  //         if (tag !== undefined) tag.isSelected = data.isSelected;
  //       });

  //       // const result = updateTagsState(draft => {
  //       //   draft.get(data.id).isSelected = data.isSelected;
  //       //   draft.set(144, { label: 'Some string' });
  //       //   // const tag = draft.get(data.id);
  //       //   // if (tag !== undefined) {
  //       //   //   tag.isSelected = data.isSelected;
  //       //   // }
  //       //   return 10;
  //       // });

  //       const tag = tagsRef.current.get(data.id);
  //       if (tag !== undefined && onTagButtonPressed !== undefined) {
  //         onTagButtonPressed(tag);
  //       }
  //     }
  //   },
  //   [tagsRef, updateTags, onTagButtonPressed]
  // );

  const onDaySelect = useCallbackOne((day: DateTime) => {}, []);

  return (
    <View style={[styles.container, style]}>
      <Calendar
        style={styles.calendar}
        ref={calendarRef}
        selectionMode="singleDay"
        scrollMode="multipleMonths"
        scrollModeDeceleration="fast"
        // selectionMode="multipleDays"
        // initialCalendarYearAndMonth={{ year: 2020, month: 12 }}
        monthsBefore={12}
        monthsAfter={24}
        // monthsBefore={48}
        // monthsAfter={48}
        onDaySelectionChange={onDaySelectionChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'column-reverse'
    // backgroundColor: 'orange'
    backgroundColor: 'rgba(255, 255, 255, 1)'
    // backgroundColor: 'green'
  },
  calendar: {
    // marginTop: 8,
    // backgroundColor: 'orange'
    // width: '100%'
    // position: 'absolute'
  }
});
