/*
---
description:     
  - mooTwits provides the latest tweets on twitter for an specific user, or the public list.

authors:
  - Marcelo Origoni

version:
  - 1.0

license:
  - MIT-style license

requires:
  - core/1.2.1:   '*'
  
provides:
  - mooTwits
...
*/

var mooTwits = new Class({
	Implements: [Options,Events],
	options: {
		type: 'user', 			//user or public.
		count: '5',					//maximum tweets to show.
		user: 'marceloOrigoni',		//Your tweeter Username, defaults to mine, not needed in public mode.
		tweetContainer: 'tweet',	//CSS class of the container element.
		tweetTwit: 'tweet',			//CSS class of the tweet element.
		tweetText: 'text',			//CSS class of the tweet element.
		tweetDate: 'date', 			//CSS class of the date element.
		tweetAuth: 'author',		//CSS class of the author element.
		tweetLoad: 'loading',		//CSS class to apply to the container while laoding.
		tweetPHP: './tweets.php',	//URL of the tweets.php, that will be getting the JSON object of the tweets.
		dateFormat: 'mm/dd/yyyy hh:ii',	//Date Format of the date element
		errorMessage: 'An Error Accoured While getting the latest Tweet'	//Message display if an error accoured while fetching the tweets.
		},
	initialize: function(container,settings) {
		this.setOptions(settings);
		mooTweet = this;
		var getTweets = new Request.JSON({
			url: mooTweet.options.tweetPHP,
			data:{
				'user': mooTweet.options.user,
				'count': mooTweet.options.count,
				'type': mooTweet.options.type
			},
			onRequest: function(){
				$(container).empty();
				$(container).addClass(mooTweet.options.tweetLoad);
				},
			onSuccess: function(tweet){
				if(tweet){
					var twit = new Element('span',{'class': mooTweet.options.tweetTwit});
					var text = new Element('span',{'class': mooTweet.options.tweetText});
					var author = new Element('a',{'href': 'http://www.twitter.com/' + mooTweet.options.user,'class': mooTweet.options.tweetAuth});
					var date = new Element('span',{'class': mooTweet.options.tweetDate});
					var fullDate, tweetText, tweetAuthor, tweetDate, tweetTwit;
					for(i = 0; i < mooTweet.options.count; i++){
						tweetTwit = twit.clone();
						tweetText = text.clone();
						tweetAuthor = author.clone();
						tweetDate = date.clone();
						$(tweetText).setProperty('text', tweet[i].text).injectInside(tweetTwit);
						$(tweetAuthor).setProperty('text', tweet[i].user.screen_name).injectInside(tweetTwit);
						$(tweetDate).setProperty('text', mooTweet.formatDate(tweet[i].created_at)).injectInside(tweetTwit);
						$(tweetTwit).injectInside($(container));
					}
				}
				else{
					$(container)..setProperty('text', 'No Tweets');
				}
				$(container).removeClass(mooTweet.options.tweetLoad);
			},
			onFailure: function(){
				var text = new Element('span',{
					'text': mooTweet.options.errorMessage							
				});
				text.injectInside($(container));
				$(container).removeClass(mooTweet.options.tweetLoad);						
			}
			}).post();
	},
	formatDate: function(unformatedDate, dateFormat){
		var dateArray = unformatedDate.split(' ');
		var day = dateArray[2];
		var month = this.returnMonth(dateArray[1]);
		var year = dateArray[5];
		var hour = dateArray[3].split(':')[0];
		var mins = dateArray[3].split(':')[1];
		var formated = this.options.dateFormat;
		formated = formated.replace('mm', month);
		formated = formated.replace('dd', day);
		formated = formated.replace('yyyy', year);
		formated = formated.replace('hh', hour);
		formated = formated.replace('ii', mins);
		
		return formated;	
	},
	returnMonth: function(name){
		switch(name){
			case 'Jan':return '01';break;
			case 'Feb':return '02';break;
			case 'Mar':return '03';break;
			case 'Apr':return '04';break;
			case 'May':return '05';break;
			case 'Jun':return '06';break;
			case 'Jul':return '07';break;
			case 'Aug':return '08';break;
			case 'Sep':return '09';break;
			case 'Oct':return '10';break;
			case 'Nov':return '11';break;
			case 'Dec':return '12';break;
		}	
	}
});