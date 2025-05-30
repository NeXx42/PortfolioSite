export interface HomePageData{
    name: string,
    id: string,
    type: number,
    description: string,
    updatedDate: Date | undefined
}

export interface PageContent{
    name: string,
    hideName: boolean,
    images: string[],
    tags: string[],
    content: any[]
}


export interface IDataFetchEndpoints{

    GetPageContent(id: string): Promise<any>;

    GetHomePageData(): Promise<any>;

}

export class DataFetcherEndpoint{

    dataFetcher: IDataFetchEndpoints;

    constructor(fetcher: IDataFetchEndpoints){
        this.dataFetcher = fetcher;
    }

    async GetPageContent(id: string): Promise<PageContent>{
        const response = await this.dataFetcher.GetPageContent(id);

        return { 
            name: response.Name, 
            hideName: response.hideName ?? false,
            images: response.images,
            tags: response.tags?.map((x: any) => String(x)) ?? [],
            content: response.content
        };
    }

    async GetHomePageData(): Promise<HomePageData[]> {
        const response = await this.dataFetcher.GetHomePageData();

        const mappedResponse: HomePageData[] = response.Content.filter((x: any) => !(x.Disabled ?? false)).map((x: any) => {
            return {
                name: x.Name,
                id: x.PageId,
                type: x.Catagory,
                description: x.Description,
                updatedDate: x.Updated == null ? undefined : new Date(x.Updated)
            }
        });

        return mappedResponse;
    }

}