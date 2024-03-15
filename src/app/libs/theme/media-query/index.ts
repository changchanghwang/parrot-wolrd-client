const breakpoints = [1902, 1366, 1024, 768, 425] as const;
type Breakpoints = typeof breakpoints[number];

export const mq = breakpoints.map((bp: Breakpoints) => `@media (max-width: ${bp}px)`);
