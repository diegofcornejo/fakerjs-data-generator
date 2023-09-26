import fs from 'fs';

const generateCSVFile = async (template, data, pathToSave) => {
	pathToSave = `${pathToSave}/csv`;
	if (!fs.existsSync(pathToSave)) {
		fs.mkdirSync(pathToSave);
	}
	try {
		const csvData = data.map(row => {
			const values = Object.values(row).join(',');
			return `${values}\n`;
		}).join('');
		const filePath = `${pathToSave}/${template.name}.csv`;
		fs.writeFileSync(filePath, csvData);
		console.log(`Registros de ${template.name} guardados en ${filePath}`);
	} catch (err) {
		console.error(`Error al guardar el archivo ${template.name}.csv:`, err);
	}
}

export default generateCSVFile;