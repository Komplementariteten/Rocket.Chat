import type { Meta, StoryFn } from '@storybook/react';

import SecurityLogDisplayModal from './SecurityLogDisplayModal';

export default {
	title: 'Components/Audit/Modal/SecurityLogDisplay',
	component: SecurityLogDisplayModal,
	args: {
		timestamp: '2021-10-01T00:00:00.000Z',
		actor: 'John Doe',
		setting: 'Show_message_in_email_notification',
		changedFrom: 'false',
		changedTo: 'true',
	},
} satisfies Meta<typeof SecurityLogDisplayModal>;

export const Default: StoryFn<typeof SecurityLogDisplayModal> = (args) => <SecurityLogDisplayModal {...args} />;
