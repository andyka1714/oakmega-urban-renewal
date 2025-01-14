export const loadFacebookSDK = (): Promise<void> => {
  return new Promise<void>((resolve) => {
    if (window.FB) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.fbAsyncInit = () => {
        FB.init({
          appId: "9989369141080048",
          xfbml: true,
          version: "v21.0",
        });
        resolve();
      };
    };
    document.body.appendChild(script);
  });
}  
  
export const loadGoogleSDK = (): Promise<void> => {
  return new Promise<void>((resolve) => {
    if (window.google && window.google.accounts) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
};  