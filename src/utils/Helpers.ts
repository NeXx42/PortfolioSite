export function RedirectContentPage(window: any, pageId: string) {
    window.location.hash = `#/${pageId}/content`;
} 

export function RedirectHomePage(pageTag: string | undefined = undefined){
    window.location.hash = pageTag != undefined ? `#${pageTag}` : "/";
}