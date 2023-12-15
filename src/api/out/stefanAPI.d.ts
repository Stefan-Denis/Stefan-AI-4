export interface IStefanAPI {
    Video: {
        /**
         * 
         * @param inputFiles An array of strings[] that contains the paths constructed with path.join and __dirname of the files that will be concatenated.
         * @param outputFile A parameter of type string constructed with path.join and __dirname of the output file path.
         * @param transition An object parameter with the scheme of `{ name: string, duration: number }` that contains the name of the transition and the duration of the transition.
         * @example
         * ```js
         * const video1 = path.join(__dirname, '1017(15).mp4')
         * const video2 = path.join(__dirname, '1017(14).mp4')
         * const outputPath = path.join(__dirname, '1017.mp4')
         * 
         * StefanAPI.Video.concat([video1, video2], outputPath, { name: 'crossfade', duration: 1000 })
         * ``` 
         */
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