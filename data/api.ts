import { env } from "@/env";

export function api(path: string, init?: RequestInit) {
  const baseUrl = env.NEXT_PUBLIC_API_BASE_URL;
  const apiPrefiix = "/api";
  const url = new URL(apiPrefiix.concat(path), baseUrl);

  return fetch(url, init);
}
