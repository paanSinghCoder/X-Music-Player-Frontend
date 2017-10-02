<!DOCTYPE html>
<html>
	<head>
		<title>X Music Player by Gaurav Singh</title>
		<link rel="stylesheet" type="text/css" href="style.css"/>
		<link rel="shortcut icon" href="buttons/favicon.ico" type="image/x-icon">
		<link href="https://fonts.googleapis.com/css?family=Roboto+Condensed|Roboto:100" rel="stylesheet">
		<script type="text/javascript">
		    // locate your element and add the Click Event Listener
		    /*listSongs.addEventListener("click",function(e) {
		        // e.target is our targetted element.
		                    // try doing console.log(e.target.nodeName), it will result LI
		        if(e.target && e.target.nodeName == "LI") {
		            console.log(e.target.id + " was clicked");
		        }
		    });*/
		</script>
		</head>
	<body"><center>
<div>
	<div style="float: left; width: 835px; display: inline-block;"><!--Player aur theme wala div-->
		<div style="float: right;">
		<div id="audioPlayer" class="audio-player">

			<div class="top-bar">
				<img src="buttons/add.png" style="margin-right: 20px; margin-left: -200px; margin-bottom: 15px; margin-top: 20px;" width="30px" onclick="hideShowThemePanel();" />
				<img src="buttons/help.png" style="margin-right: 20px; margin-bottom: 15px; margin-top: 20px;" width="30px" onclick="aboutPopup();" />					
			</div>

			<div id="logo" class="logo"><!--album art wala div-->
				<img class="album_art" src="buttons/art.png">
			</div>

			<div class="player">
				<div id="songTitle" class="song-title">
					Upload. Select. Listen.
				</div>

				<div id="nextSongTitle" class="next-song-title"><b>Next Song:</b></div>

				<div>
					<div id="currentTime" class="current-time">00:00</div>
					<div id="duration" class="duration">00:00</div>
				</div>

				<input id="songSlider" class="song-slider" type="range" min="0" step="1" onchange="seekSong()" /><!--songseek bar-->
				

				<div class="controllers"><!--play pause forward etc wala div-->
					<img src="buttons/shuffle.png" style="margin-right: 20px; margin-bottom: 15px;" width="15px"  onclick="shuffle();" />
					<img src="buttons/back.png" style="margin-right: 20px; margin-bottom: 15px;" width="15px"  onclick="previous();" />
					<img src="buttons/rewind.png" style="margin-right: 20px;  margin-bottom: 12px;" width="20px" onclick="decreaseSpeed();" / />
					<img src="buttons/play.png" id="playPause" width="50px" onclick="playOrPauseSong(this);" />
					<img src="buttons/forward.png" style="margin-left: 20px;  margin-bottom: 12px;" width="20px" onclick="increaseSpeed();" />
					<img src="buttons/next.png" style="margin-left: 20px;  margin-bottom: 15px;" width="15px" onclick="next();" />
					<img src="buttons/stop.png" style="margin-left: 20px;  margin-bottom: 15px;" width="13px" onclick="stop();" />
				</div>



				<div class="volume-controller"><!--volume wala div-->
					<img src="buttons/volume.png" width="20px" id="muteButton" onclick="muteSound();" />
					<input id="volumeSlider" class="volume-slider" type="range" min="0" max="1" step="0.01" onchange="adjustVolume();" />
					<!--<img src="buttons/volume.png" width="20px" />-->
				</div>	
				
			</div>
		</div>


		<div style="height: 110px;"><!--Themes wala div-->
			<div id="visual" class="visual">
				<span style="color: white; font-family: 'Roboto', sans-serif; font-size: 15px;"> select theme :</span>
				<img src="buttons/blur.jpg" width="23px" height="23px" style="margin-top: 10px;" onclick="setTheme0();" />
				<img src="buttons/blur1.jpg" width="23px" height="23px" style="margin-top: 10px;" onclick="setTheme1();" />
				<img src="buttons/blur2.jpg" width="23px" height="23px" style="margin-top: 10px;" onclick="setTheme2();" />
				<img src="buttons/blur3.jpg" width="23px" height="23px" style="margin-top: 10px;" onclick="setTheme3();" />
				<img src="buttons/blur4.jpg" width="23px" height="23px" style="margin-top: 10px;" onclick="setTheme4();" />
				<img src="buttons/blur5.jpg" width="23px" height="23px" style="margin-top: 10px;" onclick="setTheme5();" />
				<img src="buttons/blur6.jpg" width="23px" height="23px" style="margin-top: 10px;" onclick="setTheme6();" />
				<img src="buttons/blur7.jpg" width="23px" height="23px" style="margin-top: 10px;" onclick="setTheme7();" />
				<img src="buttons/blur8.jpg" width="23px" height="23px" style="margin-top: 10px;" onclick="setTheme8();" />
			</div>
		</div>
		</div>
	</div>

<div style="float: right; width: 835px; display: inline-block;">
	<div style="float: left;" >
	<div class="playlist" id="playlist"><!--Playlist wala div-->
		<form action="http://localhost:8080/xmusic/webapi/myresource/upload" method="post" enctype="multipart/form-data">
			<input type="file" accept="audio/*" name="file" action="songs/" name="upload-music" id="file" class="upload-music"  multiple />
			<input type="submit" value="upload" onclick="uploadMusic(); playlistFetch();">
		</form>

		<!--<input type="file" accept="audio/*" action="songs/" name="upload-music" id="file" class="upload-music" onchange="uploadMusic(); playlistFetch();" multiple />
		<label for="upload-music">Add music</label>-->

		<div id="song-list" class="song-list">
			<!--Here appears the playlist fetched from songs array using fuction playlistFetchg();-->
		</div>
	</div>

	<div class="equaliser">
		<img src="buttons/eq_paused.PNG" id="equaliser" class="equaliser_img">
	</div>

	</div>
</div>	
</div>


</center>
		<script type="text/javascript" src="functions.js"></script>
	</body>
</html>