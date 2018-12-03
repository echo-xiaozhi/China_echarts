//视频
var videoData = JSON.parse(videoAddress);
console.log(videoData['videoAddress']);
for (i = 0; i <= 4; i++) {
    var player = cyberplayer("playercontainer" + i).setup({
        file : videoData['videoAddress'][i].info,
        ak : "8e5d5d18c1a0403da64e9a06992f00f7",
        autoStart : true,
        repeat : false,
        volume : 100,
        controls : "over"
    });
}

