'use client';

import { createContext, useCallback, useContext, useRef, useState } from 'react';

import type { PropsWithChildren } from '@/types/common';

import type { ConfirmationCallbacks, ConfirmationContextValues, ConfirmationData } from './types';
import ConfirmationModal from './ConfirmationModal';

const ConfirmationContext = createContext<ConfirmationContextValues>({
  ask: () => {},
});

function useConfirmation() {
  return useContext(ConfirmationContext);
}

function ConfirmationProvider({ children }: PropsWithChildren) {
  const [_data, setData] = useState<ConfirmationData | undefined>();
  const _onConfirm = useRef<VoidFunction | undefined>();
  const _onCancel = useRef<VoidFunction | undefined>();

  const ask = useCallback((data: ConfirmationData, { onConfirm, onCancel }: ConfirmationCallbacks) => {
    setData(data);
    _onConfirm.current = onConfirm;
    _onCancel.current = onCancel;
  }, []);

  const clearData = () => {
    setData(undefined);
    _onConfirm.current = undefined;
    _onCancel.current = undefined;
  };

  const confirm = useCallback(() => {
    _onConfirm.current?.();
    clearData();
  }, []);

  const cancel = useCallback(() => {
    _onCancel.current?.();
    clearData();
  }, []);

  return (
    <ConfirmationContext.Provider value={{ ask }}>
      {children}
      {!!_data && <ConfirmationModal data={_data} onConfirm={confirm} onCancel={cancel} />}
    </ConfirmationContext.Provider>
  );
}

export default ConfirmationProvider;
export { useConfirmation };
