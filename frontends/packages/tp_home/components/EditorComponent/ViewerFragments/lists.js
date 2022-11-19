import {
    Typography,
    List,
    ListItem,
    styled
  } from '@material-ui/core';

const OrderedList = styled(List)(
    ({ theme }) => `
        counter-reset: editorjs-viewer-listitem;
        li {
            counter-increment: editorjs-viewer-listitem;

            &::marker {
                content: counters(editorjs-viewer-listitem, ".") ". ";;
            }
        }
    `
)

export default function ViewerLists({listsData}) {
    let listStyleType = "disc";
    switch (listsData.style) {
        case "ordered": listStyleType = "custom-counter-style"; break;
        default: listStyleType = "disc"; break;
    }

    const processNestedList = (items, parentIndex, childIndex) => {
        let nestedListItems = [];
        items.forEach((element, index) => {
            nestedListItems.push(<ListItem key={index} sx={{ display: 'list-item' }}><span dangerouslySetInnerHTML={{__html: element.content}}></span></ListItem>)
            if (element.items && element.items.length > 0) {
                const result = processNestedList(element.items, parentIndex, index);
                nestedListItems.push(result);
            }
        });
        if (listStyleType == "custom-counter-style") {
            return (
                <OrderedList key={"sublist-"+parentIndex+childIndex} sx={{ pl: '30px', pt: '0' }}>
                    {nestedListItems.map((element) => (
                        element
                    ))}
                </OrderedList>
            );
        }
        else {
            return (
                <List key={"sublist-"+parentIndex+childIndex} sx={{ listStyleType: listStyleType, pl: '30px', pt: '0' }}>
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