import fs from 'fs';
import templates from './templates.js';
import { generateJSONFile, generateSQLFile, generateCSVFile } from './file-generators/index.js';

const pathToSave = 'files';

const generateData = (template) => {
	return new Promise((resolve, reject) => {
		try {
			//Validate if the template has dependencies
			let additionalData = {};
			if (template.dependencies) {
				//Validate if the dependencies are in memory
				for (const dependency of template.dependencies) {
					if (!global[dependency]) {
						throw new Error(`No se encontró la dependencia ${dependency}`);
					}
					additionalData[dependency] = global[dependency];
				}
			}
			const data = [];
			for (let i = 0; i < template.quantity; i++) {
				data.push(template.generator(additionalData));
			}
			//Save data in memory execution to use in the next step
			global[template.name] = data;
			resolve(data);
		} catch (err) {
			console.error(`Error al generar los datos:`, err);
			reject(err);
		}
	});
};

const generateFile = async (template, format) => {
	try {
		const data = await generateData(template);
		switch (format) {
			case 'json':
				await generateJSONFile(template, data, pathToSave);
				break;
			case 'csv':
				await generateCSVFile(template, data, pathToSave);
				break;
			case 'sql':
				await generateSQLFile(template, data, pathToSave);
				break;
			case 'all':
				await generateJSONFile(template, data, pathToSave);
				await generateCSVFile(template, data, pathToSave);
				await generateSQLFile(template, data, pathToSave);
				break;
			default:
				await generateJSONFile(template, data, pathToSave);
				break;
		}
	} catch (err) {
		console.error(`Error al generar el archivo:`, err);
	}
};

const start = async () => {
	const format = process.argv[2] || 'json';
	console.log('Generando datos en formato', format.toUpperCase());
	if (!fs.existsSync(pathToSave)) {
		fs.mkdirSync(pathToSave);
	}
	for (const template of templates) {
		console.log(`Generando ${template.quantity} registros de ${template.name}`);
		await generateFile(template, format);
	}
}

start();