$('#i_file').change( function(event) {
    var tmppath = URL.createObjectURL(event.target.files[0]);
    const source = document.createElement('source');
    const div = document.createElement('div');
    var html_player = `
                <video id="my-video" class="" preload="metadata" controls controlsList="nodownload" autoplay preload="auto" data-setup="{}">
                    <p class="vjs-no-js">To view this video please enable JavaScript
                </video>

    `;
    if (!document.querySelector(".player-video")){
        div.className = "player-video"
        div.innerHTML = html_player
        document.getElementById('customcontrols').appendChild(div);
        source.className = "player-video"
        source.setAttribute("src", tmppath);
        source.setAttribute("type", "video/mp4");
        document.getElementById('my-video').appendChild(source);

    }else{
        $('.player-video').remove();
        $('.video').remove();
        

        div.className = "player-video"
        div.innerHTML = html_player
        document.getElementById('customcontrols').appendChild(div);
        source.className = "video"
        source.setAttribute("src", tmppath);
        source.setAttribute("type", "video/mp4");
        document.getElementById('my-video').appendChild(source);

    }
});