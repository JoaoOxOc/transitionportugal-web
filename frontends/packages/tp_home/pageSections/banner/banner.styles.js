export const bannerStyles = {
    banner: {
      overflow: ['hidden', 'initial', null, 'hidden'],
      // backgroundImage: `url(${BannerBG})`,
      backgroundRepeat: `no-repeat`,
      backgroundPosition: 'center',
      backgroundSize: 'auto',
      borderBottomRightRadius: [100, 150, null, null, null, 200],
      pt: ['150px', null, null, null, null, null, '140px', '118px'],
      pb: ['100px', null, null, '110px', null, 10, '150px'],
      backgroundColor: '#EFFAFC',
      container: {
        display: 'flex',
      },
      contentBox: {
        width: ['100%', null, '85%', '55%', '50%', '55%'],
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        flexShrink: 0,
        pt: [0, null, null, null, null, null, 5, 7],
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