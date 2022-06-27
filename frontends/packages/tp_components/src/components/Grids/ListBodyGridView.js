import {
    Grid,
    Box,
    Card,
    Checkbox,
    Divider,
    Typography,
    styled
  } from '@mui/material';
import clsx from 'clsx';
import Link from '../Link';

const CardWrapper = styled(Card)(
    ({ theme }) => `
  
    position: relative;
    overflow: visible;
  
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      border-radius: inherit;
      z-index: 1;
      transition: ${theme.transitions.create(['box-shadow'])};
    }
        
      &.Mui-selected::after {
        box-shadow: 0 0 0 3px ${theme.colors.primary.main};
      }
    `
  );

const BodyGridView = ({rowsConfig, selectableItems, selectedItems, sendSelectedItem}) => {
    if (!rowsConfig) {
        return null;
    }
    const gridItemConfiguration = rowsConfig.orderedGridItems;
    const dataFields = rowsConfig.dataFields;

    const handleSelectOneItem = (event, itemId) => {
        if (sendSelectedItem) {
            sendSelectedItem(event,itemId);
        }
    }

    const buildSelectableCheckbox = (rowItem, gridItemData, isItemSelected) => {
        return (
            <Box
                key={gridItemData.key}
                pl={gridItemData.paddingLeft}
                py={gridItemData.paddingY}
                pr={gridItemData.paddingRight}
                display={gridItemData.display}
                alignItems={gridItemData.alignItems}
                justifyContent={gridItemData.justifyContent}
            >
                <Checkbox
                    aria-labelledby={gridItemData.checkboxTitle}
                    checked={isItemSelected}
                    onChange={(event) =>
                        handleSelectOneItem(event, rowItem[dataFields.idField])
                    }
                    value={isItemSelected}
                />
            </Box>
        );
    }

    const buildBoxWithLinkItem = (rowItem, gridItemData) => {
        return (
            <Box key={gridItemData.key} display={gridItemData.display} alignItems={gridItemData.alignItems}>
                <Box>
                    <Link href={rowItem[gridItemData.linkFieldName]} isNextLink={gridItemData.isNextLink}>
                        {rowItem[gridItemData.fieldName]}
                    </Link>
                </Box>
            </Box>
        )
    }

    const buildBoxWithLinkAndTypographyItem = (rowItem, gridItemData) => {
        return (
            <Box key={gridItemData.key}>
                <Link variant={gridItemData.variant} href={rowItem[gridItemData.linkFieldName]} isNextLink={gridItemData.isNextLink}>
                {rowItem[gridItemData.fieldName]}
                </Link>{' '}
                <Typography
                    component={gridItemData.typographyComponent}
                    variant={gridItemData.typographyVariant}
                    color={gridItemData.typographyColor}
                    >
                        {gridItemData.typographyTextWithParantesis === true ? 
                            (
                                <>({rowItem[gridItemData.typographyFieldName]})</>
                            ) : (
                                <>{rowItem[gridItemData.typographyFieldName]}</>
                            )
                        }
                </Typography>
            </Box>
        )
    }

    const buildTypographyGridItem = (rowItem, gridItemData) => {
        return (
            <Typography key={gridItemData.key} sx={{ pt: gridItemData.paddingTop}} variant={gridItemData.typographyVariant}>
                {gridItemData.typographyTextWithParantesis === true ? 
                    (
                        <>({rowItem[gridItemData.fieldName]})</>
                    ) : (
                        <>{rowItem[gridItemData.fieldName]}</>
                    )
                }
            </Typography>
        )
    }

    const buildSubGridItems = (rowItem, subGridItem) => {
        //case "actions": return buildActionsCell(rowItem, gridItemData);
        switch (subGridItem.type) {
            case "boxWithLink": return buildBoxWithLinkItem(rowItem, subGridItem);
            case "boxWithLinkAndTypography": return buildBoxWithLinkAndTypographyItem(rowItem, subGridItem);
            case "divider": return (<Divider key={subGridItem.key}/>);
            case "typography": return buildTypographyGridItem(rowItem, subGridItem);
            case "customComponent": return subGridItem.customComponentGetter(rowItem, subGridItem.customComponentStyleConfig);
            default: return (<p key={subGridItem.key}>{rowItem[subGridItem.fieldName]}</p>);
        }
    }

    const buildComposableGridItem = (rowItem, gridItemData) => {
        switch (gridItemData.subType) {
            case "twoBoxes": return (
                <Box key={gridItemData.key} p={gridItemData.padding} display={gridItemData.display} alignItems={gridItemData.alignItems}>
                    <Box>
                        {gridItemData.subItems.map((subGridItem) => (
                            buildSubGridItems(rowItem, subGridItem)
                        ))}
                    </Box>
                </Box>
            );
            case "oneBox": return (
                <Box key={gridItemData.key} pl={gridItemData.paddingLeft} pr={gridItemData.paddingRight} py={gridItemData.paddingY} display={gridItemData.display} alignItems={gridItemData.alignItems}  justifyContent={gridItemData.justifyContent}>
                    {gridItemData.subItems.map((subGridItem) => (
                        buildSubGridItems(rowItem, subGridItem)
                    ))}
                </Box>
            );
            case "boxWithTypography": return (
                <Box key={gridItemData.key} pl={gridItemData.paddingLeft} pr={gridItemData.paddingRight} py={gridItemData.paddingY} display={gridItemData.display} alignItems={gridItemData.alignItems}  justifyContent={gridItemData.justifyContent}>
                    <Typography display={gridItemData.typographyDisplay}>
                        {gridItemData.subItems.map((subGridItem) => (
                            buildSubGridItems(rowItem, subGridItem)
                        ))}
                    </Typography>
                </Box>
            );
            default: return (<p key={gridItemData.key}>{rowItem[gridItemData.fieldName]}</p>)
        }
    }

    const buildGridItem = (rowItem, gridItemData, isItemSelected) => {
        switch (gridItemData.type) {
            case "selectableCheckbox": return buildSelectableCheckbox(rowItem, gridItemData, isItemSelected);
            case "divider": return (<Divider key={gridItemData.key}/>);
            case "customComponent": return gridItemData.customComponentGetter(rowItem, gridItemData.customComponentStyleConfig);
            case "composableGridItem": return buildComposableGridItem(rowItem, gridItemData);
            default: return (<p key={gridItemData.key}>{rowItem[gridItemData.fieldName]}</p>)
        }
    }

    return (
        <>
        {rowsConfig.data.map((rowItem) => {
            const isItemSelected = selectableItems === true ? selectedItems.includes(rowItem[dataFields.selectedItemIdField]) : false;
            return (
                <Grid item xs={rowsConfig.responsive.xs} sm={rowsConfig.responsive.sm} md={rowsConfig.responsive.md} key={rowItem[dataFields.idField]}>
                    <CardWrapper
                        className={clsx({
                        'Mui-selected': isItemSelected
                        })}
                    >
                        <Box
                            sx={{
                                position: 'relative',
                                zIndex: '2'
                            }}
                        >
                            {gridItemConfiguration.map((gridItem) => (
                                buildGridItem(rowItem, gridItem, isItemSelected)
                            ))
                            }
                        </Box>
                    </CardWrapper>
                </Grid>
                )
            })
        }
        </>
    );
}

export default BodyGridView;