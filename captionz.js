const request = require.main.require('request-promise-native');
const validator = require.main.require('validator');

module.exports = function (library) {
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
            res.status(500).json({ error: error.message });
        }
	};
}