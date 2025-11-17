import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
    // import.meta.dirname is available after Node.js v20.11.0
    baseDirectory: import.meta.dirname,
});

const eslintConfig = [...compat.extends("next/core-web-vitals", "next/typescript"), {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"]
}, ...compat.config({
    extends: ["next"],
    settings: {
        next: {
            rootDir: "packages/my-app/",
        },
    },
}), {
    rules: {
        "@next/next/no-html-link-for-pages": "off",
        '@typescript-eslint/no-require-imports': 'off',
    },
}];

export default eslintConfig;
