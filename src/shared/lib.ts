export const checkAuth = () => {
  const local = localStorage.getItem('auth');
  const session = sessionStorage.getItem('auth');

  return local || session ? true : false;
};

export const saveAuth = (remember: boolean) => {
  remember
    ? localStorage.setItem("auth", "true")
    : sessionStorage.setItem("auth", "true");
};

export const exit = () => {
  localStorage.removeItem('auth');
  sessionStorage.removeItem('auth');
};
