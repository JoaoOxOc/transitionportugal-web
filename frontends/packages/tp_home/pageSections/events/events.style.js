import { makeStyles } from '@material-ui/core/styles';

export const CarouselStyles = makeStyles(theme => ({
    carouselContainer: {
        marginLeft: 'auto',
        maxWidth: 'calc(50% + 865px)',
        overflow: 'hidden !important',
        marginLeft: '-15px',
        marginRight: '-15px'
    },
    sliderImageItem: {
        padding: '20px 0 20px 20px'
    }
}));

export const EventsStyles = {
    events: {
        width: '100%',
    },
    eventsContainer: {
        paddingTop: '96px',
        paddingBottom: '80px',
    },
    'react-multi-carousel-track': {
        transition: 'transform 400ms ease-in-out 0s !important'
    },
    eventsCard: {
        boxSizing: 'border-box',
        minWidth: '0px',
        backgroundColor: 'white',
        boxShadow: 'rgb(38 78 118 / 12%) 0px 4px 10px',
        borderRadius: '7px',
        margin: '0px 15px 40px',
        transition: 'all 0.3s ease 0s',
        '&:hover': {
            boxShadow: 'rgb(38 78 118 / 15%) 0px 5px 20px'
        }
    },
    eventsCardImage: {
        boxSizing: 'border-box',
        margin: '0px',
        minWidth: '0px',
        borderRadius: '7px 7px 0px 0px',
        overflow: 'hidden',
        display: 'flex',
        img: {
            boxSizing: 'border-box',
            margin: 0,
            minWidth: 0,
            width: '100%',
            maxWidth: '100%',
            height: 'auto'
        }
    },
    eventsCardDetails: {
        boxSizing: 'border-box',
        margin: '0px',
        minWidth: '0px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '25px 30px',
        h2: {
            boxSizing: 'border-box',
            margin: '0px 0px 15px',
            minWidth: '0px',
            fontFamily: '"DM Sans", sans-serif',
            letterSpacing: '-0.55px',
            fontSize: ['18px','18px','18px','18px','18px','20px'],
            color: '#0F2137',
            lineHeight: ['1.4', '1.5'],
            fontWeight: 700,
            paddingRight: ['0px','0px','0px','0px','0px','25px'],
            marginBottom: ['0px','20px','25px'],
            a: {
                boxSizing: 'border-box',
                margin: '0px',
                minWidth: '0px',
                display: 'block',
                paddingLeft: '0px',
                paddingRight: '0px',
                color: 'inherit',
                textDecoration: 'none',
                fontSize: 'inherit',
                transition: 'color 0.25s ease 0s',
                '&:hover': {
                    color: '#EA3A60'
                }
            }
        },
        eventsCardDetailsContainer: {
            boxSizing: 'border-box',
            margin: '0px',
            minWidth: '0px',
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between'
        },
        eventsCardDetailsOrganizer: {
            boxSizing: 'border-box',
            margin: '0px',
            minWidth: '0px',
            fontSize: ['14px','14px','16px'],
            fontWeight: 500,
            color: '#EA3A60',
            lineHeight: 1.4
        },
        eventsCardDetailsDate: {
            boxSizing: 'border-box',
            margin: '0px',
            minWidth: '0px',
            fontSize: ['14px','14px','16px'],
            fontWeight: 400,
            lineHeight: 1.5
        },
        eventsCardDetailsTag: {

        },
        eventsCardDetailsPlace: {
            boxSizing: 'border-box',
            margin: '0px',
            minWidth: '0px',
            fontSize: ['14px','14px','16px'],
            fontWeight: 700,
            lineHeight: 1.5
        }
    }
};

export const CarouselResponsive = {
    television: {
      breakpoint: { min: 1920 },
      items: 4,
      slidesToSlide: 4 // optional, default to 1.
    },
    desktop: {
      breakpoint: { max: 1920, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 480 },
      items: 2,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 480, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };