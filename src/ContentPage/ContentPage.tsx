import React from "react";
import { useParams } from 'react-router-dom';

import "./ContentPage.css"
import { DataFetcherEndpoint, PageContent } from "../utils/DataFetcher";

import Content_Devlog from "./Components/Devlog"

interface ContentPageState{
    scrollY: number;
    content: PageContent | undefined;
    showAllPics: boolean;
}

interface ContentPageProps{
    ContentPageId: string | undefined;
    dataFetcher: DataFetcherEndpoint;
}


const pictureLimit: number = 5;

class ContentPage extends React.Component<ContentPageProps, ContentPageState>{

    constructor(props: any){
        super(props);

        this.state = {
            scrollY: 0,
            content: undefined,
            showAllPics: false
        }

        if(this.props.ContentPageId != undefined){
            this.props.dataFetcher.GetPageContent(this.props.ContentPageId).then(x => this.setState({ content: x }));
        }

        this.OnScroll = this.OnScroll.bind(this);
    }


    componentDidMount(): void
    {
        window.addEventListener("scroll", this.OnScroll);
    }
    
    OnScroll(){
        this.setState({ scrollY: window.scrollY });
    }


    render(): React.ReactNode
    {
        return (
            <div className="ContentPage">
                <a>{this.state.scrollY}</a>
                <img className='ContentPage_BG' src='/PortfolioSite/Images/Wilderness.png'/>

                {
                    this.props.ContentPageId && this.state.content ?
                    (
                        <div className="ContentPage_Fitter">
                            <div className="ContentPage_Container Panel">
                                <div className="ContentPage_Header">
                                    <h1 className="ContentPage_Header">{this.state.content?.name}</h1>
                                    <img className="ContentPage_Header" src= {`/PortfolioSite/Content/${this.props.ContentPageId}/Icon.png`}/>
                                </div>
        
                                <div className="ContentPage_Content">
                                    <div className="ContentPage_Entries">
                                        {
                                            this.state.content.content?.map((x) => {
                                                switch(String(x.type ?? "").toLowerCase()){

                                                    case "devlog":
                                                        return (<Content_Devlog pageId={this.props.ContentPageId ?? ""} data={x} />);
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