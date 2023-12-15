import concat from 'ffmpeg-concat'

export default async function concatenate(
    input: readonly string[],
    output: string,
    transition: {
        name: string,
        duration: number
    }) {
    await concat({
        videos: input,
        output: output,
        transition: transition
    })
}