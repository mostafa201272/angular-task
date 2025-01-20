import { environment } from "../../environments/environment";

// BASE ENDPOINT
const auth = environment.auth;

/**
 * AUTH ENDPOINTS
 */
export const AUTH_ROUTES = {
  LOGIN : `${auth}/login/`,
  REGISTRATION : `${auth}/registration/`,
  PROFILE : `${auth}/profile/`,
};
