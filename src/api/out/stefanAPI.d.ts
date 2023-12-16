/**
 * @typedef {Object} IStefanAPI
 * @property {Object} Video
 * @property {Function} Video.concat
 * @property {Function} Video.trim
 * @property {Function} Video.removeAudio
 * @property {Function} Video.addAudio
 * @property {Object} Audio
 * @property {Function} Audio.concat
 * @property {Function} Audio.trim
 * @property {Object} Subtitles
 * @property {Function} Subtitles.audioToSubtitles
 * @property {Function} Subtitles.SSMLParser
 * @property {Function} Subtitles.AddASSA
 * @property {Object} Functions
 * @property {Function} Functions.asyncWait
 */
export interface IStefanAPI {
    Video: {
        /**
         * @param inputFiles An array of strings[] that contains the paths constructed with path.join and __dirname of the files that will be concatenated.
         * @param outputFile A parameter of type string constructed with path.join and __dirname of the output file path.
         * @param transition An object parameter with the scheme of `{ name: string, duration: number }` that contains the name of the transition and the duration of the transition.
         * 
         * @example
         * ```ts
         * const video1 = path.join(__dirname, '1017(15).mp4')
         * const video2 = path.join(__dirname, '1017(14).mp4')
         * const outputPath = path.join(__dirname, '1017.mp4')
         * 
         * await StefanAPI.Video.concat([video1, video2], outputPath, { name: 'crossfade', duration: 1000 })
         * ``` 
         */
        concat: (inputFiles: readonly string[], outputFile: string, transition: { name: string, duration: number }) => Promise<boolean>

        /**
         * @param input Input file path, constructed with path.join and __dirname.
         * @param output Output file path, constructed with path.join and __dirname.
         * @param start Start Time in seconds.
         * @param end End time in seconds
         * 
         * @example
         * ```ts
         * const video1 = path.join(__dirname, '1017(15).mp4')
         * const outputPath = path.join(__dirname, '1017.mp4')
         * 
         * await StefanAPI.Video.trim(video1, outputPath, 0, 2)
         * ```
         */
        trim: (input: string, output: string, start: number, end: number) => Promise<boolean>

        /**
         * @param input Input file path, constructed with path.join and __dirname.
         * @param output Output file path, constructed with path.join and __dirname.
         * 
         * @example
         * ```ts
         * const video1 = path.join(__dirname, '1017(15).mp4')
         * const outputPath = path.join(__dirname, '1017.mp4')
         * 
         * await StefanAPI.Video.removeAudio(video1, outputPath)
         * ```
         */
        removeAudio: (input: string, output: string) => Promise<boolean>

        /**
         * @param input Input file path, constructed with path.join and __dirname.
         * @param audio Audio file path, constructed with path.join and __dirname.
         * @param output Output file path, constructed with path.join and __dirname.
         * 
         * @example
         * ```ts
         * const video1 = path.join(__dirname, '1017(15).mp4')
         * const audio = path.join(__dirname, 'audio.mp3')
         * const outputPath = path.join(__dirname, '1017.mp4')
         * 
         * await StefanAPI.Video.addAudio(video1, audio, outputPath)
         * ```
         */
        addAudio: (input: string, audio: string, output: string) => Promise<boolean>
    }
    Audio: {
        concat: (input: string[], output: string) => Promise<boolean>
        trim: (input: string, output: string, start: number, end: number) => Promise<boolean>
    }
    Subtitles: {
        audioToSubtitles: (audioLocation: string, subtitlesLocation: string, output: string) => Promise<boolean>
        SSMLParser: (input: string, output: string) => Promise<boolean>
        AddASSA: (input: string, output: string) => Promise<boolean>
    }
    Functions: {
        asyncWait: (ms: number) => Promise<void>
    }
}

declare const StefanAPI: IStefanAPI
export default StefanAPI