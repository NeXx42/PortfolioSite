import './Homepage.css';

import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Homepage_ContentGroup from './Homepage_ContentGroup';

import { RedirectContentPage } from "../utils/Helpers"
import { HomePageData, DataFetcherEndpoint } from "../utils/DataFetcher"

const bgScrollSizeLimit = 100;

interface props{
    dataFetcher: DataFetcherEndpoint
}


const App: React.FC<props> = ({ dataFetcher }) => {

    const [scrollY, setScollY] = useState(-bgScrollSizeLimit / 2);
    const [content, loadContent] = useState<HomePageData[] | undefined>(undefined);
    const [latestContent, setLatestContent] = useState<number>(0);

    const { scrollTo } = useParams();

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

        setTimeout(() => {
            if(scrollTo != undefined){
                document.getElementById(scrollTo)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            else{
                window.scrollTo(0, 0);
            }
        }, 100);

        const onScroll = () => {
            setScollY( (Math.min(window.scrollY / document.documentElement.scrollHeight, 1) * bgScrollSizeLimit) - (bgScrollSizeLimit / 2) );
            console.log(scrollY);
        };

        window.addEventListener("scroll", onScroll);

        return () =>{
            window.removeEventListener("scroll", onScroll);
        } 
    }, [scrollTo]);

  return (
    <div className="Homepage">
        <img className='Homepage_BG' src='/PortfolioSite/Images/Wilderness.png' style={{ transform: `translateY(${-scrollY}px) scale(1.1)` }}/>

        { content == undefined ? 
            ( <a>Loading</a> )
            : 
            (<>
                <div onClick={() => RedirectContentPage(window, content[latestContent].id)} className='Homepage_Previews'>
                    <img className='Homepage_Entry' src={`/PortfolioSite/Content/${content[latestContent].id}/Icon.png`} />
                    <span className='Homepage_Entry'>{content[latestContent].name}</span>
                    <button className='Homepage_Entry'>Explore</button>
                </div>


                <div className='Homepage_ContentFitter'>
                    <div className='Homepage_Content Panel'>
                        <div id="Games" className='Hompage_Content_Header'><h2>Games</h2></div>
                        <Homepage_ContentGroup  content={content?.filter(x => x.type == 0)}/>
                        <div id="Projects" className='Hompage_Content_Header'><h2>Projects</h2></div>
                        <Homepage_ContentGroup content={content?.filter(x => x.type == 1)}/>

                        <div id="Links" className='Homepage_Content_Links'>
                            <a href='https://www.youtube.com/@nexx42' className='Links_Entry'>
                                <img src='/PortfolioSite/Images/Links/link_youtube.png'/>
                            </a>
                            <a href='https://github.com/NeXx42' className='Links_Entry'>
                                <img src='/PortfolioSite/Images/Links/link_github.png'/>
                            </a>
                            <a href='https://x.com/nexx42_' className='Links_Entry'>
                                <img src='/PortfolioSite/Images/Links/link_twitter.png'/>
                            </a>
                        </div>
                    </div>
                </div>
            </>)
        }
    </div>
  );
}

export default App;
