import { fakerES_MX as faker } from '@faker-js/faker';
import { channels, accountTypes } from '../conts/index.js';
import { generateRandomLatLong, generateNameAndGender } from '../helper.js';

const client = () => {
	
	const{name, gender} = generateNameAndGender();
	const email = (faker.internet.email({firstName: name.split(' ')[0], lastName: name.split(' ')[1]})).toLowerCase();
	
	return {
		name,
		address: JSON.stringify(generateRandomLatLong()),
		phone: faker.phone.number(),
		dpi: faker.string.numeric(13),
		nit: faker.string.numeric(10),
		email,
		idClientBank: faker.string.numeric(10),
		age: faker.number.int({ min: 18, max: 100 }),
		gender,
		dependents: faker.number.int({ min: 0, max: 5 }),
		moraProbability: faker.helpers.arrayElement(['Baja', 'Media', 'Alta']),
		preferedCommunicationChannel: faker.helpers.arrayElement(channels),
		maritalStatus: faker.helpers.arrayElement(['Soltero', 'Casado', 'Divorciado', 'Viudo']),
		antiquity: faker.number.int({ min: 0, max: 50 }),
		creditScore: faker.number.int({ min: 0, max: 100 }),
		emergencyContact: faker.phone.number(),
		accounts: faker.helpers.arrayElements(accountTypes, { min: 1, max: 4 })
	}
};

export default client;