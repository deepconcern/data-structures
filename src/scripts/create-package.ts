import { execSync } from 'child_process';
import { appendFileSync, mkdirSync, readFileSync, symlinkSync } from 'fs';
import { resolve } from 'path';

/**
 * Creates a package in the "packages" workspace directory.
 */
const createPackage = (): void => {
    const BASE_TSCONFIG = 'tsconfig.json';
    const BUILD_TSCONFIG = 'tsconfig.build.json';
    const packagesPath = resolve(__dirname, '..', '..', 'packages');

    // Check that we have the proper arguments
    if (process.argv.length < 3) {
        throw Error('Expected package name as argument');
    }
    
    const packageName = process.argv[2];
    const packagePath = resolve(packagesPath, packageName);
    
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
        }, {} as { [dependency: string]: string });
    
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
        const configsPath = resolve(__dirname, '..', '..', 'configs');
        const targetTsconfigPath = resolve(configsPath, BASE_TSCONFIG);
        const targetTsconfigBuildPath = resolve(configsPath, BUILD_TSCONFIG);
        const symlinkTsconfigPath = resolve(packagePath, BASE_TSCONFIG);
        const symlinkTsconfigBuildPath = resolve(packagePath, BUILD_TSCONFIG);
        
        symlinkSync(targetTsconfigPath, symlinkTsconfigPath);
        console.log(symlinkTsconfigPath, '->', targetTsconfigPath);

        symlinkSync(targetTsconfigBuildPath, symlinkTsconfigBuildPath);
        console.log(symlinkTsconfigBuildPath, '->', targetTsconfigBuildPath);
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
        execSync('bolt', {
            cwd: packagePath,
        });
    }
};

createPackage();