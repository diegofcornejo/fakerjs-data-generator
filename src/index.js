import fs from 'fs';
import templates from './templates.js';

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
		//Save data in memory execution to use in the next step
		global[template.name] = data;
		if (format === 'sql') {
			await generateSQLFile(template, data);
		} else {
			const jsonData = JSON.stringify(data, null, 2);
			const filePath = `${pathToSave}/${template.name}.json`;
			await fs.writeFileSync(filePath, jsonData, 'utf8');
			console.log(`Registros de ${template.name} guardados en ${filePath}`);
		}
	} catch (err) {
		console.error(`Error al generar el archivo:`, err);
	}
};

const generateSQLFile = async (template, data) => {
	try {
		const sqlData = data.map(row => {
			const values = Object.values(row).join("','");
			return `INSERT INTO ${template.name} VALUES ('${values}');\n`;
		}).join('');
		const filePath = `${pathToSave}/${template.name}.sql`;
		await fs.writeFileSync(filePath, sqlData);
		console.log(`Registros de ${template.name} guardados en ${filePath}`);
	} catch (err) {
		console.error(`Error al guardar el archivo ${template.name}.sql:`, err);
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