import { usePagination, DOTS } from '../../utils/usePagination';

const Pagination = ({ totalCount, paginate, currentPage, pageSize }) => {
    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount: 1,
        pageSize
    });
    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }
    return (
        <>
            <div className="pagination">
                <ul>
                    {currentPage > 1 ? (<li className="page-item" onClick={() => paginate((currentPage - 1))} ><a className='page-link arrow left'></a></li>) : null}
                    {paginationRange.map(number => {
                        if (number === DOTS) {
                            return <li className="dots">&#8230;</li>;
                        }
                        return (
                            <li key={number} className={`page-item ${currentPage == number ? 'active' : ''}`} onClick={() => paginate(number)}>
                                <a className='page-link'>
                                    {number}
                                </a>
                            </li>
                        )
                    }
                    )}
                    {paginationRange.length > currentPage ? (<li className="page-item" onClick={() => paginate(currentPage + 1)} ><a className='page-link arrow right' id="cype_page_NextBtn"> </a></li>) : null}
                </ul>
            </div>
        </>
    );
};

export default Pagination;