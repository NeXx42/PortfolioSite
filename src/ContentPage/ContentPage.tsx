import React from "react";
import { useParams } from 'react-router-dom';

import "./ContentPage.css"

interface ContentPageState{
    scrollY: number;
}

interface ContentPageProps{
    ContentPageId: String | undefined
}


class ContentPage extends React.Component<ContentPageProps, ContentPageState>{

    constructor(props: any){
        super(props);

        this.state = {
            scrollY: 0,
        }

        this.LoadPageContent();
        this.OnScroll = this.OnScroll.bind(this);
    }


    LoadPageContent(){
        
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

                <div className="ContentPage_Fitter">
                    <div className="ContentPage_Container Panel">
                        <div className="ContentPage_Header">
                            <h1 className="ContentPage_Header">VR FPS</h1>
                            <img className="ContentPage_Header" src="/PortfolioSite/Images/Untitled.png"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}


const ContentPageWrapper = () => {
    const { desiredPageId } = useParams();
    return <ContentPage ContentPageId={desiredPageId} />
}

export default ContentPageWrapper;