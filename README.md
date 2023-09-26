# data-generator

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run generate # generates data.json, default
bun run generate:json # generates data.json
bun run generate:sql # generates data.sql
bun run generate:csv # generates data.csv
bun run generate:all # generates all of the above
```

For a larger dataset, you may want to increase the NODE_OPTIONS:

```bash
NODE_OPTIONS="--max-old-space-size=8192" bun run generate
```

This project was created using `bun init` in bun v1.0.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
