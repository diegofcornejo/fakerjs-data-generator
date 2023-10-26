import fs from 'fs';
import logger from '../logger.js';

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
		logger.info(`Records of ${template.name} saved in ${filePath}`);
	} catch (err) {
		logger.error(`Error while saving the file ${filePath}: ${err}`);
	}
}

export default generateCSVFile;