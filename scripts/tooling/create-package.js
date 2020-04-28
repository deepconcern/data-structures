#!/usr/bin/env node

const child_process = require('child_process');
const fs = require('fs');
import { resolve } from 'path';

// Directories/files
/** The name of the directory containing shared configuration files */
const CONFIGS_DIR = 'configs';
/**  */
const INDEX = 'index.ts';
/** The name of the package's configuration file */
const PACKAGE_JSON = 'package.json';
/** The name of the directory containing the individual packages */
const PACKAGES_DIR = 'packages';
/** The package's source directory */
const SOURCE_DIR = 'src';
/** The name of the package's base TypeScript configuration file */
const TSCONFIG_JSON = 'tsconfig.json';
/** The name of the package's build TypeScript configuration file */
const TSCONFIG_BUILD_JSON = 'tsconfig.build.json';
/** The name of the symlink target for the package's base TypeScript configuration file */
const TSCONFIG_PACKAGE_JSON = 'tsconfig.package.json';
/** The name of the symlink target for the package's base TypeScript configuration file */
const TSCONFIG_PACKAGE_BUILD_JSON = 'tsconfig.package-build.json';
/** The name of the package's Jest configuration file */
const JEST_CONFIG_JSON = 'jest.config.js';
/** The name of the symlink target for the package's Jest configuration file */
const JEST_PACKAGE_CONFIG_JSON = 'jest.package-config.js';

// Paths
/** The path to the shared configuration files (a.k.a. symlink targets) */
const CONFIGS_PATH = resolve(__dirname, '.', CONFIGS_DIR);
/** The path to the symlink target for the package's Jest configuration file */
const JEST_PACKAGE_CONFIG_PATH = resolve(CONFIGS_PATH, JEST_PACKAGE_CONFIG_JSON);
/** The path to the directory containing each individual package */
const PACKAGES_PATH = resolve(__dirname, '..', '..', PACKAGES_DIR);
/** The path to the monorepo's configuration file */
const ROOT_PACKAGE_JSON_PATH = resolve(__dirname, '..', '..', PACKAGE_JSON);
/** The path to the symlink target for the package's TypeScript "base" configuration file */
const TSCONFIG_PACKAGE_PATH = resolve(CONFIGS_PATH, TSCONFIG_PACKAGE_JSON);
/** The path to the symlink target for the package's Typescript "build" configuration file */
const TSCONFIG_PACKAGE_BUILD_PATH = resolve(CONFIGS_PATH, TSCONFIG_PACKAGE_BUILD_JSON);

// Other
/** The list of dev dependencies to install into the new package */
const DEV_DEPENDENCIES = [
    '@types/jest',
    'jest',
    'ts-jest',
    'typescript',
];

/**
 * Creates a package in the "packages" workspace directory.
 * 
 * Usage:
 * 
 * ```sh
 * yarn create-package $PACKAGE_NAME
 * ```
 */
const createPackage = () => {
    // Check that we have the proper arguments
    if (process.argv.length < 3) {
        throw Error('Expected package name as argument');
    }
    
    const packageName = process.argv[2];
    /** The path to the package's directory */
    const packagePath = resolve(PACKAGES_PATH, packageName);
    /** The path to the package's Jest configuration file */
    const jestConfigPath = resolve(packagePath, JEST_CONFIG_JSON);
    /** The path to the package's TypeScript "build" configuration file */
    const tsconfigBuildPath = resolve (packagePath, TSCONFIG_BUILD_JSON);
    /** The path to the package's TypeScript "base" configuration file */
    const tsconfigPath = resolve(packagePath, TSCONFIG_JSON);
    
    // Create package
    {
        console.log(`Creating package "${packageName}"...`);
        console.log(`Will create package in "${packagePath}"`);
    
        try {
            fs.mkdirSync(packagePath);
            console.log(packagePath);
        } catch(_error) {
            throw Error(`Directory already exists in "${packagePath}"`);
        }
    }
    
    // Create package.json
    {
    
        const rootPackageJson = JSON.parse(fs.readFileSync(
            ROOT_PACKAGE_JSON_PATH,
            { encoding: 'utf-8' }
        ));
        
        const rootDevDependencies = Object.entries(rootPackageJson['devDependencies']);
    
        const devDependencies = rootDevDependencies.reduce((accu, [dependency, version]) => {
            if (DEV_DEPENDENCIES.includes(dependency)) {
                accu[dependency] = version;
            }
    
            return accu;
        }, {});
    
        const packageJsonPath = resolve(packagePath, PACKAGE_JSON);
        
        const packageJson = {
            name: `@deepconcern/${packageName}`,
            version: '1.0.0',
            main: 'dist/index.js',
            types: 'dist/index.d.ts',
            author: 'Wyatt Barnes',
            license: 'MIT',
            scripts: {
                build: 'tsc -p tsconfig.build.json',
                test: 'jest',
            },
            devDependencies,
        };
    
        appendFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        console.log(packageJsonPath);
    }
    
    // Create TypeScript configurations
    {   
        symlinkSync(TSCONFIG_PACKAGE_PATH, tsconfigPath);
        console.log(tsconfigPath, '->', TSCONFIG_PACKAGE_PATH);

        symlinkSync(TSCONFIG_PACKAGE_BUILD_PATH, tsconfigBuildPath);
        console.log(tsconfigBuildPath, '->', TSCONFIG_PACKAGE_BUILD_PATH);
    }

    // Create Jest configuration
    {   
        symlinkSync(JEST_PACKAGE_CONFIG_PATH, jestConfigPath);
        console.log(jestConfigPath, '->', JEST_PACKAGE_CONFIG_PATH);
    }
    
    // Create src/index.ts
    {
        const srcPath = resolve(packagePath, SOURCE_DIR);

        fs.mkdirSync(srcPath);
        console.log(srcPath);

        const indexPath = resolve(srcPath, INDEX);

        appendFileSync(indexPath, '');
        console.log(indexPath);
    }

    // Run bolt on new package
    {
        child_process.execSync('yarn', {
            cwd: resolve(__dirname, '..', '..'),
        });
    }
};

// Run the script
createPackage();
