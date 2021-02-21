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

    }