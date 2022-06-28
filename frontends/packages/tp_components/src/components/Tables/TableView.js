import {
    Box,
    Checkbox,
    Tooltip,
    IconButton,
    TableCell,
    TableRow,
    Typography
  } from '@mui/material';
import Link from '../Link';

const BodyTableView = ({rowsConfig, selectableItems, selectedItems, selectedItemCellTitle, sendSelectedItem}) => {
    if (!rowsConfig) {
        return null;
    }
    const cellConfiguration = rowsConfig.orderedCells;
    const dataFields = rowsConfig.dataFields;

    const handleSelectOneItem = (event, itemId) => {
        if (sendSelectedItem) {
            sendSelectedItem(event,itemId);
        }
    }

    const buildTypographyCell = (rowItem, cellData) => {
        return (
            <Typography variant={cellData.typographyVariant}>
                {rowItem[cellData.fieldName]}
            </Typography>
        )
    }

    const buildBoxWithLinkCell = (rowItem, cellData) => {
        return (
            <Box display={cellData.display} alignItems={cellData.alignItems}>
                <Box>
                    <Link href={rowItem[cellData.linkFieldName]} isNextLink={cellData.isNextLink}>
                        {rowItem[cellData.fieldName]}
                    </Link>
                </Box>
            </Box>
        )
    }

    const buildActionsCell = (rowItem,cellData) => {
        return (
            <Typography noWrap>
                {cellData.actions.map((action) => {
                    switch (action.actionType) {
                        case "linkIconButton": return (
                            <Tooltip key={action.actionKey} title={action.title} arrow>
                                <Link href={action.linkGetter(rowItem)} isNextLink={action.isNextLink}>
                                    <IconButton
                                    color={action.iconButtonColor}
                                    >
                                        {action.buttonIconComponent}
                                    </IconButton>
                                </Link>
                            </Tooltip>
                        );
                        case "actionIconButton": return (
                            <Tooltip key={action.actionKey} title={action.title} arrow>
                                <IconButton
                                color={action.iconButtonColor}
                                onClick={action.handleActionClicked}
                                >
                                    {action.buttonIconComponent}
                                </IconButton>
                            </Tooltip>
                        );
                        case "customComponent": return action.customComponentGetter(rowItem, action.customComponentStyleConfig);
                        default: return (
                            <>{action.title}</>
                        )
                    }
                })
                }
            </Typography>
        );
    }

    const buildCell = (rowItem, cellData) => {
        switch (cellData.type) {
            case "customComponent": return cellData.customComponentGetter(rowItem, cellData.customComponentStyleConfig);
            case "typography": return buildTypographyCell(rowItem, cellData);
            case "boxWithLink": return buildBoxWithLinkCell(rowItem, cellData);
            case "actions": return buildActionsCell(rowItem, cellData);
            default: return (<p>{rowItem[cellData.fieldName]}</p>)
        }
    }

    return(
        <>
        {rowsConfig.data.map((rowItem) => {
            const isItemSelected = selectableItems === true ? selectedItems.includes(rowItem[dataFields.selectedItemIdField]) : false;
            return (
                <TableRow hover key={rowItem[dataFields.idField]} selected={isItemSelected}>
                    {selectableItems &&
                        <TableCell padding="checkbox">
                            <Checkbox
                            aria-labelledby={selectedItemCellTitle}
                            checked={isItemSelected}
                            onChange={(event) =>
                                handleSelectOneItem(event, rowItem[dataFields.idField])
                            }
                            value={isItemSelected}
                            />
                        </TableCell>
                    }
                    {cellConfiguration.map((cell) => (
                        <TableCell key={cell.key} align={cell.alignment}>
                            {buildCell(rowItem, cell)}
                        </TableCell>
                    ))
                    }
                    </TableRow>
                )
            })
        }
        </>
    );
}

export default BodyTableView;