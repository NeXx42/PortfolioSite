import React from "react";

import "./Controls.css"

export default class Content_Controls extends React.Component<{ pageId: string, data: any }, any>{
    render(): React.ReactNode
    {
        return (
            <div className="Content_Controls">
                {
                    (this.props.data.Entries?.length ?? 0) > 0 ?
                    (
                        this.props.data.Entries.map((x: any) => {
                            return (<button>{x.label}</button>)
                        })
                    ) : (<></>)
                }
            </div>
        )
    }
}