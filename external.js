const request = require.main.require('request-promise-native');
const validator = require.main.require('validator');
const Posts = require.main.require('./src/posts');

module.exports = function (library) {
	function parseYtbUrl(url) {
		const regex = /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/;
		const playListRegex = /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:playlist)(?:\.php)?(?:\?.*list=|\/))([a-zA-Z0-9\_-]+)/;
	
		let m = url.match(regex);
		if (m && m[1]) {
		  const m2 = url.match(/list=([a-zA-Z0-9\_-]+)/);
		  const playlistId = m2 && m2[1]; 
	
		  const m3 = url.match(/index=(\d+)/);
		  const indexInPlaylist = m3 ? parseInt(m3[1])-1 : 0; 
		  return { videoId: m[1], playlistId, indexInPlaylist };
		} else {
		  m = url.match(playListRegex);
		  if (m && m[1]) {
			const m3 = url.match(/index=(\d+)/);
			const indexInPlaylist = m3 ? parseInt(m3[1])-1 : 0; 
			return { playlistId: m[1], indexInPlaylist };
		  }
		}
		return { invalid: true };
	  }

    library.setExternalLinkOnSaveTopic = function(obj, callback){
		if (obj.data.externalLink) {
			if (!validator.isURL(obj.data.externalLink, {require_protocol: true})) {
				return callback(new Error('[[pnlpal:url-not-right]]'));
			}
			// save externalLink and externalComment passed from api call, see nodebb-plugin-blog-comments2
			obj.topic.externalLink = obj.data.externalLink;

			var cid = obj.data.cid || obj.topic.cid;

			if (cid == 5) { // YouTube Trove
				var parsed = parseYtbUrl(obj.topic.externalLink);
				if (!parsed.videoId) return callback(new Error('[[pnlpal:url-not-right]]'));

				obj.topic.videoId = parsed.videoId;
				obj.topic.playlistId = parsed.playlistId;
				obj.topic.videoThumb = 'https://i.ytimg.com/vi/' + parsed.videoId + '/hqdefault.jpg';
				
				if (!obj.data.content.includes(obj.topic.externalLink)) 
					obj.data.content = obj.topic.externalLink +'\n\n' + obj.data.content;
			}
		}
		return callback(null, obj);
	};

	library.onGetTopics = async function ({ topics, uid }) {
		const pids = topics.map(n => n.mainPid);
		const voteData = await Posts.getVoteStatusByPostIDs(pids, uid);

		topics.forEach((n, i) => {
			n.upvoted = voteData.upvotes[i]
			if (n.cid == 4 && n.tid != 52) {
				n.isDictionariezTrove = true;
			}
		});
		return { topics, uid };
	};
}