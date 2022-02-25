import React from 'react';
import type { MutableRefObject } from 'react';

const useMounted = (): MutableRefObject<boolean> => {
  const isMounted = React.useRef(true);

  React.useEffect(
    () => (): void => {
      isMounted.current = false;
    },
    []
  );

  return isMounted;
};

export default useMounted;
