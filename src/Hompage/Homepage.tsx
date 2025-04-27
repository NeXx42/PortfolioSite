import './Homepage.css';

import React, { useState, useEffect, useRef } from 'react';
import Homepage_ContentGroup from './Homepage_ContentGroup';

import { HomePageData, DataFetcherEndpoint } from "../utils/DataFetcher"

const bgScrollSizeLimit = 0.2;

interface props{
    dataFetcher: DataFetcherEndpoint
}


const App: React.FC<props> = ({ dataFetcher }) => {

    const [scrollY, setScollY] = useState(1);
    const [content, loadContent] = useState<HomePageData[] | undefined>(undefined);
    const [latestContent, setLatestContent] = useState<number>(0);

    useEffect(() => {
        dataFetcher.GetHomePageData().then((x: HomePageData[])  => { 
            loadContent(x)

            if(x != null){
                let latestDate: Date | undefined = undefined;
                let latestIndex = 0;

                x.map((x, pos) => {
                    if (x.updatedDate != undefined){
                        if(latestDate == undefined || latestDate! <= x.updatedDate){
                            latestIndex = pos;
                            latestDate = x.updatedDate;
                        }   
                    }
                });

                setLatestContent(latestIndex);
            }
        });

        const onScroll = () => {
            setScollY(1 + Math.min(window.scrollY / window.outerHeight, 1) * bgScrollSizeLimit);
        };

        window.addEventListener("scroll", onScroll);

        return () =>{
            window.removeEventListener("scroll", onScroll);
        } 
    }, []);

  return (
    <div className="Homepage">
        <img className='Homepage_BG' src='/PortfolioSite/Images/Wilderness.png' style={{ transform: `scale(${scrollY})` }}/>

        { content == undefined ? 
            ( <a>Loading</a> )
            : 
            (<>
                <div className='Homepage_Previews'>
                    <img className='Homepage_Entry' src={`/PortfolioSite/Content/${content[latestContent].id}/Icon.png`} />
                    <span className='Homepage_Entry'>{content[latestContent].name}</span>
                    <button className='Homepage_Entry'>Explore</button>
                </div>


                <div className='Homepage_ContentFitter'>
                    <div className='Homepage_Content Panel'>
                        <div id='selection1' className='Hompage_Content_Header'><h2>Games</h2></div>
                        <Homepage_ContentGroup  content={content?.filter(x => x.type == 0)}/>
                        <div className='Hompage_Content_Header'><h2>Projects</h2></div>
                        <Homepage_ContentGroup content={content?.filter(x => x.type == 1)}/>

                        <div className='Homepage_Content_Links'>

                        </div>
                    </div>
                </div>
            </>)
        }
    </div>
  );
}

export default App;
