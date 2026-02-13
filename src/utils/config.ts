// utils/config.ts
export const config = {
  admin: {
    username: import.meta.env.VITE_ADMIN_USERNAME,
    password: import.meta.env.VITE_ADMIN_PASSWORD,
    path: import.meta.env.VITE_ADMIN_PATH,
  },
} as const;

// src/config/env.ts
export const API_URL = import.meta.env.VITE_API_URL ?? "";

if (!API_URL) {
  // keep it non-crashing in prod builds; but warn in dev
  if (import.meta.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.warn("NEXT_PUBLIC_API_URL is missing");
  }
}


