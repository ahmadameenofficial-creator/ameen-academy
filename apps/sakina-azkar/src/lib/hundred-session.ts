import type { Dhikr } from './types';

export const HUNDRED_TARGET = 100;
export const STAGE_SIZE = 10;

export function supportsHundredSession(entry: Dhikr): boolean {
  return (
    (entry.categoryId === 'morning' || entry.categoryId === 'evening') &&
    entry.counterKind === 'fixed' &&
    entry.repeat === HUNDRED_TARGET
  );
}

export function hundredProgress(value: number) {
  const count = Number.isSafeInteger(value) ? Math.max(0, Math.min(HUNDRED_TARGET, value)) : 0;
  return {
    count,
    remaining: HUNDRED_TARGET - count,
    completed: count === HUNDRED_TARGET,
    completedStages: Math.floor(count / STAGE_SIZE),
    stage: Math.min(10, Math.floor(count / STAGE_SIZE) + 1),
    withinStage: count === HUNDRED_TARGET ? STAGE_SIZE : count % STAGE_SIZE,
  };
}

export interface SessionPreferences {
  version: 1;
  hand: 'right' | 'left';
  haptics: boolean;
  keepAwake: boolean;
}

export const defaultSessionPreferences: SessionPreferences = {
  version: 1,
  hand: 'right',
  haptics: false,
  keepAwake: false,
};

export function parseSessionPreferences(raw: string | null): SessionPreferences {
  try {
    const value: unknown = JSON.parse(raw ?? 'null');
    if (!value || typeof value !== 'object' || !('version' in value) || value.version !== 1)
      return defaultSessionPreferences;
    const candidate = value as Partial<SessionPreferences>;
    return {
      version: 1,
      hand: candidate.hand === 'left' ? 'left' : 'right',
      haptics: candidate.haptics === true,
      keepAwake: candidate.keepAwake === true,
    };
  } catch {
    return defaultSessionPreferences;
  }
}
