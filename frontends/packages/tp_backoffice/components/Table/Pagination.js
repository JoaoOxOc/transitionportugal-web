import { useState } from 'react';
import {
    TablePagination
} from '@mui/material';

const ResultsPagination = ({totalElements, searchContext, paginationLabels, paginationRowsPerPageLabel}) => {

    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);

    const handlePageChange = (_event, newPage) => {
        searchContext.searchData.page = newPage;
        setPage(searchContext.searchData.page);
        searchContext.search(searchContext.searchData);
    };
  
    const handleLimitChange = (event) => {
        searchContext.searchData.size = parseInt(event.target.value);
        setLimit(searchContext.searchData.size);
        searchContext.search(searchContext.searchData);
    };

    return(
        <TablePagination
                      component="div"
                      count={parseInt(totalElements)}
                      labelDisplayedRows={(from=page) => (`${from.from}-${from.to === -1 ? from.count : from.to} ${paginationLabels.of} ${from.count}`)}
                      labelRowsPerPage={paginationRowsPerPageLabel}
                      onPageChange={handlePageChange}
                      onRowsPerPageChange={handleLimitChange}
                      page={page}
                      rowsPerPage={limit}
                      rowsPerPageOptions={[5, 10, 15]}
                    />
    );
}

export default ResultsPagination;