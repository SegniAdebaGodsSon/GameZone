import API from './api.js';
import UI from './ui.js';

const api = new API(), 
      ui = new UI();

const gamePage = document.querySelector('.gamePage');


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

                  let id = mainCard.dataset.id;
                  
                  sessionStorage.setItem('currGame', id);
                  window.open('./assets/game.html', '_blank')
                  
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
      let gameId = sessionStorage.getItem('currGame');
      api.getGameInfo(gameId).then(data => {
            gameHeadingBG.style.backgroundImage = `url(${data.data.background_image})`
            img.src = `${data.data.background_image}`
            title.textContent = `${data.data.name}`
            date.textContent = `${data.data.released}`
            desc.textContent = `${data.data.description_raw}`
      })
}


if(document.querySelector('.sidebar-content')){
      document.querySelector('.sidebar-content').addEventListener('click', e =>{
            if(e.target.classList.contains('platform')){
                  let target = e.target;
                  if(e.target.tagName === "I" || e.target.tagName === "SPAN"){
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


                  document.querySelector('.page-ish').textContent = 'Games for: '+ platform.get(id);
                  ui.allGames.innerHTML = `<div class="spinner-border text-secondary mx-auto mt-6" style="width: 10rem; height: 10rem;" role="status"><span class="visually-hidden"></span></div>`;
            }


            if(e.target.classList.contains('genre')){
                  let target = e.target;
                  if(e.target.tagName === "I" || e.target.tagName === "SPAN"){
                        target = e.target.parentElement;
                  }

                  let id = target.dataset.id;
            }

      });   
}


api.getGenres().then(data => console.log(data))


