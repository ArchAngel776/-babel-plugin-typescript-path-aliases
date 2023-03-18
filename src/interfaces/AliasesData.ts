import { MapLike } from "typescript"


export default interface AliasesData
{
    baseUrl: string | null
    paths: MapLike<Array<string>> | null
}