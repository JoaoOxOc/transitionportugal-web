import { useState } from 'react';
import {
    Box,
    TableCell,
    TableRow,
    TableSortLabel
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

const ResultsHeader = ({headerCells, defaultSort, defaultSortDirection, searchContext}) => {

    const [order, setOrder] = useState(defaultSortDirection);
    const [orderBy, setOrderBy] = useState(defaultSort);

    const createSortHandler = (property) => (event) => {
        const isAsc = orderBy === property && order === 'asc';
        searchContext.searchData.sort = property;
        searchContext.searchData.sortDirection = isAsc ? 'desc' : 'asc';
        setOrder(searchContext.searchData.sortDirection);
        setOrderBy(searchContext.searchData.sort);
        searchContext.search(searchContext.searchData);
    };

    return(
        <TableRow>
            {headerCells && headerCells.length > 0 ? 
            (
                headerCells.map((cellData) => {
                        return (
                            <TableCell key={cellData.id} align={cellData.align}>
                                { cellData.isSort ? 
                                    (
                                        <TableSortLabel
                                            active={orderBy === cellData.id}
                                            direction={orderBy === cellData.id ? order : 'asc'}
                                            onClick={createSortHandler(cellData.id)}
                                        >
                                            {cellData.label}
                                            {orderBy === cellData.id ? (
                                                <Box component="span" sx={visuallyHidden}>
                                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                </Box>
                                            ) : null}
                                        </TableSortLabel>
                                    )
                                    : (
                                        cellData.label
                                    )
                                }
                            </TableCell>
                        );
                })
            ) 
            : (<></>)
            }
        </TableRow>
    );
}

export default ResultsHeader;