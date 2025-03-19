import { mockAppRoot } from '@rocket.chat/mock-providers';
import { render, screen } from '@testing-library/react';
import moment from 'moment';

import SecurityLogDisplayModal from './SecurityLogDisplayModal';

describe('SecurityLogDisplay', () => {
	it('should render', () => {
		const props = {
			timestamp: '2021-10-01T00:00:00.000Z',
			actor: 'John Doe',
			setting: 'Accounts_AllowAnonymousRead',
			settingType: 'string' as const,
			changedFrom: 'false',
			changedTo: 'true',
		};

		render(
			<SecurityLogDisplayModal
				timestamp={props.timestamp}
				actor={props.actor}
				setting={props.setting}
				changedFrom={props.changedFrom}
				changedTo={props.changedTo}
				onCancel={() => undefined}
			/>,
			{
				wrapper: mockAppRoot()
					.withSettings([
						{ _id: 'Accounts_AllowAnonymousRead', value: false },
						{ _id: 'Accounts_AllowFeaturePreview', value: false },
						{ _id: 'Accounts_AllowRegistration', value: false },
						{ _id: 'Accounts_AllowSignup', value: false },
					])
					.build(),
			},
		);
	});

	it('should display the correct data', () => {
		const props = {
			timestamp: '2021-10-01T00:00:00.000Z',
			actor: 'John Doe',
			setting: 'Accounts_AllowAnonymousRead',
			settingType: 'string' as const,
			changedFrom: 'false',
			changedTo: 'true',
		};

		render(
			<SecurityLogDisplayModal
				timestamp={props.timestamp}
				actor={props.actor}
				setting={props.setting}
				changedFrom={props.changedFrom}
				changedTo={props.changedTo}
				onCancel={() => undefined}
			/>,
			{
				wrapper: mockAppRoot()
					.withSettings([
						{ _id: 'Accounts_AllowAnonymousRead', value: false },
						{ _id: 'Accounts_AllowFeaturePreview', value: false },
						{ _id: 'Accounts_AllowRegistration', value: false },
						{ _id: 'Accounts_AllowSignup', value: false },
					])
					.build(),
			},
		);

		const timestamp = screen.getByText(moment(props.timestamp).format('MMMM Do YYYY, h:mm:ss a'));
		expect(timestamp).toBeVisible();

		const actor = screen.getByText(props.actor);
		expect(actor).toBeVisible();

		const actorAvatar = screen.getByTitle(props.actor);
		expect(actorAvatar).toBeVisible();

		const setting = screen.getByText(props.setting);
		expect(setting).toBeVisible();

		const changedFromCode = screen.queryAllByRole('code')[0];
		expect(changedFromCode).toBeUndefined();

		const changedFrom = screen.getByText(props.changedFrom);
		expect(changedFrom).toBeVisible();

		const changedTo = screen.getByText(props.changedTo);
		expect(changedTo).toBeVisible();
	});

	// TODO: refactor setting provider to return settings types with the setting structure
	it.skip('should display code type settings', () => {
		const props = {
			timestamp: '2021-10-01T00:00:00.000Z',
			actor: 'John Doe',
			setting: 'Show_message_in_email_notification',
			settingType: 'code' as const,
			changedFrom: 'console.log("Hello, World!")',
			changedTo: 'console.log("GoodBye, World!")',
		};

		render(
			<SecurityLogDisplayModal
				timestamp={props.timestamp}
				actor={props.actor}
				setting={props.setting}
				changedFrom={props.changedFrom}
				changedTo={props.changedTo}
				onCancel={() => undefined}
			/>,
			{
				wrapper: mockAppRoot()
					.withSettings([
						{ _id: 'Accounts_AllowAnonymousRead', value: false },
						{ _id: 'Accounts_AllowFeaturePreview', value: false },
						{ _id: 'Accounts_AllowRegistration', value: false },
						{ _id: 'Accounts_AllowSignup', value: false },
					])
					.build(),
			},
		);

		const changedFromCode = screen.queryAllByRole('code')[0];

		expect(changedFromCode).toHaveTextContent(props.changedFrom);
	});
});
