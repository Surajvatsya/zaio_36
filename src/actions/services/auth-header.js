import authService from "./auth.service";

export default function authHeader() {
    const user = authService.getCurrentUser();
    if (user && user.token){
      // for Node.js Express back-end
      return { 'auth-token': user.token };
    } else {
      return null;
    }
  }