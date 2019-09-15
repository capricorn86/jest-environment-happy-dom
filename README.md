# Happy DOM Jest Environment
A Jest DOM environment with support for web components.

[Read more about Happy DOM](https://github.com/capricorn86/happy-dom)



# DOM Features

- Custom Elements (Web Components)

- Shadow Root (Shadow DOM)

- Mutation Observer

- Tree Walker

- Fetch
  

  And much more..




# How to Install

```bash
npm install jest-environment-happy-dom --save-dev
```




# Setup

Jest uses [jsdom](https://github.com/jsdom/jsdom) as test environment by default. In order to tell Jest to use a different environment we will either have to set a CLI attribute or add a property your Jest config file.



## CLI

This guide will explain how to tell Jest to use Happy DOM by setting a CLI attribute.

1. Edit package.json
2. Add "--env=jest-environment-happy-dom" as an attribute to your Jest command.

    ```json
    {
        ...
        "scripts": {
            "test": "jest --env=jest-environment-happy-dom"
        },
        "devDependencies": {
            "jest": "^24.8.0",
            "jest-environment-happy-dom": "^0.0.1"
        }
    }
    ```

3. Save the file.



## Configuration File

This guide will explain how to tell Jest to use Happy DOM by adding a property to your Jest config file.

1. Edit your Jest config file (usually jest.config.js)
2. Add the following to it:
    ```json
    {
      ...
      "testEnvironment": "jest-environment-happy-dom"
    }
    ```
3. Save the file.



# Known Limitations

Happy DOM supports the most common functionality of a DOM, but there are some features that are not supported yet. 

If you have a need for a missing feature or if you have found a bug, please let me know, and I will do my best to fix it.



# Release Notes

| Version | Date       | Description      |
| ------- | ---------- | ---------------- |
| 0.0.1   | 2019-09-13 | Initial release. |



# How to Develop



## Installation

```bash
npm install
```



## Compilation

```bash
npm run compile
```



## Run Watcher

```bash
npm run watch
```

