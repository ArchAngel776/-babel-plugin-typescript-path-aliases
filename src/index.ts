import { dirname, relative } from "path"
import { globSync } from "glob"
import { PluginObj, NodePath, PluginPass } from "@babel/core"
import { ImportDeclaration } from "@babel/types"
import { getRootPathSync } from "get-root-path"
import ConfigCompiler from "./components/ConfigCompiler"
import tsConfigGlob from "./hooks/tsConfigGlob"
import loadJson from "./hooks/loadJson"

const root = getRootPathSync()

export default function (): PluginObj
{
    return {
        visitor: {
            ImportDeclaration(path: NodePath<ImportDeclaration>, state: PluginPass): void
            {
                if (state.filename && path.get("source").isStringLiteral()) {
                    const { source } = path.node
                    
                    let workSpace = state.filename

                    while (relative(root, workSpace)) {
                        workSpace = dirname(workSpace)

                        const tsConfigPaths = globSync(tsConfigGlob(workSpace))
                        const tsConfigs = tsConfigPaths.map(loadJson)

                        if (tsConfigs.length) {
                            const compiler = new ConfigCompiler(state.filename, workSpace)
                            tsConfigs.forEach(config => compiler.compile(source, config))
                        }
                    }

                    path.set("source", source)
                }
            }
        }
    }
}