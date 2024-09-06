import { AuthProvider } from "@refinedev/core";

const authCredentials = [
  {
    email: "admin@gmail.com",
    password: "admin@123",
    role: "admin"
  },
  {
    email: "user@gmail.com",
    password: "user@123",
    role: "user"
  },
  {
    email: "manager@gmail.com",
    password: "manager@123",
    role: "manager"
  }
];

const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const user = authCredentials.find(
      (user) => user.email === email && user.password === password
    );

    // console.log("user",user)
    
    if (user) {
      localStorage.setItem("auth", JSON.stringify(user));
      localStorage.setItem('role',user.role)
      localStorage.setItem('roleFit','true')
      return {
        success: true,
        redirectTo: "/",
      };
     
    }
    
    return {
      success: false,
      error: {
        message: "Invalid login!",
        name: "Invalid Email or Password",
      },
    };
  },
  logout: async () => {
    localStorage.removeItem("auth");
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }
    return { error };
  },
  check: async () => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      return { authenticated: true };
    }
    return {
      authenticated: false,
      error: {
        message: "Check failed!",
        name: "Not authenticated",
      },
      logout: true,
      redirectTo: "/login",
    };
  },
  getIdentity: async () => {
    const auth = localStorage.getItem("auth");
 
    if (auth) {
      const { email, role } = JSON.parse(auth);
      return {
        id: email,
        name: email.split('@')[0],
        role, 
        avatar: "string", 
      };
    }
    return null;
  },
  getPermissions: async () => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      const { role } = JSON.parse(auth);
      return role;
    }
    return null;
  },
};
export default authProvider;
