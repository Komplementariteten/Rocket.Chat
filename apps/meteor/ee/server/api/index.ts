export const startEERestAPI = () =>
	Promise.all([
		import('./api'),
		import('./audit'),
		import('./ldap'),
		import('./licenses'),
		import('./sessions'),
		import('./chat'),
		import('./roles'),
		import('./engagementDashboard'),
		import('./federation'),
		import('../../app/api-enterprise/server'),
		import('../../app/livechat-enterprise/server/api'),
	]);
