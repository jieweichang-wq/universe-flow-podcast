import fs from 'fs';
import path from 'path';

async function extract() {
  console.log('Fetching RSS from Firstory...');
  const res = await fetch('https://feed.firstory.me/rss/user/ckpp8gmtxcbi708463itdb0t5');
  const xml = await res.text();

  const getTag = (str, tag) => {
    const m = str.match(new RegExp('<' + tag + '[^>]*>([\\s\\S]*?)<\\/' + tag + '>', 'i'));
    return m ? m[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim() : '';
  };

  const getAttr = (str, tag, attr) => {
    const m = str.match(new RegExp('<' + tag + '[^>]*' + attr + '="([^"]+)"', 'i'));
    return m ? m[1] : '';
  };

  const items = xml.split('<item>').slice(1);
  const episodes = items.map((item, idx) => {
    const title = getTag(item, 'title');
    const pubDate = getTag(item, 'pubDate');
    const duration = getTag(item, 'itunes:duration') || '0';
    const audioUrl = getAttr(item, 'enclosure', 'url');
    const episodeCover = getAttr(item, 'itunes:image', 'href') || 'https://d3mww1g1pfq2pt.cloudfront.net/Avatar/ckpp8gmtxcbi708463itdb0t5/1674125530647.jpg';
    let desc = getTag(item, 'description');
    
    // Determine category / tag
    let category = '自我覺察';
    if (title.includes('樹洞')) category = '粉絲樹洞';
    else if (title.includes('《') || title.includes('電影') || title.includes('劇')) category = '影劇心靈';
    else if (title.includes('人際') || title.includes('關係') || title.includes('討厭') || title.includes('孤獨') || title.includes('朋友') || title.includes('界線')) category = '人際與情感';
    else if (title.includes('職場') || title.includes('工作') || title.includes('壓力') || title.includes('焦慮') || title.includes('情緒')) category = '情緒與生活';

    // Format duration to mm:ss or hh:mm:ss
    let durationFormatted = '00:00';
    const sec = parseInt(duration, 10);
    if (!isNaN(sec)) {
      const h = Math.floor(sec / 3600);
      const m = Math.floor((sec % 3600) / 60);
      const s = sec % 60;
      if (h > 0) {
        durationFormatted = `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
      } else {
        durationFormatted = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
      }
    } else if (duration.includes(':')) {
      durationFormatted = duration;
    }

    return {
      id: 'ep-' + (items.length - idx),
      episodeNumber: items.length - idx,
      title,
      pubDate,
      duration: durationFormatted,
      durationSec: isNaN(sec) ? 0 : sec,
      audioUrl,
      cover: episodeCover,
      category,
      desc
    };
  });

  const podcastInfo = {
    title: '宇宙流',
    subtitle: 'Roger的自我覺察&心靈流動',
    author: 'Roger',
    cover: 'https://d3mww1g1pfq2pt.cloudfront.net/Avatar/ckpp8gmtxcbi708463itdb0t5/1674125530647.jpg',
    description: '是一個創造自我覺察、認識自我、體驗人生的空間，透過分享的內容，提供聆聽者有新的想法或是瞥見。順應著宇宙的流動，去探討人生中的許多課題與煩惱，無論是人生、感情、信念、職場等，沒有要提供大家解答，而是想透過分享，以及與聽者的互動，做進一步的討論與思辯，也期待透過這些討論與分享，能夠打破原來的限制與想法。\n\n我們來自於宇宙，陪伴你隨著宇宙的流動，體驗人生、覺察生命，成為完整的自己。',
    email: 'universe.flow2021@gmail.com',
    instagramUrl: 'https://www.instagram.com/universe.flow2021/',
    youtubeUrl: 'https://www.youtube.com/@podcast1832',
    rssUrl: 'https://feed.firstory.me/rss/user/ckpp8gmtxcbi708463itdb0t5',
    totalEpisodes: episodes.length,
    updatedAt: new Date().toISOString()
  };

  const targetDir = path.resolve('src', 'data');
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  fs.writeFileSync(path.join(targetDir, 'podcast.json'), JSON.stringify(podcastInfo, null, 2), 'utf-8');
  fs.writeFileSync(path.join(targetDir, 'episodes.json'), JSON.stringify(episodes, null, 2), 'utf-8');
  console.log(`Successfully saved ${episodes.length} episodes to src/data!`);
}

extract().catch(console.error);
