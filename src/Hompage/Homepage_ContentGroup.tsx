import React from "react";
import Homepage_ContentNode from "./Homepage_ContentNode";

import "./Homepage_ContentGroup.css"
import { HomePageData } from "../utils/DataFetcher";


interface props{
    content: HomePageData[] | undefined;
}

export default class Homepage_ContentGroup extends React.Component<props, any>{
    constructor(props: props){
        super(props);
    }

    render(): React.ReactNode
    {
        return (
            <div className="Homepage_ContentGroup">
                {
                    (this.props.content?.length ?? 0) > 0 ?
                    (
                        this.props.content?.map(x => {
                            return ( <Homepage_ContentNode data={x}/> )
                        })
                    ) 
                    : (
                        (<a>No content</a>)
                    )
                }

            </div>
        );
    }

}