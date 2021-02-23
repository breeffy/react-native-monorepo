import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  cancelAnimation
} from 'react-native-reanimated';
import {
  State,
  PanGestureHandlerGestureEvent
} from 'react-native-gesture-handler';
import { snapPoint } from 'react-native-redash';
import type { GESTURE } from '../constants';

type InteractivePanGestureHandlerContextType = {
  lastAnimatedPosition: number;
};

export const usePanGestureHandler = (
  // @ts-ignore
  type: GESTURE,
  animatedPosition: Animated.SharedValue<number>,
  snapPoints: number[],
  animateToPoint: (point: number) => void
): [
  (event: PanGestureHandlerGestureEvent) => void,
  Animated.SharedValue<State>,
  Animated.SharedValue<number>,
  Animated.SharedValue<number>
] => {
  const gestureState = useSharedValue<State>(State.UNDETERMINED, false);
  const gestureTranslationX = useSharedValue(0, false);
  const gestureVelocityX = useSharedValue(0, false);

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    InteractivePanGestureHandlerContextType
  >({
    onStart: ({ state, translationX, velocityX }, context) => {
      // cancel current animation
      cancelAnimation(animatedPosition);

      // store current animated position
      context.lastAnimatedPosition = animatedPosition.value;

      // set variables
      gestureState.value = state;
      gestureTranslationX.value = translationX;
      gestureVelocityX.value = velocityX;
    },
    onActive: ({ state, translationX, velocityX }, context) => {
      gestureState.value = state;
      gestureTranslationX.value = translationX;
      gestureVelocityX.value = velocityX;

      animatedPosition.value = context.lastAnimatedPosition + translationX;
    },
    onEnd: ({ state }, context) => {
      gestureState.value = state;
      if (
        context.lastAnimatedPosition === snapPoints[snapPoints.length - 1] &&
        animatedPosition.value === snapPoints[snapPoints.length - 1]
      ) {
        return;
      }
      animateToPoint(
        snapPoint(
          gestureTranslationX.value + context.lastAnimatedPosition,
          gestureVelocityX.value,
          snapPoints
        )
      );
    }
  });

  return [gestureHandler, gestureState, gestureTranslationX, gestureVelocityX];
};
