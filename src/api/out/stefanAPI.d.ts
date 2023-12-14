export interface IStefanAPI {
    Video: {
        getVideoInfo: () => void
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