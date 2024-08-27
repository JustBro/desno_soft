"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsLoggedIn } from "@/store/auth-slice";
import { checkAuth, saveAuth } from "@/shared/lib";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button";
import "@/app/auth.scss";
import { Preloader } from "@/components/preloader/preloader";
import { setIsAuthChecked } from "@/store/ui-slice";
import { Checkbox, FormControlLabel, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Auth() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const isLoggedIn = useAppSelector((state) => state.authReducer.isLoggedIn);
  const isAuthChecked = useAppSelector(
    (state) => state.uiReducer.isAuthChecked
  );

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const auth = checkAuth();

    if (!isAuthChecked) {
      dispatch(setIsAuthChecked(true));
      dispatch(setIsLoggedIn(Boolean(auth)));
    }

    if (auth) {
      router.push("/requests/1");
    }
  }, [isLoggedIn]);

  const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const user1 = {
      login: "gavrilov",
      password: "111aaa",
    };

    const user2 = {
      login: "fedorov",
      password: "222bbb",
    };

    if (
      (login === user1.login && password === user1.password) ||
      (login === user2.login && password === user2.password)
    ) {
      dispatch(setIsLoggedIn(true));
      saveAuth(remember);
    } else {
      alert("Данные для входа не верны! Введите пожалуйста корректные данные.");
    }
  };

  const onLoginChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setLogin(evt.target.value);
  };

  const onPasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
  };

  const onRememberChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRemember(evt.target.checked);
  };

  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {isLoggedIn || (!isAuthChecked && <Preloader />)}
      {!isLoggedIn && isAuthChecked && (
        <div className="auth">
          <div
            className="auth__wrapper"
            onClick={(evt) => evt.stopPropagation()}
          >
            <h1 className="auth__title">Вход в сервис</h1>
            <form onSubmit={onSubmit}>
              <TextField
                onChange={onLoginChange}
                value={login}
                label="Логин"
                required
                variant="outlined"
              />
              <TextField
                onChange={onPasswordChange}
                value={password}
                label="Пароль"
                type={showPassword ? 'text' : 'password'}
                required
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={onShowPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox color="secondary" onChange={onRememberChange} />
                }
                label="Запомнить меня"
              />
              <Button className="btn--filled" variant="contained" type="submit">
                Войти
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
