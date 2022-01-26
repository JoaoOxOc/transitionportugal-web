/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx } from 'theme-ui';
import React, { useEffect, useState } from 'react';
import Sticky from 'react-stickynode';
import Header from '../components/header/header';
import TopBar from '../components/header/topbar';


export default function Layout({ children }) {
  const [isSticky, setIsSticky] = useState(false);
  const [windowSize, setWindowSizeVar] = useState(0);

  useEffect(()=>{
    setWindowSizeVar(window.innerWidth);
    if (window.innerWidth < 1024) {
      setIsSticky(true);
    }

    window.addEventListener('resize', function() {
        if (window.innerWidth <= 1024 && windowSize > 1024) {
            setWindowSizeVar(window.innerWidth);
        }
        else if (window.innerWidth >= 1024 && windowSize < 1024) {
          setWindowSizeVar(window.innerWidth);
        }
    });
  }, [windowSize]);

  const handleStateChange = (status) => {
    if (windowSize > 1024) {
      if (status.status === Sticky.STATUS_FIXED) {
        setIsSticky(true);
      } else if (status.status === Sticky.STATUS_ORIGINAL) {
        setIsSticky(false);
      }
    }
  };
  
  return (
    <React.Fragment>
      { windowSize >= 1024 &&
        <TopBar/>
      }
      <Sticky innerZ={101} top={0} onStateChange={handleStateChange}>
        <Header className={`${isSticky ? 'sticky' : 'unSticky'}`} />
      </Sticky>
      <main
        sx={{
          variant: 'layout.main',
        }}
      >
        {children}
      </main>
    </React.Fragment>
  );
}
