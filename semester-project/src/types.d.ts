declare namespace NodeJS {
    export interface ProcessEnv {
        readonly BASE_API_URL: string;
        readonly PAGE_SIZE: string;
        readonly DATABASE_URL: string;
        readonly CONTENTFUL_SPACE_ID: string;
        readonly CONTENTFUL_ACCESS_TOKEN: string;
    }
}