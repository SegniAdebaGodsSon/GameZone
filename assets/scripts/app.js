import API from './api.js';
import UI from './ui.js';

const api = new API(), 
      ui = new UI();

const gamePage = document.querySelector('.gamePage');
const title = document.querySelector('.page-ish');



if(ui.allGames){

      api.getGames()
      .then(data => ui.showGames(data));

      ui.allGames.addEventListener('click', e => {

            
           
            if(e.target.classList.contains('card') || e.target.classList.contains('card-title') || e.target.classList.contains('card-body') || e.target.classList.contains('card-img-top')){
                  let mainCard;
                  if(e.target.classList.contains('card')){
                        mainCard = e.target.parentElement;
                  }else if(e.target.classList.contains('card-title')){
                        mainCard = e.target.parentElement.parentElement.parentElement;

                  }else if(e.target.classList.contains('card-body')){
                        mainCard = e.target.parentElement.parentElement;

                  }else if(e.target.classList.contains('card-img-top')){
                        mainCard = e.target.parentElement.parentElement;

                  }

                  if(mainCard.classList.contains('browse')){
                        return;
                  }
                  let id = mainCard.dataset.id;


                  
                  sessionStorage.setItem('currGame', id);
                  window.open('./assets/game.html', '_self')
                  
            }
      })


      document.querySelector('.prompt').addEventListener('keyup', e =>{
            e.preventDefault();
            if(e.key === "Enter"){
                  if(e.target.value !== ""){
                        api.compoundSearch(e.target.value).then(data => ui.showGames(data))
                        document.querySelector('.page-ish').textContent('Search results for: '+ e.target.value);
                  }
            }
      })
}


if(gamePage){
      const gameHeadingBG = document.querySelector('.game-heading');
      const title = document.querySelector('.game-page-title');
      const img = document.querySelector('.game-page-img');
      const date = document.querySelector('.game-page-released');
      const desc = document.querySelector('.game-page-description');
      const platforms = document.querySelector('.game-page-platforms');
      let gameId = sessionStorage.getItem('currGame');
      api.getGameInfo(gameId).then(data => {
            let platformsList = data.data.platforms.map(platform => platform.platform.name);
            console.log(platformsList)
            gameHeadingBG.style.backgroundImage = `url(${data.data.background_image_additional || data.data.background_image})`
            img.src = `${data.data.background_image}`
            title.textContent = `${data.data.name}`
            date.textContent = `${data.data.released}`
            desc.textContent = `${data.data.description_raw}`
            api.getGameScreenshots(gameId).then(data => ui.generateCarousel(data.data.results));

            platformsList.forEach(platform => {
                  if(platform === "PC"){
                        platforms.innerHTML += `<i class="fab fa-windows pr-1"></i>`;
                    }else if(platform === "PlayStation" || platform === "PlayStation 4"){
                        platforms.innerHTML += `<i class="fab fa-playstation pr-1"></i>`;
                    }else if(platform === "Xbox" || platform === "Xbox One"){
                        platforms.innerHTML += `<i class="fab fa-xbox pr-1"></i>`;
                    }else if(platform === "Apple Macintosh" || platform === "iOS"){
                        platforms.innerHTML += `<i class="fab fa-apple pr-1"></i>`
                    }else if(platform === "Linux"){
                        platforms.innerHTML += `<i class="fab fa-linux"></i>`
                    }else if(platform === "Nintendo"){
                        platforms.innerHTML += `<i class="fa fa-gamepad"></i>`
                    }else if(platform === "Android"){
                        platforms.innerHTML += `<i class="fab fa-android pr-1"></i>`
                    }
            })
      })
}


if(document.querySelector('.sidebar-content')){

      document.querySelector('.sidebar-content').addEventListener('click', e =>{
            if(e.target.classList.contains('platform')){
                  let target = e.target;
                  if(target.tagName === "I" || target.tagName === "SPAN"){
                        target = e.target.parentElement;
                  }
                  let id = target.dataset.id;
                  api.compoundSearch('', '', '', '', id ).then(data => ui.showGames(data));
                  let platform = new Map();
                  platform.set('4', 'PC');
                  platform.set('187', 'Playstation 5');
                  platform.set('1', 'Xbox One');
                  platform.set('7', 'Nintendo Switch');
                  platform.set('3', 'IOS');
                  platform.set('21', 'Android');


                  title.textContent = 'Games for - '+ platform.get(id);
                  let description = document.querySelector('.description');
                  api.getPlatformInfo(id).then(data => description.innerHTML = data.data.description.slice(3, -4));
                  ui.allGames.innerHTML = `<div class="spinner-border text-secondary mx-auto mt-6" style="width: 10rem; height: 10rem;" role="status"><span class="visually-hidden"></span></div>`;
            }


            if(e.target.classList.contains('genre')){
                  let target = e.target;
                  if(target.tagName === "I" || target.tagName === "SPAN"){
                        target = e.target.parentElement;
                  }else if(target.tagName === "IMG"){
                        
                        target = e.target.parentElement.parentElement;
                  }

                  let id = target.dataset.id;
                  api.compoundSearch('', id, '', '', '' ).then(data => ui.showGames(data));
                  let genre = new Map();
                  genre.set('4', 'Action');
                  genre.set('10', 'Strategy');
                  genre.set('5', 'RPG');
                  genre.set('2', 'Shooter');
                  genre.set('3', 'Adventure');
                  genre.set('7', 'Puzzle');
                  genre.set('1', 'Racing');
                  genre.set('15', 'Sports');

                  title.textContent = 'Games for - '+ genre.get(id);
                  let description = document.querySelector('.description');
                  api.getGenreInfo(id).then(data => description.innerHTML = data.data.description.slice(3, -4));
                  ui.allGames.innerHTML = `<div class="spinner-border text-secondary mx-auto mt-6" style="width: 10rem; height: 10rem;" role="status"><span class="visually-hidden"></span></div>`;


            }

            if(e.target.classList.contains('browse')){
                  let classes = [... e.target.classList];

                  // ui.allGames.innerHTML = `<div class="spinner-border text-secondary mx-auto mt-6" style="width: 10rem; height: 10rem;" role="status"><span class="visually-hidden"></span></div>`;
                  title.textContent = classes[classes.length-1];
                  title.style.textTransform = 'capitalize';
                  ui.allGames.innerHTML = `<div class="spinner-border text-secondary mx-auto mt-6" style="width: 10rem; height: 10rem;" role="status"><span class="visually-hidden"></span></div>`;


                  switch(classes[classes.length-1]){
                        case 'platforms':                        
                              api.getPlatforms().then(data => ui.showBrowsed(data.data.results));
                              break;

                        case 'genres':
                              api.getGenres().then(data => ui.showBrowsed(data.data.results));
                              break;
                              
                        case 'developers':
                              api.getDevelopers().then(data => ui.showBrowsed(data.data.results));
                              break;

                        case 'stores':
                              api.getStores().then(data => ui.showBrowsed(data.data.results));
                              break;      

                        case 'publishers':
                              api.getPublishers().then(data => ui.showBrowsed(data.data.results));
                              break;
                              
                        case 'tags':
                              api.getTags().then(data => ui.showBrowsed(data.data.results));
                              break;
                              
                        }


            }





      });   
}


// api.getPlatformInfo('4').then(data=>console.log(data))


