const downlineUrl = 'https://choiceservicesqaf.avon.com/myavon/reporting/v1/rest/JT/EN/rep/98612/reporting/downline?groups=PERSONAL,CORE,ASLF,AREA,LIFECYCLE,CONTACT,TAGS,FINANCIALS,ORDERINFO&gen=ALL&cmpgnId=202207&viewMode=structr&zone=';
const segmentsUrl = 'https://choiceservicesqaf.avon.com/myavon/catalog/v1/rest/JT/EN/segments'
const downlineSegmentUrl = 'https://choiceservicesqaf.avon.com/myavon/reporting/v1/rest/JT/EN/reporting/downlineSegment';


export class DataService {

    private downline = null;
    private segments = null;
    private downlineSegments = null;

    authData: {
        userId: number,
        xSecToken: string
    }

    constructor() {
    }

    get commonHeaders() {
        return {
            acctnr: this.authData.userId.toString(),
            accept: 'application/json, text/plain, */* ',
            'content-type': 'application/json',
            'x-sec-token': this.authData.xSecToken
        };
    }



    async get(url: string): Promise<any> {
        const requestInit: RequestInit = {
            headers: this.commonHeaders,
            method: 'get'
        };
        const response = await fetch(url, requestInit);
        return await response.json();
    }

    async getDownline() {
        if (this.downline)
            return Promise.resolve(this.downline);
        this.downline = await this.get(downlineUrl);
        return this.downline;
    }

    async getSegments() {
        if (this.segments)
            return Promise.resolve(this.segments);
        this.segments = await this.get(segmentsUrl);
        return this.segments;
    }

    async getDownlineSegments() {
        if (this.downlineSegments)
            return Promise.resolve(this.downlineSegments);
        this.downlineSegments = await this.get(downlineSegmentUrl);
        return this.downlineSegments;
    }


}

export const dataService = new DataService();