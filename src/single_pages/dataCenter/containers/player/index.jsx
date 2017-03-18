
export default function () {

	let style = document.createElement("script");
	style.src = "//cdn.bootcss.com/jquery/2.1.0/jquery.min.js";
	document.querySelector("body").appendChild(style);

	style.onload = function () {

		$("#submit").click(function(){
			let comment = $("#comment").val();
			let list = JSON.parse(localStorage.getItem("danmuList") || "[]");
			list.push({text:comment,player_time:player.currentTime});
			localStorage.setItem("danmuList",JSON.stringify(list));
			$("#comment").val(undefined);
		});


		let saveComment = [];   //all the comments  [object]
		let spanComment = [];   //all the comments on screen  [array]
		let page = 0;
		let player = document.getElementById("video");
		let playState = false,seek = false;
		player.volume = 0;

		let channel = [0,0,0,0,0,0,0,0,0,0,0,0,0],
			node = new Array(13);
		let manager = [channel,node];  //0 for channel,1 for endTime

		let e = [
			{text:"我爱你啊",player_time:"1"},
			{text:"afs",player_time:"10"},
			{text:"我爱asdf你啊",player_time:"12"},
			{text:"asdfasdfdfs",player_time:"14"},
			{text:"345y345",player_time:"13"},
			{text:"345hh345             34rg454g4g",player_time:"11.2"},
			{text:"61516     34g5354",player_time:"14.6"},
			{text:"3g45g3",player_time:"21"},
			{text:"啊的说法发的",player_time:"20"},
			{text:"啊当时发生地方撒的发生的",player_time:"18.7"},
			{text:"我爱你啊",player_time:"12.3"},
			{text:"5678567575",player_time:"15.3"},
			{text:"让他与乳突炎认同与",player_time:"11.2"},
			{text:"56867",player_time:"12.3"},
			{text:"65",player_time:"14.2"},
			{text:"5",player_time:"18.9"},
			{text:"56",player_time:"17.3"},
			{text:"56gv",player_time:"11.2"},
			{text:"啊速度发发当时发生地方",player_time:"24.5"},
			{text:"45v6",player_time:"22.3"},
			{text:"让他与v56g45人与人",player_time:"25.6"},
			{text:"45v6y4567",player_time:"21"},
			{text:"5",player_time:"20.1"},
			{text:"4g56",player_time:"0.5"},
			{text:"让人有图如入土壤啊",player_time:"29"},
			{text:"5hg67456g",player_time:"25.3"},
			{text:"srt4w545",player_time:"18.4"},
			{text:"让他与人突然一天如让他与",player_time:"19.6"}
		];

		let list = JSON.parse(localStorage.getItem("danmuList") || "[]");
		e = e.concat(list);

		let i = 0;

		while(e[i] != undefined){
			saveComment.push(new Comment(e[i]["text"],e[i]["player_time"]));
			i ++;
		}
		saveComment.sort(compare);

		player.addEventListener("play",function(){

			if(playState == true){
				$(spanComment).each(function(){
					let width = $(this[0]).width();
					$(this[0]).animate({left: (-1) * width + "px"},this[1],"linear",function(){
						this.parentNode.removeChild(this);
					});
				});
				spanComment = [];
				playState = false;
			}else{
				$(".comment-cell").remove();
			}
		});

		player.addEventListener("pause",function(){
			let comment = $(".comment-cell");
			comment.each(function(){
				let width = $(this).width(),
					left = parseFloat($(this).css("left")),
					leftTime = ((left + width) / (width + 620)) * 8000;
				let arr = new Array(2);
				arr[0] = this;
				arr[1] = leftTime;
				spanComment.push(arr);
				$(this).stop(true);
			});
			playState = true;
		});

		player.addEventListener("ended",function(){
			$(".comment-cell").stop(true);
		});

		player.addEventListener("seeking",function(){
			seek = true;
			spanComment = [];
			$(".comment-cell").remove();
			manager[0] = [0,0,0,0,0,0,0,0,0,0,0,0,0];
			manager[1] = [];
		});

		player.addEventListener("seeked",function(){
			seek = false;
		});

		player.addEventListener("timeupdate",function(){
			if(seek == false){
				let curTime = player.currentTime;
				//console.log(curTime);
				for(let n = 0;n < saveComment.length;n ++){
					if(saveComment[n].startTime - 0.3 < curTime && saveComment[n].startTime >= curTime){
						let fired = false;

						for(let t = 0;t < 13 && fired == false;t ++){

							if(manager[0][t] < curTime && manager[1][t] == undefined){

								saveComment[n].channel = t;
								manager[1][t] = saveComment[n].fire(curTime);
								manager[0][t] = saveComment[n].endTime;

								fired = true;

								//saveComment.splice(n,1);

							}else if(manager[0][t] < curTime){
								let widthA = $(manager[1][t]).width(),
									widthB = saveComment[n].calculateWidth(),
									leftA = parseFloat(manager[1][t].style.left);

								if(widthA > widthB || (620 - widthA - leftA) / (widthB - widthA) > (leftA + widthA) / (620 + widthA)){
									saveComment[n].channel = t;
									manager[1][t] = saveComment[n].fire(curTime);
									manager[0][t] = saveComment[n].endTime;
									fired = true;
									//saveComment.splice(n,1);
								}
							}
						}
						if(fired == false){
							saveComment[n].channel = n % 8;
							saveComment[n].fire(curTime);
							manager[1][n % 13] = saveComment[n].endTime;
							//saveComment.splice(n,1);
						}
					}
				}
			}
		});

		function Comment(text,time){

			let duration = 8000;
			let that = this;
			this.channel = 0;

			this.endTime = 0;
			this.text = text;
			this.startTime = parseFloat(time);
			this.fire = function(curTime){
				let node = document.createElement("span");
				node.innerHTML = text;
				node.setAttribute("class","comment-cell");
				node.style.top = this.channel * 24 + "px";
				document.getElementById("show-layout").appendChild(node);
				let width = $(node).width();
				$(node).animate({left: (-1) * width + "px"},duration,"linear",function(){
					node.parentNode.removeChild(node);
				});
				that.endTime =  (duration / 1000) * width / (620 + width) + curTime;
				return node;      //return the node
			};

			this.calculateWidth = function(){
				let node = document.createElement("span");
				node.innerHTML = text;
				node.setAttribute("class","comment-cell");
				let dom = document.querySelector("body");
				dom.appendChild(node);
				let result = $(node).width();
				dom.removeChild(node);
				return result;
			};
		}

		function compare(val1,val2){
			let base = "startTime";
			if(val1[base] > val2[base]){
				return 1;
			}else if(val1[base] < val2[base]){
				return -1;
			}else{
				return 0;
			}
		}
	}
}