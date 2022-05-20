import { useState } from 'react';
import {
    Box,
    TableCell,
    TableRow,
    Checkbox,
    TableSortLabel
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

const ResultsHeader = ({headerCells, selectedAll, selectAllCount, selectSomeCount, defaultSort, defaultSortDirection, searchContext}) => {
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

    const handleSelectAll = (event) => {
        selectedAll(event);
    };

    return(
        <TableRow>
            {headerCells && headerCells.length > 0 ? 
            (
                headerCells.map((cellData) => {
                        return (
                            cellData.isCheckbox ?
                                (
                                    <TableCell padding="checkbox" key={cellData.id} align={cellData.align}>
                                        <Checkbox
                                            checked={selectAllCount > 0}
                                            indeterminate={selectSomeCount > 0}
                                            onChange={handleSelectAll}
                                        />
                                    </TableCell>
                                )
                                : (
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
                                )
                        );
                })
            ) 
            : (<></>)
            }
        </TableRow>
    );
}

export default ResultsHeader;