import React from "react";

export default class Homepage_ContentNode extends React.Component{

    render(): React.ReactNode
    {
        return (
            <div className="Homepage_ContentNode">
                <img className="Homepage_ContentNode_Icon" src="PortfolioSite/Images/Untitled.png" />
                <div className="Homepage_ContentNode_Info">
                    <span className="Homepage_ContentNode_Info">Rouge like FPS</span>
                    <p className="Homepage_ContentNode_Info">A first person shooter where you fight hoards of enemies with varying attack patterns. Killing these enemies reward you with souls that can be used to gather different abilites to aid you in your gameplay.</p>
                    <button className="Homepage_ContentNode_Info">View more</button>
                </div>
            </div>
        )
    }

}