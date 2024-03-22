import React from "react";
import HeaderComponent from "../components/Header";

export default function Layout({ children }) {
  return (
    <div>
      <HeaderComponent />
      <div>{children}</div>
    </div>
  );
}
