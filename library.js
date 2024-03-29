'use strict';

const meta = require.main.require('./src/meta');
const user = require.main.require('./src/user');
const translator = require.main.require('./src/translator');

const controllers = require('./lib/controllers');

const library = module.exports;

require('./external')(library);
require('./captionz')(library);

library.init = async function (params) {
	const { router, middleware } = params;
	const routeHelpers = require.main.require('./src/routes/helpers');
	routeHelpers.setupAdminPageRoute(
		router,
		'/admin/plugins/pnlpal',
		middleware,
		[],
		controllers.renderAdminPage
	);

	router.get('/api/captionz/tracks/:vid', library.getCaptionTracks);
	router.post('/api/captionz/caption', library.getCaption);

	routeHelpers.setupPageRoute(
		router,
		'/user/:userslug/theme',
		middleware,
		[
			middleware.exposeUid,
			middleware.ensureLoggedIn,
			middleware.canViewUsers,
			middleware.checkAccountPermissions,
		],
		controllers.renderThemeSettings
	);
};

library.addAdminNavigation = async function (header) {
	header.plugins.push({
		route: '/plugins/pnlpal',
		icon: 'fa-paint-brush',
		name: 'Pnlpal Theme',
	});

	return header;
};

library.addProfileItem = async (data) => {
	data.links.push({
		id: 'theme',
		route: 'theme',
		icon: 'fa-paint-brush',
		name: await translator.translate('[[persona:settings.title]]'),
		visibility: {
			self: true,
			other: false,
			moderator: false,
			globalMod: false,
			admin: false,
		},
	});

	return data;
};

library.defineWidgetAreas = async function (areas) {
	const locations = ['header', 'sidebar', 'footer'];
	const templates = [
		'categories.tpl',
		'category.tpl',
		'topic.tpl',
		'users.tpl',
		'unread.tpl',
		'recent.tpl',
		'popular.tpl',
		'top.tpl',
		'tags.tpl',
		'tag.tpl',
		'login.tpl',
		'register.tpl',
	];
	function capitalizeFirst(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	templates.forEach((template) => {
		locations.forEach((location) => {
			areas.push({
				name: `${capitalizeFirst(template.split('.')[0])} ${capitalizeFirst(
					location
				)}`,
				template: template,
				location: location,
			});
		});
	});

	areas = areas.concat([
		// {
		// 	name: 'Categories Sidebar',
		// 	template: 'categories.tpl',
		// 	location: 'sidebar',
		// },
		// {
		// 	name: 'Category Sidebar',
		// 	template: 'category.tpl',
		// 	location: 'sidebar',
		// },
		// {
		// 	name: 'Category Left',
		// 	template: 'category.tpl',
		// 	location: 'left',
		// },
		// {
		// 	name: 'Topic Sidebar',
		// 	template: 'topic.tpl',
		// 	location: 'sidebar',
		// },
		// {
		// 	name: 'Categories Header',
		// 	template: 'categories.tpl',
		// 	location: 'header',
		// },
		// {
		// 	name: 'Category Header',
		// 	template: 'category.tpl',
		// 	location: 'header',
		// },
		// {
		// 	name: 'Topic Header',
		// 	template: 'topic.tpl',
		// 	location: 'header',
		// },
		// {
		// 	name: 'Categories Footer',
		// 	template: 'categories.tpl',
		// 	location: 'footer',
		// },
		// {
		// 	name: 'Category Footer',
		// 	template: 'category.tpl',
		// 	location: 'footer',
		// },
		// {
		// 	name: 'Topic Footer',
		// 	template: 'topic.tpl',
		// 	location: 'footer',
		// },
		// {
		// 	name: 'Account Header',
		// 	template: 'account/profile.tpl',
		// 	location: 'header',
		// },
		// {
		// 	name: 'Users Header',
		// 	template: 'users.tpl',
		// 	location: 'header',
		// },
		// {
		// 	name: 'Tags Header',
		// 	template: 'tags.tpl',
		// 	location: 'header',
		// },
		{
			name: 'Account Header',
			template: 'account/profile.tpl',
			location: 'header',
		},
	]);
	return areas;
};

library.getThemeConfig = async function (config) {
	const settings = await meta.settings.get('pnlpal');
	config.hideSubCategories = settings.hideSubCategories === 'on';
	config.hideCategoryLastPost = settings.hideCategoryLastPost === 'on';
	config.enableQuickReply = settings.enableQuickReply === 'on';
	return config;
};

library.addUserToTopic = async function (hookData) {
	const settings = await meta.settings.get('pnlpal');
	if (settings.enableQuickReply === 'on') {
		if (hookData.req.user) {
			const userData = await user.getUserData(hookData.req.user.uid);
			hookData.templateData.loggedInUser = userData;
		} else {
			hookData.templateData.loggedInUser = {
				uid: 0,
				username: '[[global:guest]]',
				picture: user.getDefaultAvatar(),
				'icon:text': '?',
				'icon:bgColor': '#aaa',
			};
		}
	}

	return hookData;
};

module.exports = library;
