export default function tsConfigGlob(workSpace: string): [string, string]
{
    return [`${workSpace}/tsconfig.json`, `${workSpace}/tsconfig.*.json`]
}