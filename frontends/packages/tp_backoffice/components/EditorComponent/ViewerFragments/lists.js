import {
    Typography,
    List,
    ListItem
  } from '@mui/material';

export default function ViewerLists({listsData}) {
    console.log(listsData);
    let listStyleType = "disc";
    switch (listsData.style) {
        case "ordered": listStyleType = "custom-counter-style"; break;
        default: listStyleType = "disc"; break;
    }

    const processNestedList = (items) => {
        let nestedListItems = [];
        items.forEach((element, index) => {
            nestedListItems.push(<ListItem key={index} sx={{ display: 'list-item' }}><span dangerouslySetInnerHTML={{__html: element.content}}></span></ListItem>)
        });
        return (
            <List sx={{ listStyleType: listStyleType, pl: '30px', pt: '0' }}>
                {nestedListItems.map((element) => (
                    element
                ))}
            </List>
        );
    }

    let listItems = [];
    if (listsData.items) {
        listsData.items.forEach((element, index) => {
            listItems.push(<ListItem key={index} sx={{ display: 'list-item' }}><span dangerouslySetInnerHTML={{__html: element.content}}></span></ListItem>)
            if (element.items && element.items.length > 0) {
                listItems.push(processNestedList(element.items));
            }
        });
    }

    console.log(listItems)

    return (
        <List sx={{ listStyleType: listStyleType, pl: '30px' }}>
            {/* <ListSubheader sx={{
                fontWeight: 700, lineHeight: '24px', fontSize: '16px', color: 'black'
            }}
            >
                Search Help
            </ListSubheader> */}
            {listItems.map((element) => (
                element
            ))}
        </List>
    )
}