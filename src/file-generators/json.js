import fs from 'fs';
import logger from '../logger.js';

const generateJSONFile = async (template, data, pathToSave) => {
	pathToSave = `${pathToSave}/json`;
	if (!fs.existsSync(pathToSave)) {
		fs.mkdirSync(pathToSave);
	}

	const filePath = `${pathToSave}/${template.name}.json`;

	try {
		const writeStream = fs.createWriteStream(filePath, 'utf8');
		writeStream.write('[');
		for (let i = 0; i < data.length; i++) {
			writeStream.write(JSON.stringify(data[i]));
			if (i < data.length - 1) {
				writeStream.write(',\n');
			}
		}
		writeStream.write(']');
		writeStream.end();

		writeStream.on('finish', () => {
			logger.info(`Records of ${template.name} saved in ${filePath}`);
		});
	} catch (err) {
		logger.error(`Error while saving the file ${filePath}: ${err}`);
	}
}

export default generateJSONFile;