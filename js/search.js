function getSearch() {
    var search_keywords = $("search").value;

    var search_url = 'https://gtbcamp.cn/neteasecloudmusic/cloudsearch?type=1&keywords=' + search_keywords

    var song_count = ""
    var songs_name = []
    var songs_id = []

    $("searchReturn").innerHTML = ""

    fetch(search_url)
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            song_count = json.result.songCount;
            for (i = 0; i < song_count; i++) {
                songs_name[i] = json.result.songs[i].name;
                songs_id[i] = json.result.songs[i].id;
                console.log(songs_id[i]);
                $("searchReturn").innerHTML += "<p onclick=getSong(" + songs_id[i] + ")>" + (i + 1) + ". " + songs_name[i] + "<\p>";
            }
        })
}