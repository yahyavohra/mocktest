const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <>
            <div className="pagination">
                <ul>
                    {currentPage > 1 ? (<li className="page-item"><a onClick={() => paginate((currentPage - 1))} className='page-link'> Prev </a></li>) : null}

                    {pageNumbers.map(number => (
                        <li key={number} className={`page-item ${currentPage == number ? 'active' : ''}`} onClick={() => paginate(number)}>
                            <a className='page-link'>
                                {number}
                            </a>
                        </li>
                    ))}
                    {pageNumbers.length > currentPage ? (<li className="page-item"><a onClick={() => paginate(currentPage + 1)} className='page-link'> Next </a></li>) : null}


                </ul>
            </div>
        </>
    );
};

export default Pagination;