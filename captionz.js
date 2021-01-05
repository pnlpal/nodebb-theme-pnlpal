const request = require.main.require('request-promise-native');
const winston = require.main.require('winston');
const Posts = require.main.require('./src/posts');


module.exports = function (library) {
    library.onGetCategory = function (data, callback) {
        data.categories.forEach(category => {
            if (category.cid == 4) {
                category.isDictionariezTrove = true;
            } else if (category.cid == 5) {
                category.isCaptionzTrove = true;
            }
        });
        return callback(null, data);
    },
    library.getCaptionTracks = async function (req, res) {
        try {
            const videoId = req.params.vid;
            const data = await request.get(`https://www.youtube.com/get_video_info?video_id=${videoId}`, {timeout: 2000});
            const decodedData = decodeURIComponent(data);
            const regex = /({"captionTracks":.*isTranslatable":(true|false)}])/;
            const [ match ] = regex.exec(decodedData);
            const { captionTracks } = JSON.parse(`${match}}`);
            return res.json({ captionTracks });
        } catch (error) {
            winston.error(error);
            res.status(500).json({ error: error.message });
        }
    }
    
    library.getCaption = async function(req, res) {
        try {
            const url = req.body.url;
            if (url && url.startsWith('https://www.youtube.com/api/timedtext')) {
                const data = await request.get(url, {timeout: 2000});
                return res.json({ data });
            }
            return res.json({});
        } catch (error) {
            winston.error(error);
            res.status(500).json({ error: error.message });
        }
    };
    
    library.parsePost = async function(data) {
        // regex: /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|playlist)(?:\.php)?(?:\?.*(v|list)=|\/))([a-zA-Z0-9\_-]+)/
        // this regex supports YouTube playlist and video link, like:
        //      https://www.youtube.com/watch?v=kBdfcR-8hEY&playnext=1&list=PL30C13C91CFFEFEA6
        //      https://youtu.be/kBdfcR-8hEY
        //      https://www.youtube.com/watch?list=PL30C13C91CFFEFEA6
        //      https://www.youtube.com/playlist?list=PLPfJBj_vOSGxjbYrCyq1UYv0dGGZ5Y-fv

        if (data && data.postData && data.postData.pid) {
            // console.log('parsePost: ', data.postData);
            var cid = await Posts.getCidByPid(data.postData.pid);

            if (cid == 5) { // only in Captionz Trove
                var regularUrl = /<a href="((?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|playlist)(?:\.php)?(?:\?.*(v|list)=|\/))([a-zA-Z0-9\_-]+)[^"]*)".*?>.+?<\/a>/
                var postContent = data.postData.content;
                
                var embed = "<div class='embed-captionz'><iframe src='/captionz-ii?link=<link>' width='100%' frameborder='0' onload='this.style.height=(this.contentWindow.document.body.scrollHeight+20)+\"px\";' allowfullscreen></iframe></div>";

                if (postContent && postContent.match(regularUrl)) {
                    data.postData.content = postContent.replace(regularUrl, embed.replace('<link>', encodeURIComponent(postContent.match(regularUrl)[1])));
                    // console.log(data.postData)
                }
            }
        }

		return data;
    };
    
    library.onRenderCaptionz = async function ({ res, templateData }) {
        // change the first meta image, because Facebook read the first one.
        res.locals.metaTags = [
            {
                property: 'og:title',
                content: 'Captionz - Watch YouTube with dual captions, A-B repeat and more'
            },
            {
                property: 'og:description',
                content: 'A site that helps you watch YouTube with more fun, learn languages more efficiently.'
            }
        ];
			 
		return { res, templateData }
	};
}