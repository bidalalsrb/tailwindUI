import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';
import { ToneKey } from '@/theme/tones';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  tone?: ToneKey;
  footer?: ReactNode;
}

const toneAccentMap: Record<ToneKey, string> = {
  brand: 'text-brand-600',
  navy: 'text-navy-600',
  blue: 'text-blue-600',
  green: 'text-green-600',
  red: 'text-red-600',
  brown: 'text-brown-600',
};

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  tone = 'brand',
  footer,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (typeof document === 'undefined' || !isOpen) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_40px_80px_-50px_rgba(15,23,42,0.45)]">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
          <div className="space-y-2">
            {title ? (
              <h3 className={cn('text-lg font-semibold text-slate-900', toneAccentMap[tone])}>
                {title}
              </h3>
            ) : null}
            {description ? <p className="text-sm text-slate-500">{description}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 transition hover:border-slate-300 hover:text-slate-600"
            aria-label="닫기"
          >
            ×
          </button>
        </div>
        <div className="px-6 py-5 text-sm text-slate-600">{children}</div>
        {footer ? <div className="border-t border-slate-100 bg-slate-50 px-6 py-4">{footer}</div> : null}
      </div>
    </div>,
    document.body,
  );
}

