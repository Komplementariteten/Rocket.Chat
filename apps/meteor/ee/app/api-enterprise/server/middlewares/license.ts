import { License } from '@rocket.chat/license';
import type { MiddlewareHandler } from 'hono';

import type { TypedOptions } from '../../../../../app/api/server/definition';

export const license =
	(options: TypedOptions): MiddlewareHandler =>
	async (c, next) => {
		if (!options.license) {
			return next();
		}

		if (!Array.isArray(options.license)) {
			return c.body('404 Not Found', 404);
		}

		const license = options.license.every((license) => License.hasModule(license));
		if (!license) {
			return c.body('404 Not Found', 404);
		}

		return next();
	};
