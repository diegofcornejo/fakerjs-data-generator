import { fakerES_MX as faker } from '@faker-js/faker';
import { banks } from '../conts/index.js';

const transaction = (dependencies) => {
	const client = faker.helpers.arrayElement(dependencies.clients);
	return {
		idClientBank: client.idClientBank,
		ammount: faker.number.int({ min: 1, max: 10000 }),
		currency: faker.helpers.arrayElement(['Q', '$']),
		originAccount: faker.string.numeric(10),
		destinationAccount: faker.string.numeric(10),
		originBank: faker.helpers.arrayElement(banks),
		destinationBank: faker.helpers.arrayElement(banks),
		transactionConcept: faker.helpers.arrayElement(['Compra', 'Pago']),
		transactionNumber: faker.string.numeric(10),
		agencyId: faker.string.numeric(10)
	}
};

export default transaction;