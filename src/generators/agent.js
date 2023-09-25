import { fakerES_MX as faker } from '@faker-js/faker';
import { generateNameAndGender } from '../helper.js';

const agent = () => {
	const { name } = generateNameAndGender();
	return {
		name,
		phone: faker.phone.number(),
		dpi: faker.string.numeric(13),
		nit: faker.string.numeric(10),
		email: faker.internet.email(),
		age: faker.number.int({ min: 18, max: 100 })
	}
};

export default agent;