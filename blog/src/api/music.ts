import Request from '@/utils/request'
class Music {
    //根据歌单id获取歌单内容
     private getMusicPlayListById(params: { id: string }){
         return  Request({
            url:'/music/playlist/detail',
            method: 'get',
            params: params
        });
    }
    //根据歌曲id(复数,通过逗号相隔)获取音乐内容
    private getMusicInfoByIds(params: { ids: string }){
        return Request({
            url:'/music/song/detail',
            method: 'get',
            params: params
        });
    }
    //根据歌曲id(复数,通过逗号相隔)获取音乐url
    private getMusicUrlById(params: { id: string }){
        return Request({
            url:'/music/song/url',
            method: 'get',
            params: params
        });
    }
    //根据歌曲id,获取音乐歌词
     getMusicLyricById(params: { id: string }){
        return Request({
            url:'/music/lyric',
            method: 'get',
            params: params
        });
    }
    //根据歌单id，获取aplayer的数据
    async getAplayerDataById(params: { id: string }){
        let obj: any;
        // 所有歌曲id信息
        let trackIds: any[];
        // 所有歌曲id字符串，以逗号分隔
        let songIds: string = '';
        // 所有歌曲基本信息
        let songs: any[];
        // 所有歌曲url
        let songUrls: any[];
        // urlmap根据id查找url
        let urlMap = new Map();
        // 所有音乐
        let audios: any[]=[];
        obj=await this.getMusicPlayListById(params)
        trackIds=obj.playlist.trackIds;
        trackIds.forEach(item => {
            songIds = songIds + item.id + ',';
        });
        songIds = songIds.substring(0, songIds.length - 1);
        obj = await this.getMusicInfoByIds({ids: songIds});
        songs = obj.songs;
        obj = await this.getMusicUrlById({id: songIds});
        songUrls = obj.data;
        songUrls.forEach(item => {
            urlMap.set(item.id, item.url);
        })
        for (let i = 0; i < songs.length; i++) {
            var song: { [propName: string]: any } = {};
            //id
            song.id = songs[i].id;
            //歌曲名
            song.name = songs[i].name;
            //作者名称
            let ars = songs[i].ar;
            let artist = ''
            for (let j = 0; j < ars.length; j++) {
                artist += ars[j].name + '/'
            }
            song.artist = artist.substring(0, artist.length - 1)
            //url
            song.url = urlMap.get(songs[i].id);
            //封面
            song.cover = songs[i].al.picUrl;
            //歌词
            let lyricTmep: any =  await this.getMusicLyricById({id: songs[i].id})
             if (lyricTmep.tlyric  && lyricTmep.tlyric.lyric) {
                 song.lrc = lyricTmep.tlyric.lyric;
             } else if (lyricTmep.lrc && lyricTmep.lrc.lyric) {
                 song.lrc = lyricTmep.lrc.lyric;
             } else {
                 song.lrc = "暂无歌词"
             }
             audios.push(song)
         }
        return audios;
    }

}
export default Music
