export interface IStefanAPI {
    Video: {
        concat: (inputFiles: readonly string[], outputFile: string, transition: { name: string, duration: number }) => void
    }
    Audio: {
        getAudioInfo: () => void
    }
    Subtitles: {
        getSubtitlesInfo: () => void
    }
    Functions: {
        asyncWait: (ms: number) => Promise<void>
    }
}

declare const StefanAPI: IStefanAPI
export default StefanAPI