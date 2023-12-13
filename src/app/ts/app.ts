/**
 * @author Ștefan Denis
 * @version 4.0.0
 * @since 12.12.2023
 * @description Source File that will have the role to make the modules work together.
 * 
 * @project Stefan AI 4
 */

/**
 * * API
 */
import StefanAPI from '../../api/out/stefanAPI.js'

/**
 * * Node.JS Modules
 */
import * as cliProgress from 'cli-progress'
import inquirer from 'inquirer'
import chalk from 'chalk'
import fs from 'fs-extra'
import path from 'path'

/**
 * * Create __dirname 
 */
import { fileURLToPath, pathToFileURL } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * @class Main
 * Main Class of the app
 * Contains the main function, where app starts
 */
class Main {
    /**
     * Initial Load Menu
     */
    static async initialLoadMenu() {
        Text.breakLine()
        console.log(' Loading Data...')
        await Loader.main()
        Text.clearHost()
    }

    /**
     * Display Main Menu Logo
     */
    static async displayLogo() {
        Text.breakLine()

        const spacing = ' '.repeat(11)
        console.log(spacing + chalk.underline(chalk.white(' Stefan AI 4 ')))
        console.log(spacing + chalk.underline(chalk.white('Version 4.0.0')))
    }

    /**
     * Retrieve all potential modules
     */
    static async retrieveModules() {
        const modules: Array<string> = fs.readdirSync(path.join(__dirname, '../modules'))
        return modules
    }

    /**
     * Validate the possible modules and add them to the validatedModules array
     * @param modules 
     * @param validatedModules 
     */
    static async validateModules(modules: Array<string>, validatedModules: Array<string>) {
        modules.forEach((moduleFolder: string) => {
            const moduleFolderFiles = fs.readdirSync(path.join(__dirname, `../modules/${moduleFolder}`))

            moduleFolderFiles.forEach((moduleFolderFile: string) => {
                if (moduleFolderFile === 'stefan-module.json') {
                    validatedModules.push(moduleFolder)
                }
            })
        })
    }

    /**
     * Create the module data matrix
     * @param validatedModules 
     * @param moduleData 
     */
    static async createModuleDataMatrix(validatedModules: Array<string>, moduleData: Array<Array<string>>) {
        validatedModules.forEach((moduleFolder: string) => {
            const modulePath = path.join(__dirname, `../modules/${moduleFolder}`)
            const data: StefanModuleData = fs.readJSONSync(path.join(modulePath, 'stefan-module.json'))

            moduleData[0].push(data.Name)
            moduleData[1].push(modulePath)
        })
    }

    static async main() {
        /**
         * * Visual Loader for the app
         */
        await Main.initialLoadMenu()

        /**
         * * Display the logo
         */
        await Main.displayLogo()

        /**
         * * Retrieve all folders inside the modules folder
         */
        const modules: Array<string> = await Main.retrieveModules()

        /**
         * * Variable that contains the modules that are validated
         * * Validated -> the module has the stefan-module.json file
         */
        const validatedModules: Array<string> = []

        /**
         * * Find the folders with the stefan-module.json file
         */
        await Main.validateModules(modules, validatedModules)

        /**
         * * Module Data Matrix which holds in slot 0 the filepath and in slot 1 the name
         */
        const moduleData: Array<Array<string>> = [[], []]

        /**
         * * Create the module data matrix
         */
        await Main.createModuleDataMatrix(validatedModules, moduleData)

        /**
         * * Inquirer
         */
        Text.breakLine()

        const choice = inquirer.prompt([{
            type: 'list',
            name: 'action',
            message: 'Which module would you like to use?',
            choices: moduleData[0].concat(['exit'])
        }])
            .then(async (answers: any) => {
                /**
                 * * Exit the program if the user selects exit
                 */
                if (answers.action === 'exit') { Text.clearHost(); process.exit(0) }

                /**
                 * * Clear the console and display the selected module
                 * * All done in a 1-line-solution to save space
                 */
                Text.clearHost(); Text.breakLine(); console.log('Selected Module: ' + chalk.bgGreen(chalk.white(answers.action))); Text.breakLine()

                /**
                 * * Load the module
                 * * Display a nice loader while loading the module
                 */
                console.log(' Loading Module...')
                await Loader.main()
                Text.clearHost()

                /**
                 * * Load the module
                 */
                await LoadModule.loadModule(answers.action, moduleData)
            })
    }
}

/**
 * @class LoadModule
 * Loads the module that the user selected
 */
class LoadModule {
    static async loadModule(module: string, modules: Array<Array<string>>) {
        await StefanAPI.Functions.asyncWait(1000)

        // * Find the module file to execute, return all files that end with '-module.js'
        const moduleIndex = modules[0].indexOf(module); const modulePath = modules[1][moduleIndex]
        const files = fs.readdirSync(modulePath).filter((file: string) => file.endsWith('-module.js'))

        if (files.length === 0) { // * If no module files are found, exit the program
            console.log(chalk.red('No Module Files Found!'))
            process.exit(0)
        } else if (files.length > 1) { // * If multiple module files are found, exit the program
            console.log(chalk.red('Multiple Module Files Found!'))
            console.log(chalk.red('Please make sure that only one module file is present!'))
            process.exit(0)
        } else { // * If only one module file is found, load it

            // * Create the path to the module file
            const moduleFile = files[0]
            const moduleFilePath = path.join(modulePath, moduleFile)

            // * Construct path to module file using the `file://` style and import it
            const moduleURL = pathToFileURL(moduleFilePath)
            const module = await import(moduleURL.href)

            // * Execute the module
            await module.main()
        }
    }
}

/**
 * @class Loader
 * Provides a visual loader for the app
 * does not serve a real purpose, but to make the app look better
 */
class Loader {
    static async main() {
        const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
        progressBar.start(100, 0)
        let progress = 0
        while (progress < 100) {
            await StefanAPI.Functions.asyncWait(1)
            progress += 1
            progressBar.update(progress)
        }
        progressBar.stop()
    }
}

class Text {
    static async breakLine() {
        Text.breakLine()
    }

    static async clearHost() {
        Text.clearHost()
    }
}

/**
 * * Interface for the stefan-module.json file
 * * Only contains the needed data for the current process
 */
interface StefanModuleData { Name: string }

/**
 * * Program Start
 */
await Main.main()