import fs from 'fs';

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
            console.log(`Registros de ${template.name} guardados en ${filePath}`);
        });
    } catch (err) {
        console.error(`Error al guardar el archivo ${template.name}.json:`, err);
    }
}

export default generateJSONFile;