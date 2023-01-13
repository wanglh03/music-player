//search.js

//搜索
function getSearch() {
    var search_keywords = $("search").value;

    var search_url = 'https://gtbcamp.cn/neteasecloudmusic/cloudsearch?type=1&keywords=' + search_keywords

    var song_count = ""

    $("search-return").innerHTML = ""

    fetch(search_url)
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            //song_count = json.result.songCount;
            song_count = 30;
            for (i = 0; i < song_count; i++) {
                songs_name[i] = json.result.songs[i].name;
                songs_id[i] = json.result.songs[i].id;
                pic_url[i] = json.result.songs[i].al.picUrl;

                $("search-return").innerHTML += "<p onclick=getSong(" + songs_id[i] + ") value=" + i + " >" + (i + 1) + ". " + songs_name[i] + " <\p > ";
            }
        })
}