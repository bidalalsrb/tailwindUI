import { useMemo, useState } from 'react';
import { cn } from '@/utils/cn';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
type AvatarStatus = 'online' | 'offline' | 'away';

const sizeStyles: Record<AvatarSize, { wrapper: string; text: string; indicator: string }> = {
  sm: { wrapper: 'size-8', text: 'text-xs', indicator: 'size-2' },
  md: { wrapper: 'size-10', text: 'text-sm', indicator: 'size-2.5' },
  lg: { wrapper: 'size-14', text: 'text-base', indicator: 'size-3' },
  xl: { wrapper: 'size-16', text: 'text-lg', indicator: 'size-3.5' },
};

const statusStyles: Record<AvatarStatus, string> = {
  online: 'bg-green-500',
  offline: 'bg-slate-300',
  away: 'bg-brown-400',
};

export interface AvatarProps {
  name?: string;
  src?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  className?: string;
  rounded?: 'lg' | 'full';
}

function getInitials(name?: string) {
  if (!name) return 'U';
  const [first, second] = name.split(' ');
  if (!second) {
    return first.slice(0, 2).toUpperCase();
  }
  return `${first[0]}${second[0]}`.toUpperCase();
}

export function Avatar({
  name,
  src,
  size = 'md',
  status,
  className,
  rounded = 'full',
}: AvatarProps) {
  const [broken, setBroken] = useState(false);
  const initials = useMemo(() => getInitials(name), [name]);
  const sizeClass = sizeStyles[size] ?? sizeStyles.md;

  return (
    <span
      className={cn(
        'relative inline-flex items-center justify-center border border-slate-200 bg-slate-100 font-medium text-slate-600',
        sizeClass.wrapper,
        rounded === 'full' ? 'rounded-full' : 'rounded-2xl',
        className,
      )}
    >
      {src && !broken ? (
        <img
          src={src}
          alt={name}
          className={cn(
            'size-full object-cover',
            rounded === 'full' ? 'rounded-full' : 'rounded-2xl',
          )}
          onError={() => setBroken(true)}
        />
      ) : (
        <span className={cn('uppercase', sizeClass.text)}>{initials}</span>
      )}
      {status ? (
        <span
          className={cn(
            'absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-white shadow',
            sizeClass.indicator,
            statusStyles[status],
          )}
        />
      ) : null}
    </span>
  );
}

export interface AvatarGroupProps {
  items: Array<Pick<AvatarProps, 'name' | 'src'>>;
  max?: number;
  size?: AvatarSize;
}

export function AvatarGroup({ items, max = 4, size = 'sm' }: AvatarGroupProps) {
  const visible = items.slice(0, max);
  const remainder = items.length - visible.length;
  const sizeClass = sizeStyles[size] ?? sizeStyles.sm;

  return (
    <div className="flex items-center -space-x-2">
      {visible.map((item, index) => (
        <Avatar
          key={`${item.src}-${item.name}-${index}`}
          size={size}
          {...item}
        />
      ))}
      {remainder > 0 ? (
        <span
          className={cn(
            'inline-flex items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-500',
            sizeClass.wrapper,
          )}
        >
          +{remainder}
        </span>
      ) : null}
    </div>
  );
}
