import { exit } from "@/shared/lib";
import { setIsLoggedIn } from "@/store/auth-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Button } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import "./header.scss";

export default function Header() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isLoggedIn = useAppSelector((state) => state.authReducer.isLoggedIn);

  const currentPath = usePathname();
  const hideHeader = currentPath === "/404" || currentPath === "/";

  const onExit = () => {
    exit();
    dispatch(setIsLoggedIn(false));
  };

  const onBack = () => {
    const prevUrl = router.back();

    if (prevUrl!) {
      router.push(prevUrl);
    } else {
      router.push("/requests/1");
    }
  };

  return (
    <>
      {!hideHeader && isLoggedIn && (
        <header className="header wrapper">
          {currentPath.includes("request/") && (
            <Button
              className="header__back"
              onClick={onBack}
              variant="contained"
            >
              Назад
            </Button>
          )}
          <Button variant="contained" onClick={onExit}>
            Выход
          </Button>
        </header>
      )}
    </>
  );
}
