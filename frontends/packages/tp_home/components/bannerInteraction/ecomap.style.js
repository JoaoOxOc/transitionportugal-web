import { keyframes } from "@emotion/react"


const bottomLeafAnimation = keyframes`
    from {
        transform: translate3d(0,0,0);
    }
    20% {
        transform: translate3d(0,0,0);
        filter: drop-shadow(1px 2px 2px rgba(130,130,170,1));
    }
    
    40% {
      transform: translate3d(0, -30px, 0);
    }

    43% {
      transform: translate3d(0, -30px, 0);
      filter: drop-shadow(8px 11px 2px rgba(130,130,130,1));
    }

    53% {
        transform: translate3d(0,0,0);
        filter: drop-shadow(4px 8px 2px rgba(130,130,130,1));
    }
    
      70% {
        transform: translate3d(0, -15px, 0);
        filter: drop-shadow(7px 10px 2px rgba(130,130,130,1));
      }
      80% {
        transform: translate3d(0,0,0);
        filter: drop-shadow(4px 8px 2px rgba(130,130,130,1));
    }
    
      90% {
        transform: translate3d(0,-4px,0);
        filter: drop-shadow(3px 7px 2px rgba(130,130,130,1));
      }

      to {
        transform: translate3d(0,0,0);
        filter: drop-shadow(1px 2px 2px rgba(130,130,170,1));
    }
`;

export const EcoMapStyles = {
    ecoMapContainer: {
        display: 'flex',
        position: 'absolute',
        width: '100%',
        bottom: '0'
        // mt: [50, 20, 15, 20, null, null, 0],
    },
    ecoMapInnerContainer: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
    },
    // generate glass: https://css.glass
    ecoMapWrapper: {
        height: '180px',
        width: '300px',
        bottom: 0,
        //right: 0,
        margin: '0 auto',
        position: 'absolute',
        background: 'rgba(90, 173, 181, 0.2)',
        borderRadius: '16px',
        boxShadow: '0 4px 30px rgb(0 0 0 / 10%)',
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(90, 173, 181, 0.3)',
    },
    imageDiv: {
        position: 'relative',
        height: '100px',
        width: '100px',
        margin: '0 auto',
        bottom: '-50px',
        borderRadius: '50%',
        animation: `${bottomLeafAnimation} 3s ease infinite`,
        backgroundRepeat: `no-repeat`,
        backgroundPosition: 'center',
        backgroundSize: '100px 100px',
        filter: 'drop-shadow(1px 2px 2px rgba(130,130,170,1))',
        '&:hover': {
            cursor: 'pointer'
        }
    }
}
