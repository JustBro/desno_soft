"use client";

import { store } from "@/store/store";
import { Provider } from "react-redux";
import "@/styles/base.scss";
import Header from "@/components/header/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <Provider store={store}>
        <body>
          <Header />
          {children}
        </body>
      </Provider>
    </html>
  );
}
