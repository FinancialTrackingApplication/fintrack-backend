export default () => ({
  app: {
    port: parseInt(process.env.APP_PORT as string, 10) || 3000,
    env: process.env.NODE_ENV || 'production',
    workspaceEnv: process.env.WORKSPACE_ENV || 'development',
  },
  database: {
    url: process.env.MONGODB_URL,
  },
  passwordSettings: {
    saltLength: parseInt(process.env.PASSWORD_SALT_LENGTH as string, 10),
    iterations: parseInt(process.env.PASSWORD_ITERATIONS as string, 10),
    keyLength: parseInt(process.env.PASSWORD_KEY_LENGTH as string, 10),
    algorithm: process.env.PASSWORD_ALGORITHM,
    saltInjectPosition: parseInt(process.env.PASSWORD_SALT_INJECT_POSITION as string, 10),
  },
  google: {
    mailing: {
      appPassword: process.env.GOOGLE_EMAIL_APP_PASSWORD,
    },
  },
})
