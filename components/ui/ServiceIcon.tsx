import { Truck, Anchor, BatteryCharging, Lock } from 'lucide-react';
import type { IconKey } from '@/lib/services';
import { cn } from '@/lib/utils';

const REGISTRY = {
  flatbed: Truck,
  wrecker: Anchor,
  ev: BatteryCharging,
  locked: Lock,
} as const satisfies Record<IconKey, unknown>;

export function ServiceIcon({ name, className }: { name: IconKey; className?: string }) {
  const Icon = REGISTRY[name];
  return <Icon className={cn('size-8', className)} strokeWidth={1.6} aria-hidden="true" />;
}
