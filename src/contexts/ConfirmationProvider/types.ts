import type { TranslationKey } from '@/types/i18n';

export type ConfirmationData = {
  title: TranslationKey;
  description: TranslationKey;
  submitLabel?: TranslationKey;
  cancelLabel?: TranslationKey;
};

export type ConfirmationCallbacks = {
  onConfirm: VoidFunction;
  onCancel?: VoidFunction;
};

export type ConfirmationContextValues = {
  ask: (data: ConfirmationData, callbacks: ConfirmationCallbacks) => void;
};
