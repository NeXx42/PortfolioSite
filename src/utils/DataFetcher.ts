import { promises } from "dns";

export interface HomePageData{
    name: string,
    id: string,
    type: number,
    description: string
}

export interface IDataFetchEndpoints{

    GetHomePageData(): Promise<any>;

}

export class DataFetcherEndpoint{

    dataFetcher: IDataFetchEndpoints;

    constructor(fetcher: IDataFetchEndpoints){
        this.dataFetcher = fetcher;
    }

    async GetHomePageData(): Promise<HomePageData[]> {
        const response = await this.dataFetcher.GetHomePageData();

        const mappedResponse: HomePageData[] = response.Content.map((x: any) => {
            return {
                name: x.Name,
                id: x.PageId,
                type: x.Catagory,
                description: x.Description
            }
        })

        return mappedResponse;
    }

}