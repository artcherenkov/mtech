import React from "react";

const NewTable = (props) => {
  return (
    <div className="table__wrapper">
      <table className="table">
        {props.tableHead}
        {props.tableBody}
      </table>
    </div>
  );
};

export default NewTable;
