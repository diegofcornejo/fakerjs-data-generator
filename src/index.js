import fs from 'fs';
import templates from './templates.js';
import { generateJSONFile, generateSQLFile, generateCSVFile } from './file-generators/index.js';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import logger from './logger.js';

const generateData = (template) => {
	return new Promise((resolve, reject) => {
		try {
			// Check if the template has dependencies
			let additionalData = {};
			if (template.dependencies) {
				for (const dependency of template.dependencies) {
					if (!global[dependency]) {
						throw new Error(`Dependency ${dependency} not found`);
					}
					additionalData[dependency] = global[dependency];
				}
			}
			const data = [];
			for (let i = 0; i < template.quantity; i++) {
				data.push(template.generator(additionalData));
			}
			global[template.name] = data;
			resolve(data);
		} catch (err) {
			logger.error(`Error generating data: ${err}`);
			reject(err);
		}
	});
};

const generateFile = async (template, format, outputPath) => {
	try {
		const data = await generateData(template);
		switch (format) {
			case 'json':
				await generateJSONFile(template, data, outputPath);
				break;
			case 'csv':
				await generateCSVFile(template, data, outputPath);
				break;
			case 'sql':
				await generateSQLFile(template, data, outputPath);
				break;
			case 'all':
				await generateJSONFile(template, data, outputPath);
				await generateCSVFile(template, data, outputPath);
				await generateSQLFile(template, data, outputPath);
				break;
			default:
				await generateJSONFile(template, data, outputPath);
				break;
		}
	} catch (err) {
		logger.error(`Error generating file: ${err}`);
	}
};

const start = async () => {

	const argv = yargs(hideBin(process.argv))
		.alias('format', 'f')
		.describe('format', 'File format (json, csv, sql, all)')
		.choices('f', ['json', 'csv', 'sql', 'all'])
		.default('format', 'json')
		.alias('outputPath', 'o')
		.describe('outputPath', 'Output directory')
		.default('outputPath', 'files')
		.version('0.0.1')
		.alias('version', 'v')
		.help('h')
		.alias('h', 'help')
		.argv;

	const { format, outputPath } = argv;
	logger.info(`Generating data in ${format.toUpperCase()} format in directory ${outputPath}`);
	if (!fs.existsSync(outputPath)) {
		fs.mkdirSync(outputPath);
	}
	for (const template of templates) {
		logger.info(`Generating ${template.quantity} records of ${template.name}`);
		await generateFile(template, format, outputPath);
	}
};

start();
