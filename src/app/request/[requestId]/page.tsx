"use client";

import { useEffect, useState } from "react";
import { Button, Collapse } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkAuth } from "@/shared/lib";
import { useParams, useRouter } from "next/navigation";
import "@/app/request/request.scss";
import { setIsLoggedIn } from "@/store/auth-slice";
import { Preloader } from "@/components/preloader/preloader";
import { setIsAuthChecked } from "@/store/ui-slice";
import { ExpandMore } from "@mui/icons-material";

export default function Request() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { requestId } = useParams();

  const data = useAppSelector((state) => state.tableReducer.data);
  const isLoggedIn = useAppSelector((state) => state.authReducer.isLoggedIn);
  const isAuthChecked = useAppSelector(
    (state) => state.uiReducer.isAuthChecked
  );

  const [show, setShow] = useState(false);

  const currentRequestId = Number(requestId);
  const itemData = data.find((el) => el.id === currentRequestId);

  const {
    theme,
    number,
    createDate,
    finishDate,
    status,
    description,
    service,
    serviceComposition,
  } = itemData ?? {};

  useEffect(() => {
    const auth = checkAuth();

    if (!isAuthChecked) {
      dispatch(setIsAuthChecked(true));
      dispatch(setIsLoggedIn(auth));
    }

    if (!auth) {
      router.push("/");
    } else if (!itemData) {
      router.push("/404");
    }
  }, [isLoggedIn]);

  return (
    <>
      {(!isAuthChecked || !isLoggedIn || !itemData) && <Preloader />}
      {isLoggedIn && (
        <main className="request wrapper">
          <div className="request__wrapper">
            <div className="request__left">
              <span className="request__text-secondary">
                Обращение № {number} от {createDate}
              </span>
              <h1 className="request__title">{theme}</h1>
              <p>{description}</p>
            </div>
            <div className="request__right">
              <span className="request__status">{status}</span>
              <div className="request__row">
                <span className="request__text-secondary">Крайний срок</span>
                {finishDate}
              </div>
              <div className="request__row">
                <span className="request__text-secondary">Решение</span>
                Проект установлен
              </div>
            </div>
            <div className="request__bottom">
              <Collapse in={show}>
                <span className="request__service">{service}</span>
                {serviceComposition}
              </Collapse>
              <Button className={"request__btn" + (show ? " request__btn--show" : "")} onClick={() => setShow(!show)} variant="contained">
                <ExpandMore  />
              </Button>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
