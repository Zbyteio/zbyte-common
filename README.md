# zbyte-common

This library will contains the common configs, types, util functions etc.

## Directory structure

- Currently there is only 2 directory which are mentaiond below:
  - **constants**
    - It contains all the constants, all the constant name will be in UPPER CASE and follow the snake case.
  - **types**
    - It contains the name of the types/interfaces, every interface will start with UPPERCASE letter.
  - **utils**
    - It contains the common functions.
- Please Add you own common directory with meaning full name and update the library. 

## CI-workflow

- The package will automtically create whenever any branch will merge into the master.
- For development check create branch in **feature/example-name or bugfix/example-name** format.

## Installation

- Before installing the lib user need to add **.npmrc** file in home directory which will contain the below details
  
  ```sh
  @zbyteio:registry=https://npm.pkg.github.com
  //npm.pkg.github.com/:_authToken={FORCI}
  ```
- You can install the library using npm package manager
  ```
  npm install @zbyteio/zbyte-common@0.0.1
  ```
-  Install via package.json
  ```
  "@zbyteio/zbyte-common": "0.0.1"
  ```
- *0.0.1 is the example version.*


