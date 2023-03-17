import { StringLiteral } from "@babel/types";
import { MapLike } from "typescript";
import TSConfig from "../interfaces/TSConfig";
import AliasesData from "../interfaces/AliasesData";
export default class ConfigCompiler {
    protected target: string;
    protected workSpace: string;
    constructor(target: string, workSpace: string);
    compile(source: StringLiteral, tsConfig: TSConfig): void;
    isInScope(tsConfig: TSConfig): boolean;
    checkRoots(tsConfig: TSConfig): boolean;
    protected getIncludes(tsConfig: TSConfig): Array<string> | null;
    protected getBaseURL(tsConfig: TSConfig): string | null;
    protected getPaths(tsConfig: TSConfig): MapLike<Array<string>> | null;
    protected getAliasesData(tsConfig: TSConfig): AliasesData;
    protected matchPatterns(path: string): boolean;
    get rel(): string;
}
