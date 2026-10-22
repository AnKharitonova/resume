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


// Quiz: Кто ты из обитателей моего скетчбука?
(() => {
  const root = document.querySelector('#quiz-app');
  if (!root) return;
  const characters = {
    cat: {name:'Котик-хаос', image:'assets/doodle-cat.svg', tagline:'Вышел за водой, вернулся с тремя новыми идеями и забыл, зачем выходил.', description:'У тебя есть план. Даже несколько. Какой из них актуальный — загадка для всего человечества. Обычный поход на кухню легко превращается в новое хобби, перестановку мебели и исследование вопроса, почему голуби ходят именно так.', traits:['внезапные идеи','творческий беспорядок','побочные квесты']},
    frog: {name:'Лягушка-философ', image:'assets/doodle-frog.svg', tagline:'Чай остыл. Вопрос о смысле жизни — нет.', description:'Ты способен найти глубокий смысл в случайной фразе, взгляде кота и форме облака. Пока остальные уже решили проблему, ты исследуешь, почему она вообще возникла и не является ли всё это метафорой.', traits:['глубокие мысли','анализ всего','экзистенциальный чай']},
    mushroom: {name:'Грибочек-интроверт', image:'assets/doodle-mushroom.svg', tagline:'Лучшее мероприятие — то, которое отменили, когда ты уже дома.', description:'Тебе не нужно постоянно быть в центре событий. Иногда идеальный вечер — это уют, любимые занятия и телефон, который почему-то совсем не звонит. Ты не пропал. Ты просто вернулся в естественную среду обитания.', traits:['уютный режим','личные границы','социальная батарейка']},
    duck: {name:'Уточка на чилле', image:'assets/doodle-duck.svg', tagline:'Плывёшь по течению. Иногда крякаешь на проблемы.', description:'Пока вокруг все срочно решают, спасают и переделывают, ты сначала выясняешь, действительно ли всё настолько ужасно. Иногда оказывается, что нет. Иногда — что можно просто поесть и вернуться к вопросу позже.', traits:['спокойствие','гибкость','минимум драмы']},
    cow: {name:'Коровка-оптимист', image:'assets/doodle-cow.svg', tagline:'Вселенная что-нибудь придумает. Надеемся, хорошее.', description:'Даже если день пошёл наперекосяк, ты оставляешь шанс на хороший финал. Не потому, что не замечаешь проблем, а потому, что не собираешься отдавать им весь день. Где-то ведь должен быть подвох в лучшую сторону.', traits:['оптимизм','душевное тепло','надежда вопреки']},
    bee: {name:'Пчёлка-трудоголик', image:'assets/bee-doodle.svg', tagline:'Устала от дел, поэтому добавила ещё одно.', description:'Ты любишь ощущение, что всё движется и задачи постепенно закрываются. Правда, иногда список дел растёт быстрее, чем успевает сокращаться. Отдых уже запланирован — осталось найти в расписании свободные сорок семь секунд.', traits:['ответственность','вечный движ','список дел']},
    rat: {name:'Крыска-хитрюга', image:'assets/doodle-rat.svg', tagline:'Есть план, запасной план и сыр на чёрный день. Никому не говори, где сыр.', description:'Ты умеешь замечать возможности там, где остальные видят тупик. Пока все пытаются решить задачу в лоб, ты уже нашёл обходной путь, полезный контакт и скидку. Это не хитрость. Это оптимизация жизненных процессов.', traits:['находчивость','стратегия','запасной план']}
  };
  const questions = [
    {q:'Ты зашёл в комнату и забыл зачем. Что дальше?',a:[['cat','Выйти и зайти снова. Научный метод.'],['frog','Постоя́ть, вдруг воспоминание загрузится.'],['rat','Найти что-нибудь другое и объявить это целью.'],['duck','Принять, что у мозга сегодня выходной.']]},
    {q:'Внезапно освободился целый день. Что дальше?',a:[['bee','Составить грандиозный план и устать уже на первом пункте.'],['mushroom','Устроить себе маленькую жизнь без обязательств.'],['frog','Разобраться с мыслями, которые открыты с 2019 года.'],['cat','Найти занятие, которого вообще не было в планах.']]},
    {q:'Как выглядит борьба с хаосом?',a:[['cat','Хаос временно переименован в творческий процесс.'],['frog','Это интересный эксперимент. Наблюдаем.'],['bee','Всё под контролем. Контроль, правда, ничего не контролирует.'],['rat','Найти сыр. Остальное неважно.']]},
    {q:'Какой супернавык пригодился бы в жизни?',a:[['bee','Успевать всё и не выгорать.'],['frog','Отключать поток мыслей по кнопке.'],['mushroom','Телепортироваться домой, когда социальная батарейка села.'],['rat','Находить выход из любой ситуации и иногда даже получать выгоду.']]},
    {q:'Какой вечер кажется идеальным?',a:[['bee','Все дела закрыты, совесть чиста, можно отдыхать.'],['mushroom','Чай, плед и отсутствие обязательств перед человечеством.'],['cat','Случайное приключение с непредсказуемым финалом.'],['cow','Даже если день странный, главное — чтобы было что-то вкусное.']]},
    {q:'Что обычно происходит с планом «с понедельника начну»?',a:[['mushroom','Начало переносится на следующий понедельник.'],['cat','Появляется новая идея, и первоначальный план исчезает.'],['bee','Всё начинается немедленно, параллельно запускаются ещё пять дел.'],['frog','Решение принимается после тщательного анализа всех возможных исходов.']]},
    {q:'Тебе неожиданно пришли деньги. Первая мысль?',a:[['bee','Отложить часть. Я теперь финансово ответственная личность.'],['frog','Проверить, не ошибка ли это.'],['cat','Уже мысленно потратить трижды.'],['rat','Найти что-нибудь полезное, что давно хотелось приобрести.']]},
    {q:'Какая надпись должна быть на упаковке твоей личности?',a:[['frog','Осторожно: внутри много мыслей, некоторые без присмотра.'],['duck','Содержимое может внезапно уйти на перерыв.'],['cat','Работает на чае, любопытстве и сомнительных решениях.'],['rat','При обнаружении сыра вернуть владельцу.']]}
  ];
  const start = root.querySelector('#quiz-start'), play = root.querySelector('#quiz-play'), result = root.querySelector('#quiz-result');
  const questionEl = root.querySelector('#quiz-question'), optionsEl = root.querySelector('#quiz-options');
  const counter = root.querySelector('#quiz-counter'), percent = root.querySelector('#quiz-percent'), progress = root.querySelector('#quiz-progress'), fill = root.querySelector('#quiz-progress-fill');
  const back = root.querySelector('#quiz-back'), next = root.querySelector('#quiz-next');
  let current = 0, answers = Array(questions.length).fill(null), finalCharacter = null;
  function renderQuestion(){
    const item = questions[current]; questionEl.textContent = item.q; counter.textContent = `Вопрос ${current+1} из ${questions.length}`;
    const pct = Math.round(((current+1)/questions.length)*100); percent.textContent = `${pct}%`; fill.style.width = `${pct}%`; progress.setAttribute('aria-valuenow',String(current+1));
    optionsEl.replaceChildren();
    item.a.forEach(([character,text],i)=>{
      const button=document.createElement('button');button.type='button';button.className='quiz-option';button.setAttribute('aria-pressed',String(answers[current]===i));
      const letter=document.createElement('span');letter.className='quiz-option-letter';letter.textContent=String.fromCharCode(65+i);
      const label=document.createElement('span');label.textContent=text;button.append(letter,label);
      button.addEventListener('click',()=>{answers[current]=i;optionsEl.querySelectorAll('.quiz-option').forEach((b,j)=>b.setAttribute('aria-pressed',String(j===i)));next.disabled=false;}); optionsEl.append(button);
    });
    back.disabled=current===0;next.disabled=answers[current]===null;next.textContent=current===questions.length-1?'Узнать результат ✨':'Дальше ↗';
  }
  function showResult(){
    const scores=Object.fromEntries(Object.keys(characters).map(key=>[key,0]));
    answers.forEach((answer,i)=>{if(answer!==null){const key=questions[i].a[answer][0];scores[key]+=1;}});
    const order=['cat','frog','mushroom','duck','cow','bee','rat'];
    // Stable tie-breaker: prefer the character selected on the latest answered question among tied leaders.
    const high=Math.max(...Object.values(scores)); const tied=order.filter(key=>scores[key]===high);
    finalCharacter=tied.length===1?tied[0]:[...answers].reverse().map((a,revIndex)=>{const qIndex=answers.length-1-revIndex;return a===null?null:questions[qIndex].a[a][0]}).find(key=>tied.includes(key))||tied[0];
    const c=characters[finalCharacter];
    const art=document.createElement('img');art.src=c.image;art.alt=c.name;root.querySelector('#quiz-result-art').replaceChildren(art);
    root.querySelector('#quiz-result-title').textContent=`Ты — ${c.name}!`;
    root.querySelector('#quiz-result-tagline').textContent=`«${c.tagline}»`;
    root.querySelector('#quiz-result-description').textContent=c.description;
    const traits=root.querySelector('#quiz-result-traits');traits.replaceChildren();c.traits.forEach(t=>{const el=document.createElement('span');el.className='quiz-trait';el.textContent=t;traits.append(el)});
    start.hidden=true;play.hidden=true;result.hidden=false;root.querySelector('#quiz-share-note').textContent='';
  }
  root.querySelector('#quiz-begin').addEventListener('click',()=>{current=0;answers=Array(questions.length).fill(null);start.hidden=true;result.hidden=true;play.hidden=false;renderQuestion();});
  back.addEventListener('click',()=>{if(current>0){current--;renderQuestion()}});
  next.addEventListener('click',()=>{if(answers[current]===null)return;if(current<questions.length-1){current++;renderQuestion()}else showResult()});
  root.querySelector('#quiz-restart').addEventListener('click',()=>{current=0;answers=Array(questions.length).fill(null);finalCharacter=null;result.hidden=true;start.hidden=false;play.hidden=true;root.querySelector('#quiz-share-note').textContent='';});
  root.querySelector('#quiz-share').addEventListener('click',async()=>{
    const c=characters[finalCharacter];const shareText=`В квизе «Кто ты из обитателей моего скетчбука?» мне выпал результат: ${c.name}! «${c.tagline}»`;
    const note=root.querySelector('#quiz-share-note');
    if(navigator.share){try{await navigator.share({title:'Кто ты из обитателей моего скетчбука?',text:shareText,url:location.href});note.textContent='';}catch(e){if(e.name!=='AbortError')note.textContent='Не получилось открыть меню отправки. Можно скопировать результат вручную.';}}
    else if(navigator.clipboard&&window.isSecureContext){try{await navigator.clipboard.writeText(shareText+' '+location.href);note.textContent='Текст результата скопирован — можно отправлять друзьям!';}catch(e){note.textContent=shareText;}}
    else note.textContent=shareText;
  });
})();
