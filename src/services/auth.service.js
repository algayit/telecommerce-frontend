import API from "api/axios.config";

class AuthService {
  async login(email, password) {
    const { data } = await API.post("/auth/login", {
      email,
      password,
    });
    return data;
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
  }

  checkToken(token, email) {
    return API.post("auth/check-token", {
      token,
      email,
    });
  }
  
  register(username, email, password) {
    return API.post("auth/signup", {
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    return API.get("/users/profile");
  }
}

export default new AuthService();
