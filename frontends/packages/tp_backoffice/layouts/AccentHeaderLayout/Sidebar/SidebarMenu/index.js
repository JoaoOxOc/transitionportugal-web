import { useEffect, useState } from 'react';

import { ListSubheader, Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText, styled } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SidebarMenuItem from './item';
import { useRouter } from 'next/router';
import menuItems, { MenuItem } from './items';
import { i18nextSidemenu } from "@transitionpt/translations";
import { getTokenScopes, getTokenRole } from '../../../../utils/jwt';

const MenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {
      margin-bottom: ${theme.spacing(1.5)};
      padding: 0;

      & > .MuiList-root {
        padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
      }
    }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.sidebar.menuItemIconColor};
      padding: ${theme.spacing(1, 3.5)};
      line-height: 1.4;
    }

    .MuiTypography-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.sidebar.menuItemIconColor};
      padding: ${theme.spacing(1, 2)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 2px 0;
        padding-left: ${theme.spacing(0)};
        padding-right: ${theme.spacing(2)};

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.5)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.sidebar.menuItemColor};
          background-color: ${theme.sidebar.menuItemBg};
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1, 3, 1, 4)};
          border-bottom-left-radius: 0;
          border-top-left-radius: 0;
          border-bottom-right-radius: 50px;
          border-top-right-radius: 50px;
    
          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(['color'])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
            color: ${theme.sidebar.menuItemIconColor};
          }
          
          .MuiButton-endIcon {
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.Mui-active,
          &:hover {
            background-color: ${theme.sidebar.menuItemBgActive};
            color: ${theme.sidebar.menuItemColorActive};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
                color: ${theme.sidebar.menuItemIconColorActive};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7.5)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 0;
            padding-left: ${theme.spacing(1.2)};

            .MuiListItem-root {
              padding: 0;
            }

            .MuiButton-root {
              .MuiBadge-root {
                right: ${theme.spacing(3.5)};
              }
            }

            .MuiButton-root {
              padding: ${theme.spacing(0.7, 3, 0.7, 5.5)};

              &.Mui-active,
              &:hover {
                background-color: ${theme.sidebar.menuItemBg};
              }
            }
          }
        }
      }
    }
`
);

const renderSectionOrItem = (sectionData, userRole, userScopes) => {
  let validateRole = false;
  let validateScope = false;
  if(sectionData.roles && !sectionData.roles.some(tokenRole => tokenRole == "any")) {
    validateRole = sectionData.roles.some(tokenRole => userRole == tokenRole);
  }
  else {
    validateRole = true;
  }

  if (validateRole && sectionData.scopes && !sectionData.scopes.some(tokenScope => tokenScope == "any")) {
    validateScope = sectionData.scopes.some(tokenScope => userScopes.includes(tokenScope));
  }
  else {
    validateScope = true;
  }

  return validateRole && validateScope;
}

function SidebarMenu({session}) {
  const { t } = i18nextSidemenu;
  const router = useRouter();
  const userScopes = getTokenScopes(session.accessToken);
  const userRole = getTokenRole(session.accessToken);
  const [ selectedIndex, setSelectedIndex ] = useState(0);

  const handlePathChange = () => {
    if (!router.isReady) {
      return;
    }
  };

  const handleHeadingClick = (isCollapsable, index)  => {
    if (isCollapsable == true) {
      if (selectedIndex === index) {
        setSelectedIndex("");
      } else {
        setSelectedIndex(index);
      }
    }
  }

  const renderSidebarMenuItems = ({ items, userRole, userScopes, path, collapsable, index }) => (
    <SubMenuWrapper>
      {collapsable == true ? 
        (
          <Collapse
                in={selectedIndex == index}
                timeout='auto'
                unmountOnExit
          >
            <List component="div">
              {items.reduce((ev, item) => renderSectionOrItem(item, userRole, userScopes) && reduceChildRoutes({ ev, item, path, userRole, userScopes }), [])}
            </List>
          </Collapse>
        ) : (
            <List component="div">
              {items.reduce((ev, item) => renderSectionOrItem(item, userRole, userScopes) && reduceChildRoutes({ ev, item, path, userRole, userScopes }), [])}
            </List>
        )
      }
    </SubMenuWrapper>
  );

  const reduceChildRoutes = ({ ev, path, item, userRole, userScopes }) => {
    const key = item.name;
    const partialMatch = path.includes(item.link);
    const exactMatch = path === item.link;

    if (item.items) {
      ev.push(
        <SidebarMenuItem
          key={key}
          active={partialMatch}
          open={partialMatch}
          name={item.name}
          icon={item.icon}
          link={item.link}
          badge={item.badge}
          badgeTooltip={item.badgeTooltip}
        >
          {renderSidebarMenuItems({
            path,
            userRole: userRole,
            userScopes: userScopes,
            items: item.items
          })}
        </SidebarMenuItem>
      );
    } else {
      ev.push(
        <SidebarMenuItem
          key={key}
          active={exactMatch}
          name={item.name}
          link={item.link}
          badge={item.badge}
          badgeTooltip={item.badgeTooltip}
          icon={item.icon}
        />
      );
    }

    return ev;
  };

  useEffect(handlePathChange, [router.isReady, router.asPath]);

  return (
    <>
      {menuItems.map((section, index) => renderSectionOrItem(section, userRole, userScopes) && (
        <MenuWrapper key={section.heading}>
            <List
              component="div"
              subheader={
                section.collapsable == true ? 
                (<ListItemButton 
                    onClick={() => {
                      handleHeadingClick(section.collapsable, index)
                    }}>
                    {/* <ListItemIcon>
                    {section.icon}
                    </ListItemIcon> */}
                    <ListItemText primary={t(section.heading)} />
                    {index === selectedIndex ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                ) : (
                <ListSubheader component="div" disableSticky>
                  {t(section.heading)}
                </ListSubheader>
                )
              }
            >
              {renderSidebarMenuItems({
                items: section.items,
                userRole: userRole,
                userScopes: userScopes,
                path: router.asPath,
                collapsable: section.collapsable,
                index: index
              })}
            </List>
        </MenuWrapper>
      ))}
    </>
  );
}

export default SidebarMenu;
