//search.js

//搜索
function getSearch() {
    let searchKeywords = $("search").value;

    let searchUrl = `https://gtbcamp.cn/neteasecloudmusic/cloudsearch?keywords=${searchKeywords}&type=1`;

    let songCount = 30;

    $("search-return").innerHTML = "";

    fetch(searchUrl)
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            //songCount = json.result.songCount;
            for (i = 0; i < songCount; i++) {
                songsName[i] = json.result.songs[i].name;
                songsId[i] = json.result.songs[i].id;
                picUrl[i] = json.result.songs[i].al.picUrl;

                $("search-return").innerHTML += `<li onclick=getSong("${songsId[i]}")>${songsName[i]}`;
            }
        })
}