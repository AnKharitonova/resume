const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => { const isOpen = nav.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(isOpen)); });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); }));
}
const memes = [
 {image:'assets/meme-explained.png',title:'Когда всё объяснили',caption:'Хорошо, что мне всё объяснили. Плохо, что я ничего не понял.',tag:'рабочие будни'},
 {image:'assets/meme-design-cat.png',title:'Многозадачность уровня «кот»',caption:'Открыто 17 вкладок. В одной из них я точно помню, что искала.',tag:'инструменты'},
 {image:'assets/meme-work-soul.jpg',title:'Работа-то меня устраивает',caption:'А душа в это время тихонько ушла погладить кота.',tag:'баланс'},
 {image:'assets/meme-idea-result.png',title:'План был прекрасен',caption:'Идея — быть крутым. Реализация — быть кринжовым. Зато честно.',tag:'ожидание / реальность'},
 {image:'assets/meme-trustworthy-cat.jpg',title:'Достоверный источник',caption:'Я уверяю вас, сейчас предоставлю достоверную информацию. Но сначала — сникерс.',tag:'проверка фактов'},
 {image:'assets/meme-colleagues.png',title:'Коллеги, подсвечу моментик',caption:'Коллеги, подсвечу момент — свеча уже подготовлена.',tag:'рабочие будни'},
 {image:'assets/meme-fresh-look.jpg',title:'Свежий взгляд с утра',caption:'«Пробегусь по тексту свежим взглядом с утра». Вот он, свежий взгляд.',tag:'редактура'},
 {image:'assets/meme-cat-train.jpg',title:'Котячий поезд',caption:'Кажется, задачи выстроились в очередь. Главное — не перепутать вагоны.',tag:'процессы'},
 {image:'assets/meme-hoodie-cat.jpeg',secondImage:'assets/meme-january-cats.jpeg',title:'Маленькие доспехи и шлем',caption:'Это один мем из двух кадров: сначала коту предлагают маленькие доспехи и шлем, а на втором кадре — ответ рыцаря: «Вау». ',tag:'кот в броне'},
 {image:'assets/meme-new-year.jpg',title:'Держи солнышко',caption:'Если в твоё окно сегодня не светит солнышко — вот, держи!',tag:'поддержка'},
 {image:'assets/meme-bay.jpeg',title:'Котик в странном капюшоне',caption:'Когда надел что-то одноразмерное, а получил новый характер.',tag:'котики'},
 {image:'assets/meme-fridge-cat.jpeg',title:'А вкусно где?!',caption:'Когда взрослая версия тебя купила всё полезное, а вкусного не завезли.',tag:'ночные мысли'},
 {image:'assets/meme-armor.jpg',title:'Первое и девятое января',caption:'Новый год: прошло всего восемь дней, а разница уже заметна.',tag:'сезонное'},
 {image:'assets/meme-sun-cat.jpeg',title:'На носу уже Новый год',caption:'Ёлка уже всё знает.',tag:'сезонное'},
 {image:'assets/meme-cooking.jpg',title:'С завтрашнего дня — режим',caption:'Ну, с завтрашнего дня точно войду в режим. Сегодня — только моральная подготовка.',tag:'самоорганизация'},
 {image:'assets/meme-cookie.jpeg',title:'Зря вы доверили мне готовку',caption:'«Я думала, мы снова занимаемся страшным мошенничеством» — кулинарный подход, который никто не просил.',tag:'эксперименты'}
];
const grid = document.querySelector('#meme-grid');
if (grid) {
  const lightbox = document.createElement('div'); lightbox.className = 'meme-lightbox'; lightbox.setAttribute('role','dialog'); lightbox.setAttribute('aria-modal','true'); lightbox.setAttribute('aria-label','Просмотр мема');
  lightbox.innerHTML = '<button class="lightbox-close" type="button" aria-label="Закрыть">×</button><div class="lightbox-content"></div><p class="lightbox-caption"></p>';
  document.body.append(lightbox);
  const content = lightbox.querySelector('.lightbox-content'); const caption = lightbox.querySelector('.lightbox-caption');
  function closeBox(){ lightbox.classList.remove('open'); content.innerHTML=''; }
  lightbox.querySelector('.lightbox-close').addEventListener('click',closeBox);
  lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeBox()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeBox()});
  memes.forEach(meme => {
    const card = document.createElement('article'); card.className = 'meme-card';
    const open = () => { content.innerHTML=''; [meme.image,meme.secondImage].filter(Boolean).forEach(src=>{const big=document.createElement('img');big.src=src;big.alt=meme.title;content.append(big)}); caption.textContent=meme.title+' — '+meme.caption; lightbox.classList.add('open'); lightbox.querySelector('.lightbox-close').focus(); };
    [meme.image,meme.secondImage].filter(Boolean).forEach(src=>{const img=document.createElement('img');img.src=src;img.alt=meme.title;img.loading='lazy';img.decoding='async';img.className='meme-image';img.addEventListener('click',open);img.tabIndex=0;img.setAttribute('role','button');img.setAttribute('aria-label','Открыть мем крупнее: '+meme.title);img.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}});card.append(img)});
    const captionBox = document.createElement('div'); captionBox.className = 'meme-caption';
    const tag = document.createElement('span'); tag.className = 'meme-tag'; tag.textContent = meme.tag;
    const title = document.createElement('h3'); title.textContent = meme.title;
    const text = document.createElement('p'); text.textContent = meme.caption;
    const zoom = document.createElement('button'); zoom.className='meme-zoom'; zoom.type='button'; zoom.textContent='Посмотреть крупнее ↗'; zoom.addEventListener('click',open);
    captionBox.append(tag,title,text,zoom); card.append(captionBox); grid.append(card);
  });
}
