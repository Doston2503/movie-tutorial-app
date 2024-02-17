import React from 'react';
import Pagination from '@mui/material/Pagination';

function MoviePagination({setPage, pageOfNum = 10}) {

    function handleChange(e) {
        setPage(e.target.textContent);
        window.scroll(0, 0)
    }

    return (
        <div className="d-flex justify-content-center">
            <Pagination
                onChange={handleChange}
                hideNextButton={true}
                hidePrevButton={true}
                className="pagination"
                color="primary"
                count={pageOfNum}/>
        </div>
    );
}

export default MoviePagination;