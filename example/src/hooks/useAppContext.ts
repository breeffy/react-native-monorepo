import { useContext } from 'react';
import { AppContext } from '../contexts/internal';

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === null) {
    throw new Error(
      "Internal context cannot be null, please add 'Provider' to the root component."
    );
  }

  return context;
};
