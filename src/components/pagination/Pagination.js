// ! 28 - child - deployed to ProductList.js file
import React, { useState } from 'react'
import styles from './Pagination.module.scss'

const Pagination = ({currentPage, setCurrentPage, productsPerPage, totalProducts}) => {

    const pageNumbers = []
    const totalPages = totalProducts / productsPerPage;

    // * Limit the page Numbers shown
    const [pageNumberLimit] = useState(5)
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)

    // ! Paginate function
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    // ! go the next page function 
    const paginateNext = () => {
        setCurrentPage(currentPage + 1)

        if (currentPage + 1 > maxPageNumberLimit) { // * Show next set of pageNumbers
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    }

    // ! go the previous page function
    const paginatePrev = () => {
        setCurrentPage(currentPage - 1)

        if ((currentPage - 1)  % pageNumberLimit === 0) { // * Show prev set of pageNumbers
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    }

    for (let index = 1; index < Math.ceil(totalProducts / productsPerPage); index++) {
        pageNumbers.push(index)
    }
    
    return (
        <ul className={styles.pagination}>

            <li onClick={paginatePrev} className={currentPage === pageNumbers[0] ? `${styles.hidden}` : null}>Prev</li>

                {/* Page numbers on the middle */}
                {pageNumbers.map((number) => {

                    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
                        return (
                        <li key={number} onClick={() =>
                             paginate(number)} className={currentPage === number ? `${styles.active}` : null}>
                             {number}
                        </li>
                        )
                    }
                })}

            <li onClick={paginateNext} className={currentPage === pageNumbers[pageNumbers.length - 1] ? `${styles.hidden}` : null}>Next</li>
            
            {/* => SHOW current page of total pages */}
            <p>
                <b className={styles.page}>{`page ${currentPage}`}</b>
                <span> {`of`}</span>
                <b> {`${Math.ceil(totalPages)}`}</b>
            </p>

        </ul>
    )
}

export default Pagination