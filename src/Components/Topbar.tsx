import React from "react";

import "./Topbar.css"



export default class Topbar extends React.Component<any, { scrollY: number }>{

    constructor(props: any){
        super(props);

        this.state = {
            scrollY: 0
        }
    }

    componentDidMount(): void
    {
        window.addEventListener("scroll", () => this.setState({ scrollY: window.scrollY }));
    }


    render(): React.ReactNode {
        return (
            <div className='Topbar' data-active={this.state.scrollY > 0 ? "active" : "inactive" }>
                <img src="/PortfolioSite/Images/Profile.png"/>
                <div>
                    <ul>
                        <li><span className="Topbar_Entry">Home</span></li>
                        <li><span className="Topbar_Entry">Projects</span></li>
                        <li><span className="Topbar_Entry">Games</span></li>
                        <li><span className="Topbar_Entry">Links</span></li>
                    </ul>
                </div>
            </div>
        );
    }

}