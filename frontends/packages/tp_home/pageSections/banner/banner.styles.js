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

export const bannerStyles = {
    banner: {
      // overflow: ['hidden', 'initial', null, 'hidden'],
      position: 'relative',
      // backgroundImage: `url(${BannerBG})`,
      backgroundRepeat: `no-repeat`,
      backgroundPosition: 'center bottom',
      //backgroundAttachment: 'fixed',
      backgroundSize: 'auto',
      //borderBottomRightRadius: [100, 150, null, null, null, 200],
      paddingTop: '8px',
      // minHeight: '600px',
      height: ['100vh','100vh', '100vh', '100vh','calc(100vh - 70px)'],
      // pt: ['150px', null, null, null, null, null, '140px', '118px'],
      // pb: ['100px', null, null, '110px', null, 10, '150px'],
      backgroundColor: '#EFFAFC',
      container: {
        display: 'flex',
      },
      contentBox: {
        width: ['100%', null, '75%', '55%', '50%', '50%'],
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        flexShrink: 0,
        // pt: [0, null, null, null, null, null, 5, 7],
        color: '#5AADB5',
      },
      imageBox: {
        display: ['none', null, null, 'block'],
        justifyContent: 'center',
        ml: [0, null, null, '-110px', '-115px', '-150px', '-210px', '-270px'],
        mr: [0, null, null, '-145px', '-160px', '-180px', '-220px', '-290px'],
        mt: [0, null, null, '40px', 4, 7, 0],
        mb: [0, null, null, null, '-45px', '-70px', null, '-115px'],
        overflow: 'hidden',
        textAlign: 'right',
        width: '100%',
      },
      p: {
        width: '100%',
        marginBottom: '10px'
      },
    },
    bannerCarousel: {
      height: ['100vh','100vh', '100vh', '100vh','calc(100vh - 70px)'],
      figure: {
        display: 'grid',
        height: '100%'
      },
      img: {
        height: ['100vh','100vh', '100vh', '100vh','calc(100vh)'],
        width: '100%',
        maxHeight: '100vh'
      },
      textOverlay: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }
    },
    sponsorTitle: {
      color: 'white',
      fontSize: [1, 2],
      opacity: 0.6,
      pr: 20,
      flexShrink: 0,
      pb: [2, null, 0],
    },
    sponsorBox: {
      pt: ['35px', null, null, null, null, '45px'],
      flexDirection: ['column', null, 'row'],
      sponsor: {
        display: 'flex',
        alignItems: 'center',
        '> a': {
          mr: [5, null, null, 4, 6],
          display: 'flex',
          '&:last-of-type': {
            mr: 0,
          },
        },
      },
    },
  };