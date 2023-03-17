import plugin from "@main/index"
import {} from "@main/interfaces/AliasesData"

export default function printPluginCode(): void
{
    console.log(plugin.toString())
}