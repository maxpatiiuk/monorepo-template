const prettierCommand = `prettier --config prettier.config.js --no-editorconfig --log-level warn --write`;

/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  "*.{ts,tsx,md,json}": [
    // TODO: re-enable once you add an eslint.config.js
    //`eslint --config eslint.config.js --fix`,
    prettierCommand,
  ],
  "*.{css,scss,js,jsx,mjs,cjs,mdx,yml,yaml,html,vue}": prettierCommand,
  "./.gitattributes": () => "git add --renormalize .",
  // Type check monorepo-root config files
  "./*.ts": () => "tsc",
};
