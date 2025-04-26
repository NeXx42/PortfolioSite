import React from "react";
import Homepage_ContentNode from "./Homepage_ContentNode";

import "./Homepage_ContentGroup.css"

export default class Homepage_ContentGroup extends React.Component{


    render(): React.ReactNode
    {
        return (
            <div className="Homepage_ContentGroup">
                <Homepage_ContentNode/>
                <Homepage_ContentNode/>
                <Homepage_ContentNode/>
            </div>
        );
    }

}