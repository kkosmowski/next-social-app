import { useCallback, useState } from 'react';

type UseBooleanReturnValue = [boolean, { set: VoidFunction; unset: VoidFunction; toggle: VoidFunction }];

function useBoolean(initialValue: boolean): UseBooleanReturnValue {
  const [isOn, setIsOn] = useState(initialValue);

  const set = useCallback(() => {
    setIsOn(true);
  }, [setIsOn]);

  const unset = useCallback(() => {
    setIsOn(false);
  }, [setIsOn]);

  const toggle = useCallback(() => {
    setIsOn((value) => !value);
  }, [setIsOn]);

  return [isOn, { set, unset, toggle }];
}

export default useBoolean;
