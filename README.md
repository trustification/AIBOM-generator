[![ci](https://github.com/trustification/AIBOM-generator/actions/workflows/eslint.yml/badge.svg)](https://github.com/trustification/AIBOM-generator/actions/workflows/eslint.yml)
[![codecov](https://codecov.io/gh/trustification/AIBOM-generator/graph/badge.svg?token=XQMJ5KN00N)](https://codecov.io/gh/trustification/AIBOM-generator)

# AIBOM Generator for Hugging Face Models

## Overview
The AIBOM Generator is a TypeScript-based application designed to fetch the top 30 donwloaded models from Hugging Face and generate AIBOMs (AI Bill of Materials) for each model. This project aims to streamline the process of documenting AI models and their dependencies.

## Project Structure
```
aibom-generator
├── src
│   ├── index.ts               # Entry point of the application
│   ├── aibom
│   │   └── generator.ts       # AIBOM generation logic
│   ├── models
│   │   └── trendingModels.ts   # Fetching trending models from Hugging Face
│   └── types
│       └── index.ts           # Type definitions for models and AIBOMs
├── package.json                # npm configuration and dependencies
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   cd aibom-generator
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Compile the TypeScript files:
   ```
   npm run build
   ```

## Usage
To run the application and generate AIBOMs for the top trending models, execute the following command:
```
npm start
```

## AIBOM Generator
The `AIBOMGenerator` class in `src/aibom/generator.ts` is responsible for generating AIBOMs. It includes methods for formatting and saving the generated AIBOMs.

## Fetching Trending Models
The `fetchTrendingModels` function in `src/models/trendingModels.ts` retrieves the top 30 trending models from Hugging Face, returning an array of model metadata including names, authors, and URLs.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
