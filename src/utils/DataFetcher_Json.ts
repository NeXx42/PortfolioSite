import { IDataFetchEndpoints } from "./DataFetcher";

export class DataFetcher_Json implements IDataFetchEndpoints{

    async GetPageContent(id: string): Promise<any>
    {
        return await DataFetcher_Json.JsonFetch(`/PortfolioSite/Content/${id}/data.json`);
    }

    async GetHomePageData(): Promise<any>
    {
        return await DataFetcher_Json.JsonFetch("/PortfolioSite/Content/content.json");
    }

    static async JsonFetch(url: string): Promise<any>
    {
        const res = await fetch(url)

        if(!res.ok){
            throw new Error("Failed to fetch data");
        }
        
        const json = await res.json();
        return json;
    }
}