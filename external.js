const validator = require.main.require('validator');
const Posts = require.main.require('./src/posts');

module.exports = function (library) {
	function parseYtbUrl(url) {
		const regex =
			/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/;
		const playListRegex =
			/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:playlist)(?:\.php)?(?:\?.*list=|\/))([a-zA-Z0-9\_-]+)/;

		let m = url.match(regex);
		if (m && m[1]) {
			const m2 = url.match(/list=([a-zA-Z0-9\_-]+)/);
			const playlistId = m2 && m2[1];

			const m3 = url.match(/index=(\d+)/);
			const indexInPlaylist = m3 ? parseInt(m3[1]) - 1 : 0;
			return { videoId: m[1], playlistId, indexInPlaylist };
		} else {
			m = url.match(playListRegex);
			if (m && m[1]) {
				const m3 = url.match(/index=(\d+)/);
				const indexInPlaylist = m3 ? parseInt(m3[1]) - 1 : 0;
				return { playlistId: m[1], indexInPlaylist };
			} else {
				// link can be like this: https://pnlpal.dev/captionz?link=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dh5RoVGO4XVA
				const linkUrl = new URL(url);
				const link = linkUrl.searchParams.get('link');
				if (link) {
					return parseYtbUrl(link);
				}
			}
		}
		return { invalid: true };
	}

	library.setExternalLinkOnSaveTopic = function (obj, callback) {
		if (obj.data.externalLink) {
			if (!validator.isURL(obj.data.externalLink, { require_protocol: true })) {
				return callback(new Error('[[pnlpal:url-not-right]]'));
			}
			// save externalLink and externalComment passed from api call, see nodebb-plugin-blog-comments2
			obj.topic.externalLink = obj.data.externalLink;

			var cid = obj.data.cid || obj.topic.cid;

			if (cid == 5) {
				// YouTube Trove
				var parsed = parseYtbUrl(obj.topic.externalLink);
				if (!parsed.videoId)
					return callback(new Error('[[pnlpal:need-youtube-url]]'));

				obj.topic.videoId = parsed.videoId;
				obj.topic.playlistId = parsed.playlistId;

				// somehow NodeBB is going to escape thumb, so I have to use another name videoThumb;
				obj.topic.videoThumb =
					'https://i.ytimg.com/vi/' + parsed.videoId + '/hqdefault.jpg';

				if (!obj.data.content.includes(obj.topic.externalLink))
					obj.data.content = obj.topic.externalLink + '\n\n' + obj.data.content;
			}
		}
		return callback(null, obj);
	};

	library.onGetCategory = function (data, callback) {
		if (data.category.cid == 4) {
			data.category.isDictionariezTrove = true;
		} else if (data.category.cid == 5) {
			data.category.isCaptionzTrove = true;
		}
		return callback(null, data);
	};

	library.onGetTopics = async function ({ topics, uid }) {
		const pids = topics.map((n) => n.mainPid);
		const voteData = await Posts.getVoteStatusByPostIDs(pids, uid);

		topics.forEach((n, i) => {
			n.upvoted = voteData.upvotes[i];

			if (n.cid == 4 && n.tid != 52) {
				n.isDictionariezTrove = true;
				n.teaser.content = `<a href="https://github.com/pnlpal/dictionaries" target="_blank" rel="nofollow" 
						data-tid="${n.tid}"
						class="btn btn-sm btn-outline-secondary add-to-dictionariez">Add to Dictionariez</a>
				`;
			}
		});
		return { topics, uid };
	};

	library.onRenderTopic = async function ({ req, res, templateData }) {
		if (
			[
				'/captionz',
				'/cats-love-youtube',
				'/captionz/',
				'/cats-love-youtube/',
			].includes(templateData.url)
		) {
			library.onRenderCaptionz({ req, res, templateData });
		} else if (templateData.videoId) {
			res.locals.metaTags.push({
				property: 'twitter:image',
				content:
					'https://i.ytimg.com/vi/' + templateData.videoId + '/hqdefault.jpg',
				noEscape: true,
			});
			res.locals.metaTags.push({
				property: 'og:image',
				content:
					'https://i.ytimg.com/vi/' + templateData.videoId + '/hqdefault.jpg',
				noEscape: true,
			});

			// change the first meta image, because Facebook read the first one.
			const firstImage = res.locals.metaTags.find(
				(n) => n.property === 'og:image'
			);
			if (firstImage)
				firstImage.content =
					'https://i.ytimg.com/vi/' + templateData.videoId + '/hqdefault.jpg';
			const firstImageUrl = res.locals.metaTags.find(
				(n) => n.property === 'og:image:url'
			);
			if (firstImageUrl)
				firstImageUrl.content =
					'https://i.ytimg.com/vi/' + templateData.videoId + '/hqdefault.jpg';
		}
		return { req, res, templateData };
	};

	library.onRenderCaptionz = async function ({ req, res, templateData }) {
		res.locals.metaTags = [
			{
				property: 'og:title',
				content: "Captionz - Programming N' Language",
			},
			{
				property: 'og:description',
				content:
					'Captionz lets you watch YouTube videos with dual captions, A-B repeat, and more. Join the pnlpal community and enhance your learning!',
			},
		];
		if (req.query.link) {
			var parsed = parseYtbUrl(req.query.link);
			if (parsed.videoId) {
				res.locals.metaTags.push({
					property: 'twitter:image',
					content:
						'https://i.ytimg.com/vi/' + parsed.videoId + '/hqdefault.jpg',
					noEscape: true,
				});
				res.locals.metaTags.push({
					property: 'twitter:card',
					content:
						'https://i.ytimg.com/vi/' + parsed.videoId + '/hqdefault.jpg',
					noEscape: true,
				});
				res.locals.metaTags.push({
					property: 'og:image',
					content:
						'https://i.ytimg.com/vi/' + parsed.videoId + '/hqdefault.jpg',
					noEscape: true,
				});
				res.locals.metaTags.push({
					property: 'og:image:url',
					content:
						'https://i.ytimg.com/vi/' + parsed.videoId + '/hqdefault.jpg',
					noEscape: true,
				});
			}
		}

		return { res, templateData };
	};

	library.parsePost = async function (data) {
		// regex: /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|playlist)(?:\.php)?(?:\?.*(v|list)=|\/))([a-zA-Z0-9\_-]+)/
		// this regex supports YouTube playlist and video link, like:
		//      https://www.youtube.com/watch?v=kBdfcR-8hEY&playnext=1&list=PL30C13C91CFFEFEA6
		//      https://youtu.be/kBdfcR-8hEY
		//      https://www.youtube.com/watch?list=PL30C13C91CFFEFEA6
		//      https://www.youtube.com/playlist?list=PLPfJBj_vOSGxjbYrCyq1UYv0dGGZ5Y-fv

		if (data && data.postData && data.postData.pid) {
			// console.log('parsePost: ', data.postData);
			var cid = await Posts.getCidByPid(data.postData.pid);

			if (cid == 5) {
				// only in Captionz Trove
				var regularUrl =
					/<a href="((?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|playlist)(?:\.php)?(?:\?.*(v|list)=|\/))([a-zA-Z0-9\_-]+)[^"]*)".*?>.+?<\/a>/;
				var captionzReg =
					/<a href="(?:https?:\/\/)?(?:pnlpal.dev\/captionz\/?\?link=)([^"]+)".*?>.+?<\/a>/;
				var youtubeLinkReg =
					/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|playlist)(?:\.php)?(?:\?.*(v|list)=|\/))([a-zA-Z0-9\_-]+)/;

				var postContent = data.postData.content || '';

				var embed =
					"<div class='embed-captionz'><iframe src='/captionz-ii?link=<link>' width='100%' frameborder='0' onload='this.style.height=(this.contentWindow.document.body.scrollHeight+20)+\"px\";' allowfullscreen></iframe></div>";

				if (postContent.match(regularUrl)) {
					data.postData.content = postContent.replace(
						regularUrl,
						embed.replace(
							'<link>',
							encodeURIComponent(postContent.match(regularUrl)[1])
						)
					);
					// console.log(data.postData)
				} else if (postContent.match(captionzReg)) {
					const youtubeLink = decodeURIComponent(
						postContent.match(captionzReg)[1]
					);
					if (youtubeLink.match(youtubeLinkReg)) {
						data.postData.content = postContent.replace(
							captionzReg,
							embed.replace('<link>', encodeURIComponent(youtubeLink))
						);
					}
				}
			}
		}

		return data;
	};
};
