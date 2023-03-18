import { readFileSync } from "fs"
import TSConfig from "../interfaces/TSConfig"


export default function jsonMap(path: string): TSConfig
{
    const json = readFileSync(path, "utf-8")
    return JSON.parse(json)
}