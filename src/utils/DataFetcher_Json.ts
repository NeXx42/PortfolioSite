import { json } from "stream/consumers";
import { IDataFetchEndpoints } from "./DataFetcher";

export class DataFetcher_Json implements IDataFetchEndpoints{


    async GetHomePageData(): Promise<any>
    {
        const res = await fetch("/PortfolioSite/Content/content.json")
        if(!res.ok){
            throw new Error("Failed to fetch data");
        }
        
        const json = await res.json();
        return json;
    }
}