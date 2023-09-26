import fs from 'fs';

const generateSQLFile = async (template, data, pathToSave) => {
	pathToSave = `${pathToSave}/sql`;
	if (!fs.existsSync(pathToSave)) {
		fs.mkdirSync(pathToSave);
	}
	try {
		const sqlData = data.map(row => {
			const values = Object.values(row).join("','");
			return `INSERT INTO ${template.name} VALUES ('${values}');\n`;
		}).join('');
		const filePath = `${pathToSave}/${template.name}.sql`;
		fs.writeFileSync(filePath, sqlData);
		console.log(`Registros de ${template.name} guardados en ${filePath}`);
	} catch (err) {
		console.error(`Error al guardar el archivo ${template.name}.sql:`, err);
	}
};

export default generateSQLFile;