import {client, agent, transaction} from './generators/index.js';

const templates = [
	{
		name: 'clients',
		generator: client,
		quantity: 10000
	},
	{
		name: 'agents',
		generator: agent,
		quantity: 5
	},
	{
		name: 'transactions',
		generator: transaction,
		quantity: 100000,
		dependencies: ['clients']
	}
];

export default templates;