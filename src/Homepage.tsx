import './Homepage.css';

import React, { useState, useEffect } from 'react';
import Homepage_ContentGroup from './Hompage/Homepage_ContentGroup';

const bgScrollLimit = 200;
const bgScrollSizeLimit = 0.2;

function App() {

    const [scrollY, setScollY] = useState(1);

    useEffect(() => {
        const onScroll = () => {
            setScollY(1 + Math.min(window.scrollY / bgScrollLimit, 1) * bgScrollSizeLimit);
        };

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

  return (
    <div className="Homepage">
        <img className='Homepage_BG' src='PortfolioSite/Images/Wilderness.png' style={{ transform: `scale(${scrollY})` }}/>

        <div className='Homepage_Previews'>
            <img className='Homepage_Entry' src="PortfolioSite/Images/Untitled.png" />
            <span className='Homepage_Entry'>FPS Rouge like</span>
            <button className='Homepage_Entry'>Explore</button>
        </div>


        <div className='Homepage_ContentFitter'>
            <div className='Homepage_Content'>
                <div className='Hompage_Content_Header'><h2>Games</h2></div>

                <Homepage_ContentGroup />

                <div className='Hompage_Content_Header'><h2>Projects</h2></div>
                
                <Homepage_ContentGroup />
            </div>
        </div>
    </div>
  );
}

export default App;
