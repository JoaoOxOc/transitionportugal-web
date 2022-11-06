
export const CarouselResponsive = {
    television: {
      breakpoint: { min: 1920 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    desktop: {
      breakpoint: { max: 1920, min: 1024 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 480 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 480, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

export const GlassCarouselStyles = {
    carouselCard: {
        height: '320px',
        width: ['calc(100vw - 100px)','calc(100vw - 100px)','calc(100vw - 100px)','600px','400px', '550px', '600px'],
        bottom: 0,
        //right: 0,
        margin: '0 auto',
        position: 'relative',
        background: 'rgba(255, 255, 255, 0.7)',
        borderRadius: '16px',
        boxShadow: '0 4px 30px rgb(0 0 0 / 10%)',
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(90, 173, 181, 0.3)',
        h1: {
            padding: '10px',
        }
    },
    carouselBox: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        flexShrink: 0,
        padding: '10px',
        // pt: [0, null, null, null, null, null, 5, 7],
        p: {
            paddingRight: 0
        }
    },
    carouselList: {
      width: '100%',
        height: '100%',
        marginLeft: 'auto',
        maxWidth: 'calc(50% + 865px)',
        overflow: 'hidden !important',
    }
}