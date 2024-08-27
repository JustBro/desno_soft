"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { MenuItem, Pagination, Select, SelectChangeEvent } from "@mui/material";
import { checkAuth } from "@/shared/lib";
import "@/app/requests/requests.scss";
import { useParams, useRouter } from "next/navigation";
import { Preloader } from "@/components/preloader/preloader";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsAuthChecked } from "@/store/ui-slice";
import { setIsLoggedIn } from "@/store/auth-slice";
import { Table } from "@/components/table/table";
import { TableItem } from "@/types/types";
import { setRequestsPerPage } from "@/store/table-slice";

export default function Requests() {
  const router = useRouter();
  const { pageNum } = useParams();
  const dispatch = useAppDispatch();

  const data = useAppSelector((state) => state.tableReducer.data);
  const requestsPerPage = useAppSelector(
    (state) => state.tableReducer.requestsPerPage
  );
  const isLoggedIn = useAppSelector((state) => state.authReducer.isLoggedIn);
  const isAuthChecked = useAppSelector(
    (state) => state.uiReducer.isAuthChecked
  );

  const [displayData, setDisplayData] = useState<TableItem[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);

  const currentPage = Number(pageNum);

  useEffect(() => {
    setTotalPages(Math.ceil(data.length / requestsPerPage));

    const firsElem = currentPage * requestsPerPage - requestsPerPage;
    const lastElem = currentPage * requestsPerPage;

    setDisplayData(data?.slice(firsElem, lastElem));
  }, [requestsPerPage]);

  useEffect(() => {
    const auth = checkAuth();

    if (!isAuthChecked) {
      dispatch(setIsAuthChecked(true));
      dispatch(setIsLoggedIn(Boolean(auth)));
    }

    if (!auth) {
      router.push("/");
    }

    if (totalPages && currentPage > totalPages) {
      router.push("/404");
    }
  }, [isLoggedIn]);

  const onPagination = (evt: ChangeEvent<unknown>, value: number) => {
    router.push("/requests/" + value);
  };

  const onCountChange = (evt: SelectChangeEvent<number>) => {
    const requestsCount = Number(evt.target.value);
    const newPagesCount = Math.ceil(data.length / requestsCount);

    dispatch(setRequestsPerPage(requestsCount));

    if (currentPage > newPagesCount) {
      router.push("/requests/" + newPagesCount);
    }
  };

  return (
    <>
      {(!isAuthChecked || !isLoggedIn) && <Preloader />}
      {isLoggedIn && (
        <main className="requests wrapper">
          <Table data={displayData} />
          {totalPages > 0 && (
            <div className="requests__bottom">
              <Pagination
                count={totalPages || 0}
                page={currentPage}
                onChange={onPagination}
                siblingCount={0}
                shape="rounded"
                color="primary"
                size="large"
              />
              <Select
                labelId="select-label"
                value={requestsPerPage}
                onChange={onCountChange}
                size="small"
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
              </Select>
            </div>
          )}
        </main>
      )}
    </>
  );
}
