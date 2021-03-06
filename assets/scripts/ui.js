export default class UI{
    constructor(){
        this.allGames = document.querySelector('.all-games');
    }

    showGames(games){
        this.allGames.innerHTML = ''
        

        games.data.results.forEach(game => {
            
            let platforms = document.createElement('span');
            platforms.classList.add('platform-supported');
            let genres = document.createElement('span');
            genres.classList.add('game-genres');
            // console.log(game.genres);
            let score = ``;
            if(game.metacritic === null){
                score = ''; 
            }else if(game.metacritic > 85){
                score = `<span class="badge rounded-pill bg-success">${game.metacritic}</span>`
            }else if(game.metacritic >60){
                score = `<span class="badge rounded-pill bg-warning text-dark">${game.metacritic}</span>`;
            }else{
                score =  `<span class="badge rounded-pill bg-danger">${game.metacritic}</span>`;
            }
            


            game.parent_platforms.forEach(element => {
                
                let platformName = element.platform.name;
                if(platformName === "PC"){
                    platforms.innerHTML += `<i class="fab fa-windows pr-1"></i>`;
                }else if(platformName === "PlayStation"){
                    platforms.innerHTML += `<i class="fab fa-playstation pr-1"></i>`;
                }else if(platformName === "Xbox"){
                    platforms.innerHTML += `<i class="fab fa-xbox pr-1"></i>`;
                }else if(platformName === "Apple Macintosh" || platformName === "iOS"){
                    platforms.innerHTML += `<i class="fab fa-apple pr-1"></i>`
                }else if(platformName === "Linux"){
                    platforms.innerHTML += `<i class="fab fa-linux"></i>`
                }else if(platformName === "Nintendo"){
                    platforms.innerHTML += `<i class="fa fa-gamepad"></i>`
                }else if(platformName === "Android"){
                    platforms.innerHTML += `<i class="fab fa-android pr-1"></i>`
                }
            });

           


            let html = `
            
            <div class="col-sm-10 col-md-4 col-lg-3 pt-5" data-id=${game.id}>
                <div class="card">
                    <img src="${game.background_image}" class="card-img-top" alt="..." >
                    <div class="card-body">
                        ${platforms.outerHTML}
                      <div class="row my-2">
                      <h2 class="card-title col-10">${game.name}</h2>
                      <div class="col-2">
                        ${score}
                      </div> 
                      </div>   
                    </div>
                  </div>
                </div>
            </div>
            
            `

            this.allGames.innerHTML += html;
        })
    }

    showBrowsed(browsed){
        this.allGames.innerHTML = '';
        
        
        browsed.forEach(data => {
            let games = data.games.map(game => game.name);
            games = games.join('   -   ');

            let html = `<div class="col-sm-10 col-md-4 col-lg-3 pt-5 browse" >
                        <div class="card" style="background-image: url(${data.image_background}); background-position: center center; background-size: cover; background-blend-mode: multiply; background-color: rgb(0, 0, 0, 0.7) !important">
                            <div class="card-body">
                              <h5 class="card-title text-center h2 border-bottom pb-2">${data.name}</h5>
                              <hr class="my-3">
                                <div class="d-flex justify-align-between">
                                    <p class="lead">Games Count</p>
                                    <p class="ml-auto card-text lead">${data.games_count}</p>
                                </div>

                                <div class="d-flex justify-align-between text-secondary">
                                    <p class="card-text">${games} ...</p>
                                </div>     
                                
                            </div>
                          </div>
                    </div> `

                this.allGames.innerHTML += html;
        })

    }
}