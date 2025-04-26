import React from "react";
import { Navigate } from "react-router-dom";

import { HomePageData } from "../utils/DataFetcher";

export default class Homepage_ContentNode extends React.Component<{ data:HomePageData }, any>{

    constructor(props: any){
        super(props);

        this.state = {
            redirect: false
        }
    }

    requestRedirect = () => {
        window.scrollTo(0, 0);
        window.location.hash = `#/${this.props.data.id}/content`;
    } 

    render(): React.ReactNode
    {
        return (
            <div onClick={this.requestRedirect} className="Homepage_ContentNode">
                <img className="Homepage_ContentNode_Icon" src={`/PortfolioSite/Content/${this.props.data.id}/Icon.png`} />
                <div className="Homepage_ContentNode_Info">
                    <span className="Homepage_ContentNode_Info">{this.props.data.name}</span>
                    <p className="Homepage_ContentNode_Info">{this.props.data.description}</p>
                    <button className="Homepage_ContentNode_Info">View more</button>
                </div>
            </div>
        )
    }

}