import { COLORS as colors } from '../../theme/parameters';

export const FooterStyles = {
  footer: {
    backgroundColor: '#EFFAFC',
    // backdropFilter: 'blur(10px)',
    // boxShadow: 'inset 0 0 0 3000px rgb(90 173 181 / 19%)',
    container: {
      width: '100%',
      alignItems: 'stretch',
    },
    footerTopArea: {
      boxSizing: 'border-box',
      minWidth: 0,
      gap: ['50px'],
      paddingTop: '100px',
      marginBottom: '50px',
      display: 'grid',
      gridTemplateColumns: ['repeat(1,1fr)','repeat(1,1fr)','repeat(2,1fr)','repeat(2,1fr)','repeat(2,1fr)','repeat(3,1fr)']
    },
    footerBottomArea: {
      borderTop: '2px solid',
      borderTopColor: 'border_color',
      display: ['block','block','flex'],
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '35px 0 40px'
    },
    footerBottomTrademark: {
      boxSizing: 'border-box',
      margin: 0,
      minWidth: 0,
      display: 'flex',
      alignItems: 'center',
      flexDirection: ['column','column','column','column','row'],
      img: {
        height: '40px !important',
        transition: '1.25s',
      }
    },
    footerBottomSpan: {
      fontSize: '14px',
      lineHeight: '1.29',
      color: 'rgba(15,33,55,0.6)',
      marginTop: ['18px', '18px', '7px']
    },
    menus: {
      width: ['100%', '100%', '100%', '100%'],
      display: 'flex',
      flexDirection: 'column',
      nav: {
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        margin: '0 auto',
        // flexWrap: 'wrap',
        a: {
          ':hover': {
            color: '#0F5137',
            transition: 'all 0.35s',
            span: {
              '&::before': {
                opacity: '1',
                bottom: '-1px',
                // backgroundColor: colors.nav_hover,
              },
            }
          },
        },
        span: {
          position: 'relative',
          svg: {
            marginTop: '-5px'
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            bottom: '-5px',
            opacity: '0',
            width: '100%',
            height: '1px',
            backgroundColor: colors.nav_menu_underline_bg_color,
            transition: '.25s',
          },
        }
      },
    },
    bottomMenus: {
      mt: [3, 4],
      mb: 2,
      nav: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
      },
    },
    bottomLink: {
      fontSize: [1, '15px'],
      color: 'text',
      fontWeight: '400',
      mb: 2,
      cursor: 'pointer',
      transition: 'all 0.35s',
      display: 'block',
      textDecoration: 'none',
      lineHeight: [1.5, null, 1.8],
      px: [2, null, 4],
      ':hover': {
        color: '#0F5137',
        transition: 'all 0.35s',
        span: {
          '&::before': {
            opacity: '1',
            bottom: '-1px',
            // backgroundColor: colors.nav_hover,
          },
        }
      },
      span: {
        position: 'relative',
        svg: {
          marginTop: '-5px'
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          bottom: '-5px',
          opacity: '0',
          width: '100%',
          height: '1px',
          backgroundColor: colors.nav_menu_underline_bg_color,
          transition: '.25s',
        },
      }
    },

    heading: {
      fontSize: [3, null, null, 4],
      color: 'text_secondary',
      textAlign: 'center',
      fontWeight: '500',
      mb: [3, 4, 5, null, 6],
      lineHeight: '1.35',
      figure: {
        // backgroundColor: 'white',
        // boxShadow: '0px 8px 24px rgb(53 95 158 / 30%)',
        height: '90px',
        width: '90px',
        minWidth: '90px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // borderRadius: '50%',
        margin: ['0 auto 30px','0 auto 30px','0 auto 30px','0 auto 30px','0 auto 0'],
        img: {
            maxWidth: '70px'
        }
      }
    },

    link: {
      fontSize: ['14px', null, 1],
      color: 'text',
      fontWeight: 'body',
      mb: 2,
      cursor: 'pointer',
      transition: 'all 0.35s',
      display: 'block',
      textDecoration: 'none',
      lineHeight: [1.5, null, null, 1.6, 1.8],
      ':hover': {
        color: 'primary',
      },
      ':last-child': {
        mb: '0px',
      },
    },
    copyright: {
      fontSize: ['14px', null, 1],
      width: '100%',
      textAlign: 'center',
      p: ['20px 20px'],
      backgroundColor: '#FCFDFE',
      color: 'text',
      a: {
        textDecoration: 'none',
        color: 'inherit',
        pl: 1,
        transition: 'all 0.25s',
        '&:hover': {
          color: 'primary',
        },
      },
    },
    navWrapper: {
      div: {
        margin: '0 auto'
      }
    }
  },
};
