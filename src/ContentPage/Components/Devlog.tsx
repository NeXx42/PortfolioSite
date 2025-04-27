import React from "react";

import "./Devlog.css"

const contentLimit = 2;

export default class Content_Devlog extends React.Component<{ pageId: string, data: any, title: string }, { loadedContentCount: number }>{

    constructor(props: any){
        super(props)

        this.state = {
            loadedContentCount: Math.min(this.props.data.Entries?.length ?? 0, contentLimit)
        }
    }

    render(): React.ReactNode
    {
        return (
            <div className="Content_Devlog">
                <h2 className="ContentPage_Entries_Header">{ this.props.title }</h2>
                <div className="Content_Develog_Timeline"></div>
                { 
                    this.state.loadedContentCount > 0 ? (                    
                        this.props.data?.Entries.slice(0, this.state.loadedContentCount).map((x: any) => {
                            return (
                                <div className="Content_Devlog_Entry">
                                    <span className="Content_Devlog_Entry_Header">// {x.title}</span>
                                    <span className="Content_Devlog_Entry_Date">{x.date}</span>

                                    <div className="Content_Devlog_Entry_Content">
                                        <div className="Content_Devlog_Entry_Content_Visuals">
                                            { (x.visuals?.length ?? 0) > 0 ?
                                                (
                                                    x.visuals.map((v: any) => {
                                                        if(v.img != undefined){
                                                            if(v.padded ?? false){
                                                                return (
                                                                    <div className="Content_Devlog_Entry_Content_Visuals_PaddedIMG">
                                                                        <img src={`/PortfolioSite/Content/${this.props.pageId}/${v.img}`}/>
                                                                        <img src={`/PortfolioSite/Content/${this.props.pageId}/${v.img}`}/>
                                                                    </div>
                                                                )
                                                            }

                                                            return (<img src={`/PortfolioSite/Content/${this.props.pageId}/${v.img}`}/>)
                                                        }
                                                        else if(v.vid != undefined){
                                                            /* return (
                                                                <div  className="info-media info-media-container" dangerouslySetInnerHTML={{ __html:
                                                                    `<iframe width="100%" height="100%" src=https://www.youtube.com/embed/${v.vid} title="YouTube video player" frameBorder=0 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>`
                                                                }} />
                                                            ) */
                                                            return (<></>)

                                                        }
                                                        
                                                    })
                                                ) : (<></>)
                                            }
                                        </div>

                                        <pre dangerouslySetInnerHTML={{ __html: x.description }}></pre>
                                    </div>
                                </div>
                            )
                        })
                    ) :
                    ( <></> )           
                }
                {
                    this.state.loadedContentCount > 0 && this.state.loadedContentCount < this.props.data.Entries.length ? (

                        <div className="Content_Develog_Loader">
                            <button onClick={() => this.setState({ loadedContentCount: this.state.loadedContentCount + contentLimit })}>Load more</button>
                        </div>

                    ) : (<></>)
                }
            </div>
        )
    }

}