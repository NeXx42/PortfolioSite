import React from "react";
import { useParams } from 'react-router-dom';

import "./ContentPage.css"
import { DataFetcherEndpoint, PageContent } from "../utils/DataFetcher";

import Content_Devlog from "./Components/Devlog"
import Content_Controls from "./Components/Controls";

interface ContentPageState{
    scrollY: number;
    content: PageContent | undefined;
    showAllPics: boolean;
    bgZoom: number,
}

interface ContentPageProps{
    ContentPageId: string | undefined;
    dataFetcher: DataFetcherEndpoint;
}


const pictureLimit: number = 5;
const bgScrollSizeLimit = 100;

class ContentPage extends React.Component<ContentPageProps, ContentPageState>{

    constructor(props: any){
        super(props);

        this.state = {
            scrollY: 0,
            bgZoom: -(bgScrollSizeLimit / 2),
            content: undefined,
            showAllPics: false
        }

        if(this.props.ContentPageId != undefined){
            this.props.dataFetcher.GetPageContent(this.props.ContentPageId).then(x => this.setState({ content: x }));
        }

        window.scrollTo(0, 0);
        this.OnScroll = this.OnScroll.bind(this);
    }


    componentDidMount(): void
    {
        window.addEventListener("scroll", this.OnScroll);
    }
    
    OnScroll(){
        this.setState({ bgZoom: (Math.min(window.scrollY / document.documentElement.scrollHeight, 1) * bgScrollSizeLimit) - (bgScrollSizeLimit / 2) })
        this.setState({ scrollY: window.scrollY });
    }


    render(): React.ReactNode
    {
        return (
            <div className="ContentPage">
                <img className='ContentPage_BG' style={{ transform: `translateY(${-this.state.bgZoom}px) scale(1.1)` }} src='/PortfolioSite/Images/Wilderness.png'/>

                {
                    this.props.ContentPageId && this.state.content ?
                    (
                        <div className="ContentPage_Fitter">
                            <div className="ContentPage_Container Panel">
                                <div className="ContentPage_Header">
                                    <img className="ContentPage_Header" src= {`/PortfolioSite/Content/${this.props.ContentPageId}/Icon.png`}/>
                                </div>
        
                                <div className="ContentPage_Content">
                                    <div className="ContentPage_Entries">
                                        <h1 className="ContentPage_Entries_Header">{this.state.content?.name}</h1>
                                        <div className="ContentPage_Entries_Tags">
                                            {
                                                this.state.content.tags.map((x: string) => {
                                                    return (<div>{x}</div>)
                                                })
                                            }
                                        </div>

                                        {
                                            this.state.content.content?.map((x) => {
                                                switch(String(x.type ?? "").toLowerCase()){

                                                    case "devlog":
                                                        return (<Content_Devlog title={"Devlog"} pageId={this.props.ContentPageId ?? ""} data={x} />);

                                                    case "release":
                                                        return (<Content_Devlog title={"Releases"} pageId={this.props.ContentPageId ?? ""} data={x} />);

                                                    case "controls":
                                                        return (<Content_Controls pageId={this.props.ContentPageId ?? ""} data={x} />)

                                                    case "description":
                                                        return (<pre dangerouslySetInnerHTML={{ __html:x.content }}></pre>)
                                                }

                                                return (<></>)
                                            })
                                        }
                                    </div>
                                    {
                                        (this.state.content.images?.length  ?? 0) > 0 ?
                                        (
                                            <div className="ContentPage_Images">
                                                {
                                                    this.state.content.images.slice(0, this.state.showAllPics ? this.state.content.images.length : pictureLimit).map((x, index) => {
                                                        if(!this.state.showAllPics && index == pictureLimit - 1){
                                                            return (
                                                                <div onClick={() => this.setState({ showAllPics: true })} className="ContentPage_ShowAllImages">
                                                                    <img src={`/PortfolioSite/Content/${this.props.ContentPageId}/${x}`} className="ContentPage_ShowAllImages ContentPage_Image"/>
                                                                    <span className="ContentPage_ShowAllImages">Show more</span>
                                                                </div>
                                                            )
                                                        }

                                                        return (<img src={`/PortfolioSite/Content/${this.props.ContentPageId}/${x}`} className="ContentPage_Image"/>)
                                                    })
                                                }                                  
                                            </div>
                                        ) : (<></>)
                                    }

                                </div>


                            </div>
                        </div>
                    ) : (<a>Loading</a> )

                }
            </div>
        )
    }

}


const ContentPageWrapper: React.FC<{ dataFetcher: DataFetcherEndpoint }> = ({ dataFetcher }) => {
    const { desiredPageId } = useParams();
    return <ContentPage ContentPageId={desiredPageId} dataFetcher={dataFetcher} />
}

export default ContentPageWrapper;