import React from "react";

const NewTable = (props) => {
  return (
    <section className="table-section">
      <div className="table__wrapper">
        <table className="table">
          {props.tableHead}
          {props.tableBody}
        </table>
      </div>
    </section>
  );
};

export default NewTable;
