var data_song = {
    pic: [],
    song_id: [],
    point_id: null,
    song_name: [],
    songer: [],
    songYofN: false,
    song_lrc:[],
}
var data_quan=null;
var num_song_i=0;
var $that;
var $audio = $('audio');
var $nav_mou_img = $('.nav-mou>img');
var $nav_mou_b = $('.nav-mou-span b');
var $nav_mou_span = $('.nav-mou-span>span');
var url = 'https://music.163.com/song/media/outer/url?id=';
$.ajax({
    type: 'GET',
    url: 'https://www.arthurdon.top:10099/top/list?idx=1',
    success: function (data) {
        songsDetail = data.playlist.tracks.concat();
        var str;
        var songer;
        data_quan=data;
        $('.recent-spannum').text(data.code)
        for (var i = 0; i < 15; i++) {
            songer = [];
            for (let j = 0; j < songsDetail[i].ar.length; j++) {

                songer.push(songsDetail[i].ar[j].name);
            }
            str = `<div class="song-list-one" id="${songsDetail[i].id}" data-pic='${i}' data-play=0>
            <div class="song-list-one-img fl " style="background:url(${songsDetail[i].al.picUrl});background-size:cover; "></div>
            <div class="song-list-one-word fl">
                <p>${songsDetail[i].name}</p>
                <span>${songer.join('/')}</span>
            </div>
            <div class='yingdong'>
            <div class="line1"></div>      
            <div class="line2"></div> 
            <div class="line1"></div> 
            <div class="line2"></div> 
            <div class="line1"></div> 
            <div class="line2"></div>   
            <div class="line1"></div>    
        </div>
        </div>`
            $('.song-list-every').append(str);
            data_song.pic.push(songsDetail[i].al.picUrl);
            data_song.songer.push(songer.join('/'));
            data_song.song_name.push(songsDetail[i].name);
            data_song.song_id.push(songsDetail[i].id);
        };
        $nav_mou_img.attr("src", data_song.pic[0]);
        $nav_mou_b.text(data_song.song_name[0]);
        $nav_mou_span.text(data_song.songer[0]);
        data_song.point_id = data_song.song_id[0];
        $audio.attr('src', url + data_song.point_id);
        var $song_list_one = $('.song-list-one');
        $('.yingdong').hide();
        $song_list_one.on('click', function () {
            if (data_song.point_id != Number($(this).attr('id'))) {
                num_song_i=Number($(this).data('pic'))
                if ($that != undefined) {
                    $that.hide();
                }
                $(this).find('.yingdong').show();
                // console.log($(this).find('.yingdong'));
                // console.log($(this).attr('id'))
                $that = $(this).find('.yingdong');
                data_song.point_id = Number($(this).attr('id'));
                console.log('wdawd',data_song.point_id)
                var zidx = $(this).data('pic');
                $nav_mou_img.attr("src", data_song.pic[zidx]);
                $nav_mou_b.text(data_song.song_name[zidx]);
                $nav_mou_span.text(data_song.songer[zidx]);
                $audio.attr('src', url + data_song.point_id);
                $('#begin').attr('src', './images/stop.png');
                data_song.songYofN = true;
                $audio[0].play();
            }
        })
    }
})
