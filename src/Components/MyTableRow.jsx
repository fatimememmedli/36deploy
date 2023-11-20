import React from "react";

function MyTableRow({ elem }) {
  return (
    <div className="table-container">
      <Tr key={i}>
        <Td>{elem.id}</Td>
        <Td>{elem.name}</Td>
        <Td isNumeric>{elem.price}</Td>
        <Td isNumeric>{elem.stockCount}</Td>
      </Tr>
    </div>
  );
}

export default MyTableRow;
