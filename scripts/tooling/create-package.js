#!/usr/bin/env node

const child_process = require('child_process');
import { appendFileSync, mkdirSync, readFileSync, symlinkSync } from 'fs';
import { resolve } from 'path';

/**
 * Creates a package in the "packages" workspace directory.
 */
const createPackage = () => {
    const BASE_TSCONFIG = 'tsconfig.json';
    const BUILD_TSCONFIG = 'tsconfig.build.json';
    const JEST_CONFIG = 'jest.config.js';

    const CONFIGS_PATH = resolve(__dirname, '..', '..', 'configs');
    const PACKAGES_PATH = resolve(__dirname, '..', '..', 'packages');

    const BASE_TSCONFIG_PATH = resolve(CONFIGS_PATH, BASE_TSCONFIG);
    const BUILD_TSCONFIG_PATH = resolve(CONFIGS_PATH, BUILD_TSCONFIG);
    const JEST_CONFIG_PATH = resolve(CONFIGS_PATH, JEST_CONFIG);

    // Check that we have the proper arguments
    if (process.argv.length < 3) {
        throw Error('Expected package name as argument');
    }
    
    const packageName = process.argv[2];
    const packagePath = resolve(PACKAGES_PATH, packageName);
    
    // Create package
    {
        console.log(`Creating package "${packageName}"...`);
        console.log(`Will create package in "${packagePath}"`);
    
        try {
            mkdirSync(packagePath);
            console.log(packagePath);
        } catch(_error) {
            throw Error(`Directory already exists in "${packagePath}"`);
        }
    }
    
    // Create package.json
    {
        const DEV_DEPENDENCIES = [
            '@types/jest',
            'jest',
            'ts-jest',
            'typescript',
        ];
    
        const rootPackageJson = JSON.parse(readFileSync(resolve(__dirname, '..', '..', 'package.json'), { encoding: 'utf-8' }));
    
        const devDependencies = Object.keys(rootPackageJson['devDependencies']).reduce((accu, key) => {
            if (DEV_DEPENDENCIES.includes(key)) {
                accu[key] = rootPackageJson['devDependencies'][key];
            }
    
            return accu;
        }, {});
    
        const packageJsonPath = resolve(packagePath, 'package.json');
        
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
        const symlinkTsconfigPath = resolve(packagePath, BASE_TSCONFIG);
        const symlinkTsconfigBuildPath = resolve(packagePath, BUILD_TSCONFIG);
        
        symlinkSync(BASE_TSCONFIG_PATH, symlinkTsconfigPath);
        console.log(symlinkTsconfigPath, '->', BASE_TSCONFIG_PATH);

        symlinkSync(BUILD_TSCONFIG_PATH, symlinkTsconfigBuildPath);
        console.log(symlinkTsconfigBuildPath, '->', BUILD_TSCONFIG_PATH);
    }

    // Create Jest configuration
    {
        const symlinkJestConfigPath = resolve(packagePath, JEST_CONFIG);
        
        symlinkSync(JEST_CONFIG_PATH, symlinkJestConfigPath);
        console.log(symlinkJestConfigPath, '->', JEST_CONFIG_PATH);
    }
    
    // Create src/index.ts
    {
        const srcPath = resolve(packagePath, 'src');

        mkdirSync(srcPath);
        console.log(srcPath);

        const indexPath = resolve(srcPath, 'index.ts');

        appendFileSync(indexPath, '');
        console.log(indexPath);
    }

    // Run bolt on new package
    {
        child_process.execSync('yarn', {
            cwd: packagePath,
        });
    }
};

createPackage();