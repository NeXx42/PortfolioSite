import React from "react";
import { Navigate } from "react-router-dom";

import { RedirectContentPage } from "../utils/Helpers"
import { HomePageData } from "../utils/DataFetcher";

export default class Homepage_ContentNode extends React.Component<{ data:HomePageData }, any>{

    constructor(props: any){
        super(props);

        this.state = {
            redirect: false
        }
    }



    render(): React.ReactNode
    {
        return (
            <div onClick={() => RedirectContentPage(window, this.props.data.id)} className="Homepage_ContentNode">
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