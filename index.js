const axios = require('axios');
const fs = require('fs');
const path = require('path');
const app = require("express")();
const port = 3000;


//app.use(express.json());
//webview
app.get('/', async function (req, res){
  res.send('Welcome to my simple codm API✨')
});

app.get('/codm', async (req, res) => {
  
let {apikey} = req.query;
  
  if (!apikey || apikey !== 'eugene'){
    return res.json({result: 'Invalid apikey contact https://www.facebook.com/eurix.pogi901 to get the apikey!'})
  }
  
const path = "./codm.json";

    //if the shoti.json is not exist or empty.

if (!fs.existsSync(path)){
    fs.writeFileSync(path, JSON.stringify({ urls: [] }, null, 4));
}
  
  const shoti = JSON.parse(fs.readFileSync(path)), url = shoti.urls;
const randomCodm = url[Math.floor(Math.random() * url.length)];



try {
		const response =  await  
 axios.post('https://www.tikwm.com/api/', { url: randomCodm }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
const videoUrl = response.data.data.play;
	const userName = response.data.data.author.unique_id 
const usernickname = response.data.data.author.nickname 
const title = response.data.data.title 
const id = response.data.data.id 
const likes = response.data.data.digg_count 
const comments = response.data.data.comment_count 
const share = response.data.data.share_count
const views = response.data.data.play_count
const video = response.data.data.video_url

res.send(response.data);

console.log({VideoUrl: videoUrl, Username: userName, Usernickname: usernickname, Title: title, ID: id, Likes: likes, Comments: comments, Share: share, Views: views});
	
	 } catch (error) {
		console.error(error);
	return res.json({result: error.message});
	 }
});

app.post("/add", async function(req, res){
	 const path = "./codm.json";
	const data = JSON.parse(fs.readFileSync(path));
const url = req.query.url;
	if (!url.startsWith("https://")) return res.json({message: "Invalid url"});
	 try {
		  data.urls.push(url)
			fs.writeFileSync(path, JSON.stringify(data, null, 4));
			return res.json({result: "URL has been added!"});
	 } catch (s){
		  return res.json({result: s.message})
	 }
  })

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// /shoti?apikey=eugene