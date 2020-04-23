module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        'eslint-plugin-tsdoc',
        '@typescript-eslint',
    ],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            extends: [
                'eslint:recommended',
                'plugin:node/recommended',
                'plugin:@typescript-eslint/eslint-recommended',
                'plugin:@typescript-eslint/recommended',
            ],
            files: [
                "src/**/*.ts",
            ],
            parserOptions: {
                sourceType: "module"
            },
            plugins: [
                'node',
            ],
            rules: {
                'node/no-unsupported-features/es-syntax': 0,
            }
        },
        {
            env: {
                node: true,
            },
            extends: [
                'eslint:recommended',
                'plugin:node/recommended',
                'plugin:@typescript-eslint/eslint-recommended',
                'plugin:@typescript-eslint/recommended',
            ],
            files: [
                "*.js"
            ],
            plugins: [
                'node',
            ]
        },
    ],
    rules: {
        "comma-dangle": ["error", {
            "arrays": "always-multiline",
            "objects": "always-multiline",
            "imports": "always-multiline",
            "exports": "always-multiline",
            "functions": "never"
        }],
        'quotes': ['error', 'single'],
        'tsdoc/syntax': 'error',
        '@typescript-eslint/array-type': ['error', 'array'],
        '@typescript-eslint/ban-ts-comment': 'error',
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'], 
        '@typescript-eslint/member-delimiter-style': ['error', {
            "multiline": {
                "delimiter": "comma",
                "requireLast": true
            },
            "singleline": {
                "delimiter": "comma",
                "requireLast": false
            },
            "overrides": {
                "interface": {
                    "multiline": {
                        "delimiter": "semi",
                        "requireLast": true
                    }
                }
            }
        }]
    },
};