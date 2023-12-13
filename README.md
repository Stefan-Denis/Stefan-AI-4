# Stefan AI 4

Whilst Stefan AI 3 was decent, it was too hard to create output videos that got tons of success. 

I have come to the conclusion that there must be some manual work done in each video. The AI could not get a good hook for the video, it lacked understanding of human emotions and how dopamine worked. It had a washed-up version of how everything worked, from a leftist persepctive.

This is why Stefan AI 4 will use a "modules system" so that functionality can expand. Since no one will have access to this app, it does not demand a complex UI made in React, it can work fine with WinForms and CLI interfaces.

The app have at its core, as I have said earlier, a module system. Each module has its own folder directory in which it works in, and will be managed by the system.

## Dependencies

* C++ desktop development package from Visual Studio 2022
* MFA
* Python
* Miniconda
* FFMpeg
* NodeJS

(These tools will come included with the app, and will have installation scripts)

## Version Control and packages.

There will be 2 versions of this app made. One where it relies on NPM, and one complete version kept safe, in case a package dissapears off of NPM or something happens to MFA.

## Module System

Modules will act as individual app features and need to have the following:
1. HTTP Server
2. Standardised folder structure
3. Use API calls instead of creating functions
4. Use ESLint
5. Have Strict Type Checking
6. Have it's own NPM Packages and TSConfig 
7. Have it's own github repo/branch

### File Structure: 

```
ui 
node_modules
src -----------------------> http.ts
out (output js files)ㅤㅤ |-> app.ts 
ㅤㅤㅤㅤㅤㅤㅤㅤ     ㅤㅤ  ㅤ|-> other files and folders

module.js
module.ts
.eslintrc
package.json
package-lock.json
.md/.rst or any docs file
Stefan-Module.json
```

### Stefan-Module.json:
```json
{
    "Name": "...", // Module Name
    "Version": "1.0" || "1.0.0",
    "Description": "...",
    "Port": "..."
}
```

### Allowed Ports:

1. 19000 to 20000 range (Least Important Modules)
2. 3568 to 3700 range (Regular Modules)
3. 491 to 499 range (Money-Maker Modules)


## API

The API will contain many useful calls to easily develop modules in a standard way.

There are 3 main API offered by "Stefan API":

1. Video API
    - It will feature calls to process videos with ffmpeg, such as:
    ["concatenation", "trimming", "overlay", "remove audio", "add audio", "upscale" ]

2. Audio API 
    - It will contain calls to handle the following operations:
    ["concatenating", "trimming"]

3. Subtitles API
    - It will handle calls for the following operations:
    ["Audio -> Subtitles", "SSML Parser"]


## Create Module

* Name: Respect the following filename format for module js files:
    ###-module.js <br/>
     |<br/>
     |--> Can be replaced with anything

* Only 1 module file

* For the app to run the package, it must be inside a main function like this:
```js
export async function main() {
    /**
     * All code must be or link to this function
     * The package manager runs only the main function
     */
}
```

