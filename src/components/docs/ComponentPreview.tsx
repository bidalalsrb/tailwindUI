import { ReactNode, useCallback, useState } from 'react';
import { Button } from '@/components/ui';
import { cn } from '@/utils/cn';
import { tones, ToneKey, toneLabels } from '@/theme/tones';

const toneSoftClasses: Record<ToneKey, string> = {
  brand: 'border-brand-200 bg-brand-50 text-brand-600',
  navy: 'border-navy-200 bg-navy-50 text-navy-600',
  blue: 'border-blue-200 bg-blue-50 text-blue-600',
  green: 'border-green-200 bg-green-50 text-green-600',
  red: 'border-red-200 bg-red-50 text-red-600',
  brown: 'border-brown-200 bg-brown-50 text-brown-600',
};

const toneSwatchClasses: Record<ToneKey, string> = {
  brand: 'bg-brand-500',
  navy: 'bg-navy-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  red: 'bg-red-500',
  brown: 'bg-brown-500',
};

type TabKey = 'preview' | 'code';

export interface ComponentPreviewProps {
  id: string;
  title: string;
  description?: string;
  preview: (tone: ToneKey) => ReactNode;
  code: string;
  propsTable?: ReactNode;
  className?: string;
}

export function ComponentPreview({
  id,
  title,
  description,
  preview,
  code,
  propsTable,
  className,
}: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('preview');
  const [copied, setCopied] = useState(false);
  const [activeTone, setActiveTone] = useState<ToneKey>('brand');

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (error) {
      console.error('코드 복사에 실패했습니다.', error);
    }
  }, [code]);

  return (
    <article
      id={id}
      className={cn(
        'space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-card',
        className,
      )}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
          {description ? (
            <p className="text-sm text-slate-500">{description}</p>
          ) : null}
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={cn(
              'rounded-full px-4 py-1.5 transition',
              activeTab === 'preview'
                ? 'bg-brand-100 text-brand-600'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200',
            )}
          >
            미리보기
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={cn(
              'rounded-full px-4 py-1.5 transition',
              activeTab === 'code'
                ? 'bg-brand-100 text-brand-600'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200',
            )}
          >
            코드
          </button>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleCopy}
            className="whitespace-nowrap"
          >
            {copied ? '복사 완료!' : '코드 복사'}
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {tones.map((tone) => {
            const isActive = tone === activeTone;
            return (
              <button
                key={`${id}-${tone}`}
                type="button"
                aria-label={`${toneLabels[tone]} 색상`}
                onClick={() => setActiveTone(tone)}
                className={cn(
                  'inline-flex h-8 items-center gap-2 rounded-full border px-3 text-xs font-semibold transition',
                  isActive
                    ? toneSoftClasses[tone]
                    : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-100',
                )}
              >
                <span
                  className={cn(
                    'inline-flex size-4 rounded-full border border-white shadow',
                    toneSwatchClasses[tone],
                  )}
                />
                {toneLabels[tone]}
              </button>
            );
          })}
        </div>
        {activeTab === 'preview' ? (
          <div className="space-y-4">
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6">
              {preview(activeTone)}
            </div>
            {propsTable ? propsTable : null}
          </div>
        ) : (
          <pre className="max-h-[420px] overflow-auto rounded-2xl bg-slate-900 p-5 text-xs text-slate-100">
            <code>{code.trim()}</code>
          </pre>
        )}
      </div>
    </article>
  );
}
