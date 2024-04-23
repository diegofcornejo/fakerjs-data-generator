import { fakerES_MX as faker } from '@faker-js/faker';
import { generateNameAndGender } from '../helper.js';

const agent = () => {

	const { name } = generateNameAndGender();
	const email = (faker.internet.email({ firstName: name.split(' ')[0], lastName: name.split(' ')[1] })).toLowerCase();
	
	return {
		name,
		phone: faker.phone.number(),
		dpi: faker.string.numeric(13),
		nit: faker.string.numeric(10),
		email,
		age: faker.number.int({ min: 18, max: 100 })
	}
};

export default agent;