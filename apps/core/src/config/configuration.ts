export default () => ({
  app: {
    port: parseInt(process.env.APP_PORT as string, 10) || 3000,
    env: process.env.NODE_ENV || 'production',
    workspaceEnv: process.env.WORKSPACE_ENV || 'development',
  },
  database: {
    url: process.env.MONGODB_URL,
  },
  cors: {
    methods: ['GET', 'POST', 'OPTION'],
    origin: '0.0.0.0',
  },
  auth: {
    antiCsrfHeader: process.env.ANTI_CSRF_HEADER,
    jwtSecret: process.env.JWT_SECRET,
    cookieSecret: process.env.COOKIE_SECRET,
  },
  cookie: {
    baseConfig: {
      secure: 'auto',
      signed: true,
      maxAge: 7 * 24 * 3600 * 1000,
    },
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
