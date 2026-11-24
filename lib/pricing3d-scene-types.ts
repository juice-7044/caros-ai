export type PricingSceneCapability = 'platform' | 'marketing' | 'sales' | 'communication' | 'reactivation' | 'automation' | 'service' | 'reputation' | 'community';
export interface PricingSceneProps {
  capability: PricingSceneCapability;
  paused?: boolean;
  dissolve?: boolean;
  onReady?: () => void;
  onError?: (message: string) => void;
  onInteraction?: (kind: 'dissolve' | 'rotate' | 'reassemble') => void;
}
