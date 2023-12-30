/**
 * @author Ștefan Denis
 * @version 4.0.0
 * @since 15.12.2023
 * @description Source File that contains the function to concatenate multiple audio files.
 *
 * @project Stefan AI 4
 */
/**
 * Imports
 */
import ffmpeg from 'fluent-ffmpeg';
export default function concat(inputAudios, outputAudio) {
    return new Promise((resolve, reject) => {
        const command = ffmpeg();
        // Add all input audio files
        inputAudios.forEach((audioPath) => {
            command.input(audioPath);
        });
        command
            .outputOptions('-filter_complex', 'concat=n=' + inputAudios.length + ':v=0:a=1')
            .outputOptions('-b:a 320k') // Highest bitrate for audio
            .output(outputAudio)
            .on('end', () => {
            resolve(true);
        })
            .on('error', (error) => {
            reject(error);
        })
            .run();
    });
}
