import React from "react";
import "./Pagination.css";

const Pagination = ({
  typeList,
  pokeList,
  page,
  currentPage,
  maxPageLimit,
  minPageLimit,
  nextPag,
  prevPag,
  funNextPage,
  funPrevPage,
}) => {
  //Handling the amount of pages
  const handlePageNums = () => {
    const pageNums = [];
    let typeNumPag, pokeNumPag;

    if (typeList) {
      typeNumPag = Math.ceil(typeList.length / 4);

      for (let i = 1; i <= typeNumPag; i++) {
        pageNums.push(i);
      }
    } else if (pokeList) {
      pokeNumPag = Math.ceil(pokeList.length / 4);
      for (let i = 1; i < pokeNumPag; i++) {
        pageNums.push(i);
      }
    }

    return pageNums;
  };

  //HandleBtn of listPage
  const handleBtn = (num) => {
    page(num);
    currentPage = num;
  };

  // Print the pagination Buttons
  const listPage = handlePageNums().map((num) => {
    if (num < maxPageLimit + 1 && num > minPageLimit) {
      return (
        <button
          className={currentPage === num ? "active" : null}
          onClick={() => handleBtn(num)}
          key={num}
        >
          {num}
        </button>
      );
    } else return null;
  });

  return (
    <div className="pagination">
      <button onClick={() => funPrevPage(prevPag)}>Prev</button>
      {listPage}
      <button onClick={() => funNextPage(nextPag)}>Next</button>
    </div>
  );
};

export default Pagination;
