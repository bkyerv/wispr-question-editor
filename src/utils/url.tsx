export const url =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_SERVER_URL_PROD
    : import.meta.env.VITE_SERVER_URL_DEV;
