# fakerjs-data-generator

To install dependencies:

```bash
npm install
#or
yarn install
#or
bun install
```

To run:

You can pass options to generation script, e.g.:

```bash
-f, --format      Data format (json, csv, sql, all)         [default: "json"]
-o, --outputPath  Output directory                          [default: "files"]
-v, --version     Show version number
-h, --help        Show help
  
# Generate data in json format and save files in the files directory	
npm run generate #default
npm run generate -f json -o files

# Generate data in csv format and save files in the output directory
npm run generate --format csv --outputPath=output

# Generate data in sql format and save files in the files directory
npm run generate --format sql
```

For a larger dataset, you may want to increase the NODE_OPTIONS:

```bash
NODE_OPTIONS="--max-old-space-size=8192" npm run generate
```

This project was created using `bun init` in bun v1.0.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
