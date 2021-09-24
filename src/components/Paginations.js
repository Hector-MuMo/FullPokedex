import React from 'react';
import { useAuth } from '../Context/DataContext';
import './Paginations.css';

const Pagination = ({
  typeList,
  colorList,
  genderList,
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
  const { numPages } = useAuth();

  //Handling the amount of pages
  const handlePageNums = () => {
    const pageNums = [];
    let typeNumPag, pokeNumPag;

    if (typeList) {
      typeNumPag = Math.ceil(typeList.length / numPages);

      for (let i = 1; i <= typeNumPag; i++) {
        pageNums.push(i);
      }
    } else if (colorList) {
      pokeNumPag = Math.ceil(colorList.length / numPages);
      for (let i = 1; i < pokeNumPag; i++) {
        pageNums.push(i);
      }
    } else if (genderList) {
      pokeNumPag = Math.ceil(genderList.length / numPages);
      for (let i = 1; i < pokeNumPag; i++) {
        pageNums.push(i);
      }
    } else if (pokeList) {
      pokeNumPag = Math.ceil(pokeList.length / numPages);
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
          className={currentPage === num ? 'active' : null}
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
