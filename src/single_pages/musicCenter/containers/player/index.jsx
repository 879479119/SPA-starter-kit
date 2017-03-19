
export default function () {

	let script = document.createElement("script");
	script.src = "//cdn.bootcss.com/jquery/2.1.4/jquery.min.js";
	document.querySelector("body").appendChild(script);


	script.onload = function () {

		let script2 = document.createElement("script");
		script2.src = "//cdn.bootcss.com/jqueryui/1.11.4/jquery-ui.min.js";
		document.querySelector("body").appendChild(script2);

		script2.onload = function () {
			let flag = 0;
			let barMove = 0;    //0 for stable,1 for moving,2 for moved
			let threadLrc = null,
				threadPb = null,
				anotherThreadPb = null;
			let saveTime = [];
			let saveLrc = [];
			let lrcIndex = 0;
			let lyricNode = document.createElement("div");
			let player = document.getElementById("audio"),
				pb = document.getElementById("pb");
			let duration = {
				min:numtoStr(Math.floor(player.duration / 60)),
				second:numtoStr(Math.floor(player.duration % 60))
			};

			$("#time").html("00:00 / " + duration.min + ":" + duration.second);
			$("#pb").css({"transition":"none"});

			$.ajax({
				url:"/lrc.txt",
				async:true,
				success:function(e){

					let lyric = e.split("\n");

					lyric.forEach(function(cur,index){
						let reg = /\[\d+:\d+.\d+/g;
						if(reg.test(cur)){

							//buffer cannot be defined here
							let start = 1,end = 9;
							let go = 1;

							if(cur[0] == "\n"){
								cur = cur.substring(1);
							}

							while(go){
								if(cur[start - 1] == "[" && cur[end] == "]"){
									let buffer = [];    //buffer must be defined here
									buffer[0] = 60 * cur.substring(start,start + 2) + parseFloat(cur.substring(start + 3,end));
									buffer[1] = index;
									saveTime.push(buffer);

									start += 10;
									end += 10;
								}else if(cur[start - 1] == "["){
									go = 0;
								}else{
									saveLrc[index] = cur.substring(start-1);
									go = 0;
								}
							}
						}
					});

					saveTime.sort(compare);

					for(let i = 0;i < saveTime.length;i ++){
						let lrcStr = document.createElement("p");
						lrcStr.innerHTML = saveLrc[saveTime[i][1]];
						lyricNode.appendChild(lrcStr);
					}
					lyricNode.id = "lyricBar";
					$("#show").html(lyricNode);

					initPlayer();
				},

				error:function(){
					$("#show").html("无法获取歌词，请检查网络连接")
				}

			});

			document.getElementById("start").addEventListener("click",function(){

				let btnPlay = $("#start").children("span")[0];
				let lyricBar = $("#lyricBar").children("p");

				if(flag == 0){
					player.play();
					flag = 1;
					btnPlay.setAttribute("class","glyphicon glyphicon-pause");
					threadLrc = setInterval(function(){
						let curTime = player.currentTime;

						if(barMove == 2){

							$("#lyricBar").find(".lrc-active").each(function(){
								$(this).removeClass("lrc-active");
							});

							let i = 0;
							while(i < saveTime.length && saveTime[i][0] < curTime ){
								lrcIndex = i;
								i ++;
							}

							if(lrcIndex == saveTime.length - 1)lrcIndex --;

							lyricBar[lrcIndex].setAttribute("class","lrc-active");
							if(lrcIndex != 0){
								lyricBar[lrcIndex - 1].setAttribute("class","");
								if(lrcIndex > 5){
									$("#show").animate({scrollTop:28.5 * (lrcIndex - 5) + "px"},"slow");
								}
							}

							lrcIndex ++;
							barMove = 0;
						}

						if(lrcIndex + 1 == saveTime.length){
							if(player.ended){
								console.log("over");
								lrcIndex = 0;
								clearInterval(threadLrc);
								clearInterval(anotherThreadPb);
								clearInterval(threadPb);

								initPlayer();
							}
						}else{
							if(saveTime[lrcIndex][0] - 0.15 < curTime && saveTime[lrcIndex][0] >= curTime){


								lyricBar[lrcIndex].setAttribute("class","lrc-active");
								if(lrcIndex != 0){
									lyricBar[lrcIndex - 1].setAttribute("class","");

									$("#show").animate({scrollTop:28.5 * (lrcIndex > 5 ? lrcIndex - 5 : 0) + "px"},"slow");

								}
								lrcIndex ++;
							}
						}
					},100);

					threadPb = setInterval(function(){
						let curTime = player.currentTime;

						let percent = (curTime / player.duration) * 100;
						pb.style.width = percent + "%";

						$("#time").html(numtoStr(Math.floor(curTime / 60)) + ":" + numtoStr(Math.floor(curTime % 60))
							+ " / " + duration.min + ":" + duration.second);

						dragBtn.css({"left":$("#pb").width() - 2 + "px"});

						if(barMove == 1){
							clearInterval(threadPb);
						}

					},100);

				}else{
					player.pause();
					flag = 0;
					btnPlay.setAttribute("class","glyphicon glyphicon-play");
					clearInterval(threadLrc);
					clearInterval(threadPb);
					clearInterval(anotherThreadPb);
				}
			});
			$(window).scroll(fixNav);

			let dragBtn = $("#drag"),
				dropArea = $("#drop");

			dragBtn.draggable({
				axis:"x",
				containment:"parent"
			}).bind("dragstart",function(){
				barMove = 1;
			}).bind("drag",function(){
				let percent = (dragBtn.offset().left - dropArea.offset().left) / (dropArea.width() - 16);        //   0~1
				let second = player.duration * percent;
				let showTime = numtoStr(Math.floor(second / 60)) + ":" + numtoStr(Math.floor(second % 60)) + " / " +duration.min + ":" + duration.second;

				$("#pb").width(percent * 100 + "%");
				$("#time").html(showTime);

			});

			dropArea.droppable().bind("drop",function(){
				player.currentTime = player.duration * ((dragBtn.offset().left - dropArea.offset().left) / (dropArea.width() - 16));

				anotherThreadPb = setInterval(function(){
					let curTime = player.currentTime;

					let percent = (curTime / player.duration) * 100;
					pb.style.width = percent + "%";

					$("#time").html(numtoStr(Math.floor(curTime / 60)) + ":" + numtoStr(Math.floor(curTime % 60))
						+ " / " + duration.min + ":" + duration.second);

					dragBtn.css({"left":$("#pb").width() - 2 + "px"});

					if(barMove == 1){
						clearInterval(anotherThreadPb);
					}

				},100);

				barMove = 2;
			});


			function initPlayer(){
				player.currentTime = 0;
				player.pause();
				flag = 0;
				dragBtn.css({"left":0});
				pb.style.width = 0;
				$("#start").children("span")[0].setAttribute("class","glyphicon glyphicon-play");
				$("#lyricBar").find(".lrc-active").removeClass("lrc-active");
				$("#show").animate({scrollTop:0},"slow");
				$("#time").html("00:00 / " + duration.min + ":" + duration.second);
			}


			function compare(val1,val2){
				if(val1[0] > val2[0]){
					return 1;
				}else if(val1[0] < val2[0]){
					return -1;
				}else{
					return 0;
				}
			}

			function fixNav(){
				let asideNav = $("#asideNav");
				if($(window).scrollTop() >= 378){
					let left = asideNav.offset().left;
					asideNav.css({"left":left + "px"}).addClass("navbar-fixed-top");
				}else{
					asideNav.css({"left":0}).removeClass("navbar-fixed-top");
				}
			}

			/**
			 * @return {string}
			 */
			function numtoStr(integer){
				return integer < 10 ? "0" + integer : integer.toString();
			}
		}
	}
}