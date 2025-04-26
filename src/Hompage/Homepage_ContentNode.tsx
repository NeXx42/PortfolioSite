import React from "react";

import { HomePageData } from "../utils/DataFetcher";

export default class Homepage_ContentNode extends React.Component<{ data:HomePageData }, any>{

    render(): React.ReactNode
    {
        return (
            <div className="Homepage_ContentNode">
                <img className="Homepage_ContentNode_Icon" src={`/PortfolioSite/Content/${this.props.data.id}/icon.png`} />
                <div className="Homepage_ContentNode_Info">
                    <span className="Homepage_ContentNode_Info">{this.props.data.name}</span>
                    <p className="Homepage_ContentNode_Info">{this.props.data.description}</p>
                    <button className="Homepage_ContentNode_Info">View more</button>
                </div>
            </div>
        )
    }

}