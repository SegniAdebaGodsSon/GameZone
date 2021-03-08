import API from './api.js';
import UI from './ui.js';

const api = new API(), 
      ui = new UI();

const gamePage = document.querySelector('.gamePage');
const title = document.querySelector('.page-ish');
const content = document.querySelector('.all-games');
const bigSpinner = '<div class="spinner-border text-secondary mx-auto mt-6" style="width: 10rem; height: 10rem;" role="status">';
const smallSpinner = '<div class="spinner-border btm-spinner text-secondary mx-auto" style="width: 5rem; height: 5rem; margin-top: 10em;" role="status"></div>';

if(document.querySelector('.btm-spinner') && sessionStorage.getItem('nextPage') === 'none'){
      document.querySelector('.btm-spinner').remove();
}

if(ui.allGames){

      api.getGames()
      .then(data => {
            if(data.data.next) sessionStorage.setItem('nextPage', data.data.next);
            else sessionStorage.setItem('nextPage', 'none');
            ui.allGames.innerHTML = '';
            ui.showGames(data);
            ui.allGames.innerHTML += smallSpinner;
      });

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
                        ui.allGames.innerHTML = bigSpinner;
                        api.compoundSearch(e.target.value, '', '', '', '').then(data => {
                              ui.allGames.innerHTML = '';
                              ui.showGames(data);
                              if(data.data.next) sessionStorage.setItem('nextPage', data.data.next);
                              else sessionStorage.setItem('nextPage', 'none');

                        })
                        document.querySelector('.page-ish').textContent = 'Search results for: '+ e.target.value;

                  }
            }
      })



      window.addEventListener('scroll', e => {
            const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

            if(scrollTop + clientHeight >= scrollHeight){
                  let next = sessionStorage.getItem('nextPage');
                  let bottomSpinner = document.querySelector('.btm-spinner');

                  if(next !== 'none'){
                        api.customFetch(next)
                              .then(data => {
                                    if(data.data.next) sessionStorage.setItem('nextPage', data.data.next);
                                    else sessionStorage.setItem('nextPage', 'none');
                                    if(bottomSpinner) bottomSpinner.remove();
                                    if(["platforms", "genres", "stores", "publishers", "tags", "developers"].includes(title.textContent.trim())){
                                          ui.showBrowsed(data.data.results);
                                    }else{
                                          ui.showGames(data);
                                    }

                                   if(data.data.next){
                                          ui.allGames.innerHTML += '<div class="spinner-border btm-spinner text-secondary mx-auto" style="width: 5rem; height: 5rem; margin-top: 10em;" role="status"></div>';
                                    }
      
                              });
                  }else{
                        if(bottomSpinner) bottomSpinner.remove();
                  }
            }
      
      });
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
            ui.allGames.innerHTML = '';
            if(e.target.classList.contains('platform')){
                  let target = e.target;
                  if(target.tagName === "I" || target.tagName === "SPAN"){
                        target = e.target.parentElement;
                  }
                  let id = target.dataset.id;
                  api.compoundSearch('', '', '', '', id ).then(data => {
                        ui.allGames.innerHTML = '';
                        ui.showGames(data);
                        ui.allGames.innerHTML += smallSpinner;
                        if(data.data.next) sessionStorage.setItem('nextPage', data.data.next);
                        else sessionStorage.setItem('nextPage', 'none');
                  });
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
                  ui.allGames.innerHTML = '';
                  let target = e.target;
                  if(target.tagName === "I" || target.tagName === "SPAN"){
                        target = e.target.parentElement;
                  }else if(target.tagName === "IMG"){
                        
                        target = e.target.parentElement.parentElement;
                  }

                  let id = target.dataset.id;
                  api.compoundSearch('', id, '', '', '' ).then(data => {
                        ui.allGames.innerHTML = '';
                        ui.showGames(data);
                        ui.allGames.innerHTML += smallSpinner;
                        if(data.data.next) sessionStorage.setItem('nextPage', data.data.next);
                        else sessionStorage.setItem('nextPage', 'none');
                  });
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
                  ui.allGames.innerHTML = '';

                  let classes = [... e.target.classList];

                  // ui.allGames.innerHTML = `<div class="spinner-border text-secondary mx-auto mt-6" style="width: 10rem; height: 10rem;" role="status"><span class="visually-hidden"></span></div>`;
                  title.textContent = classes[classes.length-1];
                  title.style.textTransform = 'capitalize';
                  ui.allGames.innerHTML = `<div class="spinner-border text-secondary mx-auto mt-6" style="width: 10rem; height: 10rem;" role="status"><span class="visually-hidden"></span></div>`;


                  let apiCall = null;
                  switch(classes[classes.length-1]){
                        case 'platforms':                        
                              apiCall = api.getPlatforms()
                              break;

                        case 'genres':
                              apiCall = api.getGenres()
                              break;
                              
                        case 'developers':
                              apiCall = api.getDevelopers()
                              break;

                        case 'stores':
                              apiCall = api.getStores()
                              break;      

                        case 'publishers':
                              apiCall = api.getPublishers()
                              break;
                              
                        case 'tags':
                              apiCall = api.getTags()
                              break;
                        
      
                        }    

                  if(apiCall) apiCall.then(data => {
                        ui.allGames.innerHTML = '';
                        ui.showBrowsed(data.data.results);
                        ui.allGames.innerHTML += smallSpinner;
                        if(data.data.next) sessionStorage.setItem('nextPage', data.data.next);
                        else sessionStorage.setItem('nextPage', 'none');
                  });


            }





      });   
}


// api.getPlatformInfo('4').then(data=>console.log(data))


