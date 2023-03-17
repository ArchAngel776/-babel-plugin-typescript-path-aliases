const regExp = /^\*+$/

export default function rootPath(pattern: string): string
{
    const segments = pattern.split("/")

    while (segments.length) {
        if (regExp.test(segments[0])) {
            segments.splice(0, 1)
        }
        else if (regExp.test(segments[segments.length - 1])) {
            segments.splice(segments.length - 1, 1)
        }
        else {
            break
        }
    }

    return segments.join("/")
}