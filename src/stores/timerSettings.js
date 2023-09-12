import { writable } from 'svelte/store';

export const startTimerValue = writable(0);
export const timerNumber = writable(0);

export const timers = writable(0);

export const resetTimers = writable(0)
export const stopTimers = writable(0)