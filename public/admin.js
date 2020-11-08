'use strict';
/* globals $, app */

define('admin/plugins/pnlpal', ['settings'], function(Settings) {

	var ACP = {};

	ACP.init = function() {
		Settings.load('pnlpal', $('.persona-settings'));

		$('#save').on('click', function() {
			Settings.save('pnlpal', $('.persona-settings'), function() {
				app.alert({
					type: 'success',
					alert_id: 'persona-saved',
					title: 'Settings Saved',
					message: 'Pnlpal settings saved'
				});
			});
		});
	};

	return ACP;
});