//song.js

//更新播放器，歌词，歌曲信息
function getSong(song_id) {
    var lyric_url = 'https://gtbcamp.cn/neteasecloudmusic/lyric?id=' + song_id
    var song_url = 'https://gtbcamp.cn/neteasecloudmusic/song/url?id=' + song_id

    var lyric_data = ""

    current_song_i = songs_id.indexOf(song_id);

    $("song-pic").src = pic_url[current_song_i]

    var title = "音乐空间 - 正在播放：" + songs_name[current_song_i]
    document.title = title
    $("song-title").innerHTML = "音乐空间 - 正在播放：" + songs_name[current_song_i]

    fetch(lyric_url)
        .then((response) => response.json())
        .then((json) => {
            //console.log(json);
            lyric_data = json;
        })
    fetch(song_url)
        .then((response) => response.json())
        .then((json) => {
            //console.log(json);
            $("player").src = json.data[0].url;
        })

    // sleep(500).then(() => {
    //     console.log(lyric_data.lrc.lyric)
    //     console.log(lyric_data.tlyric.lyric)
    // })

    sleep(500).then(() => {

        var musicPlayer = function () {
            return this.init.apply(this, arguments);
        };

        musicPlayer.prototype = {
            constructor: musicPlayer,
            init: function (options) {
                if (isEmptyObj(options) || typeof options !== 'object') return;
                this.player = options.player;
                this.lrc = options.lrc;
                this.lrcArea = options.lrcArea;
                //用于保存歌词
                this.lrcArr = [];
                //用于保存时间戳
                this.timestamp = [];
                //处理歌词
                this.handleLrc(this.lrc);
                var that = this;

                this.player.addEventListener('play',
                    function () {
                        that.play();
                    },
                    false);

                this.player.addEventListener('pause',
                    function () {
                        that.pause();
                    },
                    false);

                //歌词索引
                this.idx = 0;
            },
            //格式化歌词
            handleLrc: function (lrc) {
                var re = /(\[.+\])(.+)?/gm,
                    ul = document.createElement('ul'),
                    frag = document.createDocumentFragment(),
                    tmpArr,
                    i,
                    len;
                this.lrcArea.innerHTML = '';
                frag.appendChild(ul);
                ul.id = 'c';
                this.lrcArea.appendChild(frag);

                var txt = lrc.replace(re,
                    function (a, b, c) {
                        return b + (c === undefined ? '&nbsp;' : c) + '\n';
                    });

                tmpArr = txt.split('\n');

                //处理歌词
                for (i = 0, len = tmpArr.length; i < len; i++) {
                    var item = trim(tmpArr[i]);
                    if (item.length > 0) {
                        this.lrcArr.push(item);
                    }
                }

                frag = document.createDocumentFragment();

                for (i = 0, len = this.lrcArr.length; i < len; i++) {
                    var li = document.createElement('li');
                    if (i === 0) {
                        li.className = 'cur';
                    }
                    li.innerHTML = this.lrcArr[i].replace(/\[.+\]/i, '');
                    //处理时间
                    this.timestamp.push(this.lrcArr[i].replace(re,
                        function (a, b, c) {
                            return b;
                        }).replace('[', '').replace(']', ''));
                    frag.appendChild(li);
                }

                ul.appendChild(frag);
                this.li = $('lrcArea').getElementsByTagName('li');
            },
            //播放
            play: function () {
                this.stop = false;
                var that = this,
                    player = this.player,
                    i, len;

                this.t = setInterval(function () {
                    if (that.stop) return;
                    that.curTime = player.currentTime;

                    for (i = 0, len = that.timestamp.length - 1; i < len; i++) {
                        var prevTime = that.formatTimeStamp(that.timestamp[i]),
                            nextTime = that.formatTimeStamp(that.timestamp[i + 1]);
                        //当前播放时间与前后歌词时间比较，如果位于这两者之间则转到该歌词
                        if (parseFloat(that.curTime) > prevTime && parseFloat(that.curTime) < nextTime) {
                            that.scrollToLrc(i);
                            return;
                        }
                    }
                },
                    300);
            },
            //暂停
            pause: function () {
                this.stop = true;
                clearInterval(this.t);
            },
            //格式化时间
            formatTimeStamp: function (timestamp) {
                var re = /([0-9]+):([0-9]+)\.([0-9]+)/i,
                    seconds = timestamp.replace(re,
                        function (a, b, c, d) {
                            return Number(b * 60) + Number(c) + parseFloat('0.' + d);
                        });
                return seconds;
            },
            //歌词滚动
            scrollToLrc: function (idx) {
                var ds = getOffset(this.li[idx]).top,
                    i,
                    len;
                //如果歌词索引没有变动，则认为这句没有唱完，不处理
                if (this.idx === idx) return;
                //否则更新索引值并更新样式和位置
                this.idx = idx;
                for (i = 0, len = this.li.length; i < len; i++) {
                    this.li[i].className = '';
                }
                this.li[idx].className = 'cur';
                this.lrcArea.scrollTop = ds - this.lrcArea.offsetHeight / 2;
            }
        };

        var p = new musicPlayer({
            player: $('player'),
            lrc: lyric_data.lrc.lyric,
            lrcArea: $('lrcArea')
        });
    })

}