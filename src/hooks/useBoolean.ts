import { useCallback, useState } from 'react';

type UseBooleanReturnValue = [
  boolean,
  { set: VoidFunction; unset: VoidFunction; toggle: (callback?: (value: boolean) => void) => void },
];

function useBoolean(initialValue: boolean): UseBooleanReturnValue {
  const [isOn, setIsOn] = useState(initialValue);

  const set = useCallback(() => {
    setIsOn(true);
  }, [setIsOn]);

  const unset = useCallback(() => {
    setIsOn(false);
  }, [setIsOn]);

  const toggle = useCallback(
    (callback?: (value: boolean) => void) => {
      setIsOn((value) => {
        callback?.(!value);
        return !value;
      });
    },
    [setIsOn],
  );

  return [isOn, { set, unset, toggle }];
}

export default useBoolean;
