const auth = {
  isAuthenticated: false,
  signin(callback: VoidFunction) {
    auth.isAuthenticated = true;
    callback()
  },
  signup(callback: VoidFunction) {
    console.log(auth.isAuthenticated);
    auth.isAuthenticated = true;
    callback();
  },
  signout(callback: VoidFunction) {
    auth.isAuthenticated = false;
    callback();
  },
};

export { auth };
