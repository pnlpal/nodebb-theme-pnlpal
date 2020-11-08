const request = require.main.require('request-promise-native');
const validator = require.main.require('validator');

module.exports = function (library) {
    library.setExternalLinkOnSaveTopic = function(obj, callback){
		var content = obj.data.content.trim();
		var groups = content.split(/\n/);

		if (obj.data.externalLink) {
			if (!validator.isURL(obj.data.externalLink)) {
				return callback(new Error('[[pnlpal:url-not-right]]'));
			}
			// save externalLink and externalComment passed from api call, see nodebb-plugin-blog-comments2
            obj.topic.externalLink = obj.data.externalLink;
            
		} else {
			var line = groups[0].trim();
			if (validator.isURL(line)) {
				obj.topic.externalLink = line;
			} else {
				obj.topic.externalLink = '';
			}
		}
		return callback(null, obj);
	};
}