import React from "react";

import Header from "../../components/header/header";
import Lock from "../../components/lock/lock";
import useTable from "../../hooks/melsy/useTable";
import usePopup from "../../hooks/melsy/usePopup";

const COLUMNS = [
  {
    id: "id",
    shouldSort: true,
    comparatorType: "numeric",
    label: "ID",
  },
  {
    id: "date",
    shouldSort: true,
    comparatorType: "numeric",
    label: "Дата",
  },
  {
    id: "clientName",
    shouldSort: false,
    label: "Имя сотрудника",
  },
  {
    id: "controls",
    shouldSort: false,
    label: "",
  },
];

const MelsyPage = () => {
  const isAuth = true;

  const table = useTable(COLUMNS);
  const popup = usePopup();

  return (
    <>
      <Header />
      {isAuth ? (
        <section style={{ width: "100%", maxWidth: 800, margin: "0 auto" }}>
          <h1>Melsy</h1>
          {table}
        </section>
      ) : (
        <Lock />
      )}
      {popup}
    </>
  );
};

export default MelsyPage;
