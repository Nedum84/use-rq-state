type Props = {
  BASE_URL: string;
};

const appConfig: Props = {
  BASE_URL: import.meta.env.VITE_BASE_URL,
};

export default appConfig;
