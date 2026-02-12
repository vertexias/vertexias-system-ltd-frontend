// utils/config.ts
export const config = {
  admin: {
    username: import.meta.env.VITE_ADMIN_USERNAME,
    password: import.meta.env.VITE_ADMIN_PASSWORD,
    path: import.meta.env.VITE_ADMIN_PATH,
  },
} as const;