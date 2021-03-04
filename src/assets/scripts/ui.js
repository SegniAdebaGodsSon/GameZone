export default class UI{
    constructor(){
        this.allGames = document.querySelector('.all-games');
    }

    showGames(games){
        this.allGames.innerHTML = ''

        games.data.results.forEach(game => {
            let html = `
            
            <div class="col-sm-10 col-md-4 col-lg-3 pt-5" data-id=${game.id}>
                <div class="card">
                    <img src="${game.background_image}" class="card-img-top" alt="..." >
                    <div class="card-body">
                       
                      <h5 class="card-title">${game.name}</h5>
                    </div>
                  </div>
                </div>
            </div>
            
            `

            this.allGames.innerHTML += html;
        })
    }
}