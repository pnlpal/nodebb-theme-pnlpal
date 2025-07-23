const user = require.main.require('./src/user');

module.exports = function (library) {
	const saveUserData = async (uid, learningLanguages, fluentLanguages) => {
		await user.setUserField(uid, 'learningLanguages', learningLanguages);
		await user.setUserField(uid, 'fluentLanguages', fluentLanguages);
	};

	const addRoutes = async function ({ router, middleware }) {
		// Add API endpoint for saving languages
		router.post(
			'/api/user/:uid/languages',
			middleware.ensureLoggedIn,
			async (req, res) => {
				const uid = req.params.uid;
				const { learningLanguages, fluentLanguages } = req.body;

				try {
					await saveUserData(uid, learningLanguages, fluentLanguages);
					res.json({ success: true });
				} catch (err) {
					res.status(500).json({ error: err.message });
				}
			}
		);
	};

	library.onGetUserWhitelistFields = async function (data) {
		data.whitelist.push('learningLanguages', 'fluentLanguages');
		return data;
	};
	library.onUpdateUserProfile = async function (data) {
		data.fields.push('learningLanguages', 'fluentLanguages');
		return data;
	};
	library.onBuildUserProfile = async function (data) {
		const { templateData } = data;
		if (templateData.learningLanguages) {
			templateData.learningLanguages =
				templateData.learningLanguages.split(',');
		} else {
			templateData.learningLanguages = [];
		}
		if (templateData.fluentLanguages) {
			templateData.fluentLanguages = templateData.fluentLanguages.split(',');
		} else {
			templateData.fluentLanguages = [];
		}
		return data;
	};

	return {
		addRoutes,
	};
};
