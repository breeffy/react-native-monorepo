export type AppStackParamsList = {
  Showcase: undefined;
  // basic
  ['SingleDaySelectionMode']: undefined;
  ['MultipleDaysSelectionMode']: undefined;
  ['OneMonthScrollMode']: undefined;
  ['MultipleMonthsScrollMode']: undefined;
  ['AnyOffsetScrollMode']: undefined;
  ['ModalBottomSheet']: undefined;

  // modal
  ['Modal/SimpleExample']: undefined;
  ['Modal/BackdropExample']: undefined;
  ['Modal/StackExample']: undefined;
  ['Modal/DynamicSnapPointExample']: undefined;

  // advanced
  ['Advanced/NavigatorExample']: undefined;
  ['Advanced/CustomHandleExample']: undefined;
  ['Advanced/CustomBackgroundExample']: undefined;
  ['Advanced/BackdropExample']: undefined;
  ['Advanced/MapExample']: undefined;
  ['Advanced/DynamicSnapPointExample']: undefined;
  ['Advanced/ViewPagerExample']: undefined;
};

export type Contact = {
  name: string;
  jobTitle: string;
  address: string;
};

export type Location = {
  id: string;
  name: string;
  address: string;
  photos: string[];
};
