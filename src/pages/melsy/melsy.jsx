import React from "react";

import Header from "../../components/header/header";
import Lock from "../../components/lock/lock";
import DeletePopup from "./components/delete-popup/delete-popup";
import RecordPopup from "./components/record-popup/record-popup";
import MelsyTable from "./components/table/table";

const MelsyPage = () => {
  const isAuth = true;

  return (
    <>
      <Header />
      {isAuth ? (
        <section style={{ width: "100%", maxWidth: 800, margin: "0 auto" }}>
          <h1>Melsy</h1>
          <MelsyTable />
        </section>
      ) : (
        <Lock />
      )}
      <RecordPopup />
      <DeletePopup />
    </>
  );
};

export default MelsyPage;
