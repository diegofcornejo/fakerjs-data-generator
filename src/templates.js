import {client, agent, transaction} from './data-generators/index.js';

const templates = [
	{
		name: 'clients',
		generator: client,
		quantity: 5
	},
	{
		name: 'agents',
		generator: agent,
		quantity: 5
	},
	{
		name: 'transactions',
		generator: transaction,
		quantity: 5,
		dependencies: ['clients']
	}
];

export default templates;