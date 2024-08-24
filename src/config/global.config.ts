import { registerAs } from '@nestjs/config';

const {
  NODE_ENV,
  ENV_EMOJI,
  PORT,
  SHA_512_HASH,
  JWT_SECRET_KEY,
  EMAIL_USER,
  EMAIL_SECURE,
  EMAIL_PORT,
  EMAIL_PASSWORD,
  EMAIL_HOST,
  ORG_NAME,
  OTP_DIGITS,
  OTP_TTL_SECONDS,
  OTP_TTL_WINDOW,
  GOOGLE_API,
  GOOGLE_API_KEY,
  REDIS_PORT,
  REDIS_HOST,
} = process.env;

export const get_global_config_name = () => 'App';

export default registerAs(get_global_config_name(), () => ({
  node_env: NODE_ENV,
  env_emoji: ENV_EMOJI,
  port: PORT || 10001,
  sha_hash: SHA_512_HASH,
  jwt_secret: JWT_SECRET_KEY,
  email_user: EMAIL_USER,
  email_secure: EMAIL_SECURE,
  email_port: EMAIL_PORT,
  email_pass: EMAIL_PASSWORD,
  email_host: EMAIL_HOST,
  org_name: ORG_NAME,
  google_api: GOOGLE_API,
  google_api_key: GOOGLE_API_KEY,
  otp_digits: OTP_DIGITS || 4,
  otp_ttl_seconds: 60 * 60,
  otp_window: OTP_TTL_WINDOW || 10,
  redis_host: REDIS_HOST,
  redis_port: REDIS_PORT,
}));
