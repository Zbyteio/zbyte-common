# zbyte-common

The zbyte-common package is an essential part of the zbyte SDKs ecosystem, providing a centralized repository of configurations, types/interfaces, utility functions, and more. Its purpose is to ensure consistency and reusability across the various zbyte SDKs, streamlining the development process and enhancing maintainability.

## Overview
zbyte-common is designed to house elements that are universally applicable across multiple SDK components, facilitating a DRY (Don't Repeat Yourself) approach to SDK development. By centralizing common elements, the package simplifies updates and modifications, ensuring that changes are uniformly propagated across all dependent SDKs.

## Directory Structure
The structure of zbyte-common is intentionally organized to promote ease of navigation and scalability. As of the current version, the package includes three primary directories, each serving a specific purpose:

### constants
**Purpose**: This directory contains constant values that are used throughout the SDKs.
**Naming Convention**: All constants adhere to an UPPER CASE naming convention, utilizing snake_case for readability and consistency.
*Example: API_ENDPOINT, DEFAULT_TIMEOUT_MS*
### types
**Purpose**: This directory is dedicated to TypeScript types and interfaces, providing a centralized definition of data structures used across the SDKs.
**Naming Convention**: Types and interfaces begin with an uppercase letter, following the PascalCase convention. This practice helps differentiate types/interfaces from standard variables and functions.
*Example: UserResponse, ApiOptions*

###utils
**Purpose**: Contains utility functions that offer common functionality needed by various parts of the SDKs. These functions range from data manipulation to more complex operations that are reused across different contexts.
**Characteristics**: Utility functions should be designed to be as generic and reusable as possible, minimizing dependencies on specific SDK implementations.

## Contribution Guidelines
Contributors are encouraged to expand the zbyte-common package by adding new directories and files that enhance the SDK's common functionalities. When contributing:

**Naming Conventions**: Adhere to established naming conventions for consistency and clarity.
**Documentation:** Update documentation to reflect changes or additions to the package structure. Clear documentation is crucial for maintaining the usability of the package for all developers.
**Testing**: Ensure that new additions are thoroughly tested, demonstrating reliability and compatibility with existing components. 

## CI-workflow

- The package will automatically create whenever any branch will merge into the master.
- For development check create branch in **feature/example-name or bugfix/example-name** format.

## Installation

- Before installing the lib user need to add **.npmrc** file in home directory which will contain the below details
  
  ```sh
  @zbyteio:registry=https://npm.pkg.github.com
  //npm.pkg.github.com/:_authToken={PAT}
  ```
- You can install the library using npm package manager
  ```
  npm install @zbyteio/zbyte-common@1.1.0
  ```
- Install via package.json
  ```
  "@zbyteio/zbyte-common": "1.1.0"
  ```
- *1.1.0 is the example version.*


