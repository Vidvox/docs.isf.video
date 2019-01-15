# ISF Docs

## Installation
*Assuming you have git and the Xcode Developer Command Line Tools installed…*

1. Clone the repository
2. Install [Yarn](https://yarnpkg.com/lang/en/docs/install/)
3. Run `npm install` from within the repository
4. Run `yarn docs:dev` to run the site locally in dev mode

## Notes
Be sure to preface all code samples with ```glsl to have proper syntax highlighting. If you only use \`\`\` it assumes the code is plaintext and disables highlighting.

Static assets, like images, should be put in /doc/.vuepress/public and linked to via a normal HTML `<img />` element. Look in quickstart.md for examples.
