const ACCESS_TOKEN_KEY = "mega-moveis:access-token";
const ACCESS_TOKEN_EVENT = "access-token-changed";

export function setAccessToken(token: string) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
  window.dispatchEvent(new Event(ACCESS_TOKEN_EVENT));
}

export function getAccessToken() {
  if (typeof window === "undefined") return null;

  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function removeAccessToken() {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.dispatchEvent(new Event(ACCESS_TOKEN_EVENT));
}

export { ACCESS_TOKEN_EVENT };
