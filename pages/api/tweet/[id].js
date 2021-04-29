import axios from 'axios'

export default async function handler(req, res) {
	console.log("api")
	const id = req.query.id
    const headers = {}
    headers["Authorization"] = `Bearer ${process.env.NEXT_APP_TWITTER_KEY}`;
    const url = `https://api.twitter.com/2/tweets/${id}?`
    const expansionParams = "expansions=author_id,attachments.media_keys";
	const userFieldParams = "&user.fields=profile_image_url,verified";
	const tweetFieldParams = "&tweet.fields=created_at,attachments,public_metrics,entities,source"
    const mediaFieldParams = "&media.fields=preview_image_url"
	try {
		const response = await axios.get(`${url}${expansionParams}${userFieldParams}${tweetFieldParams}${mediaFieldParams}`, {headers})
		console.log(response.data)
		res.status(200).json({ tweetDetails:  response.data, success:true})
	}

	catch(e) {
		console.log(e.response.status)
		res.send({tweetDetails:null, success: false})
	}
}