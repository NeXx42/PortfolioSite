import './Homepage.css';

import React, { useState, useEffect } from 'react';
import Homepage_ContentGroup from './Homepage_ContentGroup';

import { HomePageData, DataFetcherEndpoint } from "../utils/DataFetcher"

const bgScrollLimit = 200;
const bgScrollSizeLimit = 0.2;

interface props{
    dataFetcher: DataFetcherEndpoint
}


const App: React.FC<props> = ({ dataFetcher }) => {

    const [scrollY, setScollY] = useState(1);
    const [content, loadContent] = useState<HomePageData[] | undefined>(undefined);

    useEffect(() => {
        dataFetcher.GetHomePageData().then((x: HomePageData[])  => loadContent(x));

        const onScroll = () => {
            setScollY(1 + Math.min(window.scrollY / bgScrollLimit, 1) * bgScrollSizeLimit);
        };

        window.addEventListener("scroll", onScroll);
        

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

  return (
    <div className="Homepage">
        <img className='Homepage_BG' src='/PortfolioSite/Images/Wilderness.png' style={{ transform: `scale(${scrollY})` }}/>

        <div className='Homepage_Previews'>
            <img className='Homepage_Entry' src="/PortfolioSite/Images/Wilderness.png" />
            <span className='Homepage_Entry'>FPS Rouge like</span>
            <button className='Homepage_Entry'>Explore</button>
        </div>


        <div className='Homepage_ContentFitter'>
            <div className='Homepage_Content Panel'>
                { content == undefined ? 
                    ( <a>Loading</a> )
                    : 
                    (<>
                        <div className='Hompage_Content_Header'><h2>Games</h2></div>
                        <Homepage_ContentGroup content={content?.filter(x => x.type == 0)}/>
                        <div className='Hompage_Content_Header'><h2>Projects</h2></div>
                        <Homepage_ContentGroup content={content?.filter(x => x.type == 1)}/>
                    </>)
                }
            </div>
        </div>
    </div>
  );
}

export default App;
