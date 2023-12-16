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
        /**
         * @param input 
         * @param output 
         * @example
         * ```ts
         * const audio1 = path.join(__dirname, 'audio1.mp3')
         * const audio2 = path.join(__dirname, 'audio2.mp3')
         * const outputPath = path.join(__dirname, 'audio.mp3')
         * 
         * await StefanAPI.Audio.concat([audio1, audio2], outputPath)
         * ```
         */
        concat: (input: string[], output: string) => Promise<boolean>

        /**
         * 
         * @param input 
         * @param output 
         * @param start 
         * @param end 
         * @example
         * ```ts
         * const audio1 = path.join(__dirname, 'audio1.mp3')
         * const outputPath = path.join(__dirname, 'audio.mp3')
         * 
         * await StefanAPI.Audio.trim(audio1, outputPath, 0, 2)
         * ```
         */
        trim: (input: string, output: string, start: number, end: number) => Promise<boolean>
    }
    Subtitles: {
        /**
         * Make sure to have your subtitle file prepared beforehand with all the settings you want, this method will only append the subtitles to the file.
         * Audio Gets automatically converted to .wav
         * @param inputAudio 
         * @param transcriptPath 
         * @param outputSubtitlesPath 
         * @example
         * ```ts
         * const audio = path.join(__dirname, 'audio.mp3')
         * const transcript = path.join(__dirname, 'transcript.lab')
         * const subtitles = path.join(__dirname, 'subtitles.ass')
         * 
         * ```
         */
        audioToSubtitles: (inputAudio: string, transcriptPath: string, outputSubtitlesPath: string) => Promise<boolean>

        /**
         * @param input 
         * @param output 
         * @example
         * ```ts
         * const input = 'Hello World'
         * const output = await StefanAPI.Subtitles.SSMLParser(input)
         * 
         * console.log(output) // <p><s>Hello World</s></p> 
         * ```
         */
        SSMLParser: (input: string, output: string) => Promise<string>
    }
    Functions: {
        /**
         * @param ms 
         * @returns 
         */
        asyncWait: (ms: number) => Promise<void>
    }
}

declare const StefanAPI: IStefanAPI
export default StefanAPI