import { useState } from 'react';
import {
    TablePagination,
    Box,
    Typography
} from '@mui/material';

const ResultsPagination = ({gridDisplay, pageElementsCount, totalElements, searchContext, paginationLabels, paginationRowsPerPageLabel}) => {

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
        <>
            {gridDisplay &&
                <Box>
                    <Typography component="span" variant="subtitle1">
                    {paginationLabels.showing}
                    </Typography>{' '}
                    <b>{pageElementsCount && pageElementsCount < limit ? pageElementsCount : limit}</b> {paginationLabels.of} <b>{totalElements}</b>{' '}
                    <b>{paginationLabels.dataTitle}</b>
                </Box>
            }
            <TablePagination
                      component="div"
                      count={parseInt(totalElements)}
                      labelDisplayedRows={(from=page) => !gridDisplay ? (`${from.from}-${from.to === -1 ? from.count : from.to} ${paginationLabels.of} ${from.count}`) : "" }
                      labelRowsPerPage={!gridDisplay ? paginationRowsPerPageLabel : "" }
                      onPageChange={handlePageChange}
                      onRowsPerPageChange={handleLimitChange}
                      page={page}
                      rowsPerPage={limit}
                      rowsPerPageOptions={[5, 10, 15]}
                    />
        </>
    );
}

export default ResultsPagination;