var request = require('request'),
	constants = require('./constants');

function RequestManagerMaker(settings){}

RequestManagerMaker.getManager = function(type,settings){
	if(!RequestManagerMaker[type]){
		throw {
			name: "Error",
			message: type + " doesn’t exist"
		};
	}
	var manager = new RequestManagerMaker[type](settings);
	return manager;
}

RequestManagerMaker.VkManager = function(settings){
	this.token = settings.token;
	this.host = "https://api.vk.com/method/wall.post"
	this.postFromGroup = 1;
}

RequestManagerMaker.TelegramManager = function(settings){
	this.token = settings.token;
	this.disable_web_page_preview = 'false';
    this.host = "https://api.telegram.org/bot" + this.token + "/";
	this.headers = {"User-Agent" : "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/534.30 (KHTML, like Gecko) Ubuntu/11.04 Chromium/12.0.742.112 Chrome/12.0.742.112 Safari/534.30"}
    this.youtube_check_url = 'https://www.youtube.com/oembed'
}

RequestManagerMaker.VkManager.prototype.postData = function(post, publicId){
	var propertiesObject = { owner_id:'-' + publicId, access_token:this.token, from_group: this.postFromGroup, message: post.message, attachment: post.link };
	request({url:this.vk_host, qs:propertiesObject}, function(err, response, body) {
		console.log(response.statusCode + ' - ' + post.link)
	})
}

RequestManagerMaker.TelegramManager.prototype.postData = function(channel_id, data, type){
	switch(type){
		case constants.links:
		console.log('LIIINK')
			var message = data.message + ' ' + data.link;
			var url = this.host + "sendMessage";
			var propertiesObject = {chat_id:channel_id, text: message, disable_web_page_preview: this.disable_web_page_preview}
			request.post({url: url, form: propertiesObject}, function(err, response, body) {
				console.log(response.statusCode + ' - ' + data.link)
			});
			break;
	}

}

RequestManagerMaker.prototype.getTitleLinks = function(requestParams){
	return new Promise(function(resolve,reject){
         if(!requestParams){
			reject();
		} else {
			var host = requestParams.host;
			delete requestParams.host;
			request({url:host, qs:requestParams}, function(err, response, body) {
				console.log(response.statusCode + '- contentStealer')
				resolve(body)
			})
		}
    });
}

RequestManagerMaker.prototype.getNewContent = function(linksArray){
	var dataList = []
	for(var i = 0; i < linksArray.length; i++){
		var item = new Promise(function(resolve,reject){
				request(linksArray[i], function(err, response, body) {
					console.log(response.statusCode + '- contentStealer')
					resolve(body)
				})
			})
		dataList.push(item);			
		};
		return Promise.all(dataList);
	
}

module.exports = RequestManagerMaker;