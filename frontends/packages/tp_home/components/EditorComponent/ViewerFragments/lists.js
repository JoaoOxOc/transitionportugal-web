/** @jsxImportSource theme-ui */
import {
    Typography,
    List,
    ListItem,
    styled
  } from '@material-ui/core';

export const listsStyles = {
    nestedListItem: {
        display: 'list-item',
        alignItems: 'start !important',
        counterIncrement: 'editorjs-viewer-listitem',
        '&::before': {
            display: 'inline-block',
            content: 'counters(editorjs-viewer-listitem, ".") ". "'
        }
    }
}

export default function ViewerLists({listsData}) {
    let listStyleType = "disc";
    switch (listsData.style) {
        case "ordered": listStyleType = "custom-counter-style"; break;
        default: listStyleType = "disc"; break;
    }

    const processNestedList = (items, parentIndex, childIndex) => {
        let nestedListItems = [];
        items.forEach((element, index) => {
            nestedListItems.push(<ListItem key={index} sx={listsStyles.nestedListItem}><span dangerouslySetInnerHTML={{__html: element.content}}></span></ListItem>)
            if (element.items && element.items.length > 0) {
                const result = processNestedList(element.items, parentIndex, index);
                nestedListItems.push(result);
            }
        });
        if (listStyleType == "custom-counter-style") {
            return (
                <List key={"sublist-"+parentIndex+childIndex} style={{ counterReset: 'editorjs-viewer-listitem', paddingLeft: '30px', paddingTop: '0' }}>
                    {nestedListItems.map((element) => (
                        element
                    ))}
                </List>
            );
        }
        else {
            return (
                <List key={"sublist-"+parentIndex+childIndex} style={{ listStyleType: listStyleType, paddingLeft: '0px', paddingTop: '0' }}>
                    {nestedListItems.map((element) => (
                        element
                    ))}
                </List>
            );
        }
    }
    
    return (
        processNestedList(listsData.items, 0, 0)
        // <OrderedList sx={{ listStyleType: listStyleType, pl: '30px' }}>
        //     {/* <ListSubheader sx={{
        //         fontWeight: 700, lineHeight: '24px', fontSize: '16px', color: 'black'
        //     }}
        //     >
        //         Search Help
        //     </ListSubheader> */}
        //     {listItems.map((element) => (
        //         element
        //     ))}
        // </OrderedList>
    )
}