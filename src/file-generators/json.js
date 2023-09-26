import fs from 'fs';

const generateJSONFile = async (template, data, pathToSave) => {
	pathToSave = `${pathToSave}/json`;
	if (!fs.existsSync(pathToSave)) {
		fs.mkdirSync(pathToSave);
	}
	try {
		const jsonData = JSON.stringify(data, null, 2);
		const filePath = `${pathToSave}/${template.name}.json`;
		fs.writeFileSync(filePath, jsonData, 'utf8');
		console.log(`Registros de ${template.name} guardados en ${filePath}`);
	} catch (err) {
		console.error(`Error al guardar el archivo ${template.name}.json:`, err);
	}
}

export default generateJSONFile;