import {client, agent} from './generators/index.js';

const templates = [
	{
		name: 'clients',
		generator: client,
		quantity: 10
	},
	{
		name: 'agents',
		generator: agent,
		quantity: 10
	}
];

export default templates;