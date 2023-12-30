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
import StefanAPI from '../../api/out/stefanAPI.js';
/**
 * * Node.JS Modules
 */
import * as cliProgress from 'cli-progress';
import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
/**
 * * Create __dirname
 */
import { fileURLToPath, pathToFileURL } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
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
        Text.breakLine();
        console.log(' Loading Data...');
        await Loader.main();
        Text.clearHost();
    }
    /**
     * Display Main Menu Logo
     */
    static displayLogo() {
        Text.breakLine();
        const spacing = ' '.repeat(11);
        console.log(spacing + chalk.underline(chalk.white(' Stefan AI 4 ')));
        console.log(spacing + chalk.underline(chalk.white('Version 4.0.0')));
    }
    /**
     * Retrieve all potential modules
     */
    static retrieveModules() {
        try {
            const modules = fs.readdirSync(path.join(__dirname, '../modules'));
            return modules;
        }
        catch (err) {
            console.log(chalk.bgRed('Modules Folder Not Found!'));
            process.exit(1);
        }
    }
    /**
     * Validate the possible modules and add them to the validatedModules array
     * @param modules
     * @param validatedModules
     */
    static validateModules(modules, validatedModules) {
        modules.forEach((moduleFolder) => {
            try {
                const moduleFolderFiles = fs.readdirSync(path.join(__dirname, `../modules/${moduleFolder}`));
                moduleFolderFiles.forEach((moduleFolderFile) => {
                    if (moduleFolderFile === 'stefan-module.json') {
                        validatedModules.push(moduleFolder);
                    }
                });
            }
            catch (err) {
                console.log(chalk.bgRed('Module Folder Not Found!'));
                process.exit(1);
            }
        });
    }
    /**
     * Create the module data matrix
     * @param validatedModules
     * @param moduleData
     */
    static async createModuleDataMatrix(validatedModules, moduleData) {
        validatedModules.forEach((moduleFolder) => {
            const modulePath = path.join(__dirname, `../modules/${moduleFolder}`);
            try { // * Check if the file exists, if not, stop the app
                fs.existsSync(path.join(modulePath, 'stefan-module.json'));
            }
            catch (err) {
                Text.clearHost();
                console.log(chalk.bgRed('stefan-module.json file not found!'));
                process.exit(1);
            }
            try { // * Check if the file is valid, if it is, then read and add the data
                const data = fs.readJSONSync(path.join(modulePath, 'stefan-module.json'));
                moduleData[0].push(data.Name);
                moduleData[1].push(modulePath);
            }
            catch (err) {
                console.log(chalk.bgRed('stefan-module.json file is invalid!'));
                process.exit(1);
            }
        });
    }
    static async main() {
        /**
         * * Visual Loader for the app
         */
        await Main.initialLoadMenu();
        /**
         * * Display the logo
         */
        Main.displayLogo();
        /**
         * * Retrieve all folders inside the modules folder
         */
        const modules = Main.retrieveModules();
        /**
         * * Variable that contains the modules that are validated
         * * Validated -> the module has the stefan-module.json file
         */
        const validatedModules = [];
        /**
         * * Find the folders with the stefan-module.json file
         */
        Main.validateModules(modules, validatedModules);
        /**
         * * Module Data Matrix which holds in slot 0 the filepath and in slot 1 the name
         */
        const moduleData = [[], []];
        /**
         * * Create the module data matrix
         */
        await Main.createModuleDataMatrix(validatedModules, moduleData);
        /**
         * * Inquirer
         */
        Text.breakLine();
        const choice = inquirer.prompt([{
                type: 'list',
                name: 'action',
                message: 'Which module would you like to use?',
                choices: moduleData[0].concat(['exit'])
            }])
            .then(async (answers) => {
            /**
             * * Exit the program if the user selects exit
             */
            if (answers.action === 'exit') {
                Text.clearHost();
                process.exit(0);
            }
            /**
             * * Clear the console and display the selected module
             * * All done in a 1-line-solution to save space
             */
            Text.clearHost();
            Text.breakLine();
            console.log('Selected Module: ' + chalk.bgGreen(chalk.white(answers.action)));
            Text.breakLine();
            /**
             * * Load the module
             * * Display a nice loader while loading the module
             */
            console.log(' Loading Module...');
            await Loader.main();
            Text.clearHost();
            /**
             * * Load the module
             */
            await LoadModule.loadModule(answers.action, moduleData);
        });
    }
}
/**
 * @class LoadModule
 * Loads the module that the user selected
 */
class LoadModule {
    static async loadModule(module, modules) {
        await StefanAPI.Functions.asyncWait(1000);
        // * Find the module file to execute, return all files that end with '-module.js'
        const moduleIndex = modules[0].indexOf(module);
        const modulePath = modules[1][moduleIndex];
        try {
            fs.existsSync(modulePath);
        }
        catch (err) {
            console.log(chalk.red('Module Folder Not Found!'));
            process.exit(0);
        }
        const files = fs.readdirSync(modulePath).filter((file) => file.endsWith('-module.js'));
        if (files.length === 0) { // * If no module files are found, exit the program
            console.log(chalk.red('No Module Files Found!'));
            process.exit(0);
        }
        else if (files.length > 1) { // * If multiple module files are found, exit the program
            console.log(chalk.red('Multiple Module Files Found!'));
            console.log(chalk.red('Please make sure that only one module file is present!'));
            process.exit(0);
        }
        else { // * If only one module file is found, load it
            await LoadModule.executeModule(files, modulePath);
        }
    }
    /**
     * Execute the Selected Module
     * @param files
     * @param modulePath
     */
    static async executeModule(files, modulePath) {
        // * Create the path to the module file
        const moduleFile = files[0];
        const moduleFilePath = path.join(modulePath, moduleFile);
        // * Construct path to module file using the `file://` style and import it
        const moduleURL = pathToFileURL(moduleFilePath);
        const module = await import(moduleURL.href);
        // * Execute the module
        await module.main();
    }
}
/**
 * @class Loader
 * Provides a visual loader for the app
 * does not serve a real purpose, but to make the app look better
 */
class Loader {
    static async main() {
        const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
        progressBar.start(100, 0);
        let progress = 0;
        while (progress < 100) {
            await StefanAPI.Functions.asyncWait(1);
            progress += 1;
            progressBar.update(progress);
        }
        progressBar.stop();
    }
}
class Text {
    static breakLine() {
        console.log('\n');
    }
    static clearHost() {
        console.clear();
    }
}
/**
 * * Program Start
 */
await Main.main();
