export default class API{

    constructor(){
        this.games = `https://api.rawg.io/api/games`;
        this.genres = `https://api.rawg.io/api/genres`;
        this.tags = `https://api.rawg.io/api/tags`;
        this.platforms = `https://rawg.io/api/platforms`;
        this.developers = `https://rawg.io/api/developers`
        this.stores = `https://rawg.io/api/stores`;
        this.publishers = `https://api.rawg.io/api/publishers`;
        this.myHeader = new Headers({
            "Accept"       : "application/json",
            "Content-Type" : "application/json",
            'User-Agent': 'GameZone School Project'
        });

    }

    // -------------- getting list of default end-points i.e all games, genres, tags, platforms,developers, stores, publishers --------------

    async getGames(){
        const response = await fetch(`${this.games}`, this.myHeader);
        const data = await response.json();
        return {data}; 
    }

    async getGenres(){
        const response = await fetch(this.genres, this.myHeader);
        const data = await response.json();
        return {data};
    }

    async getTags(){
        const response = await fetch(this.tags, this.myHeader);
        const data = await response.json();
        return {data};
    }

    async getPlatforms(){
        const response = await fetch(this.platforms, this.myHeader);
        const data = await response.json();
        return {data};
    }

    async getDevelopers(){
        const response = await fetch(this.developers, this.myHeader);
        const data = await response.json();
        return {data};
    }
    
    async getStores(){
        const response = await fetch(this.stores, this.myHeader);
        const data = await response.json();
        return {data};
    }

    async getPublishers(){
        const response = await fetch(this.publishers, this.myHeader);
        const data = await response.json();
        return {data};
    }


    // -------------- get infos on the above ... the default values --------------
    async getGameInfo(id){
        const response = await fetch(`${this.games}/${id}`, this.myHeader);
        const data = await response.json();
        return {data}; 
    }

    async getGenreInfo(id){
        const response = await fetch(`${this.genres}/${id}`, this.myHeader);
        const data = await response.json();
        return {data};
    }

    async getTagInfo(id){
        const response = await fetch(`${this.tags}/${id}`, this.myHeader);
        const data = await response.json();
        return {data};
    }

    async getPlatformInfo(id){
        const response = await fetch(`${this.platforms}/${id}`, this.myHeader);
        const data = await response.json();
        return {data};
    }

    async getDeveloperInfo(id){
        const response = await fetch(`${this.developers}/${id}`, this.myHeader);
        const data = await response.json();
        return {data};
    }

    async getStoreInfo(id){
        const response = await fetch(`${this.stores}/${id}`, this.myHeader);
        const data = await response.json();
        return {data};
    }

    async getPublisherInfo(id){
        const response = await fetch(`${this.publishers}/${id}`, this.myHeader);
        const data = await response.json();
        return {data};
    }



    // -------------- custom searches and specific details --------------

    async getGamesByName(name){
        const response = await fetch(`${this.games}?search="${name}"`, this.myHeader);
        const data = await response.json();
        return {data};
    }

    async getGameScreenshots(id){
        const response = await fetch(`${this.games}/${id}/screenshots`, this.myHeader);
        const data = await response.json();
        return {data};
    }

    async compoundSearch(name="", genre="", order="rating", tag="", platform=""){
        let argumentList = ['search', 'genres', 'ordering', 'tags', 'platforms', 'developers']
        let inputs = Array.from(arguments); 
        let queryLink = `${this.games}?`;
        inputs.forEach((input, ind) => {
            if(input!=="") queryLink+=`${argumentList[ind]}=${input}&`;
        });            

        const response = await fetch(queryLink, this.myHeader);
        const data = await response.json();
        return {data};
    }


    

}

