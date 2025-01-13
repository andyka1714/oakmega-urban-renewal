export {};

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: any) => void;
          }) => void;
          prompt: () => void;
        };
      };
    };
    fbAsyncInit: () => void;
    FB: typeof import('fb-sdk');
  }
  const FB: typeof import('fb-sdk');
}
