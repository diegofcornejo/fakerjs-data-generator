import fs from 'fs';
import logger from '../logger.js';

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
		logger.info(`Records of ${template.name} saved in ${filePath}`);
	} catch (err) {
		logger.error(`Error while saving the file ${filePath}: ${err}`);
	}
};

export default generateSQLFile;