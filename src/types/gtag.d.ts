
// Google Analytics gtag type declarations
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'set' | 'get',
      targetId: string | object,
      config?: object
    ) => void;
  }
}

export {};
