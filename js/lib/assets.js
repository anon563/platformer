class Assets {
    images = new Object;
    imageDataList = [
        { id: 'opening', src: 'img/opening.png' },

        { id: 'noel_mugshot', src: 'img/noel_mugshot.png' },
        { id: 'flare_mugshot', src: 'img/flare_mugshot.png' },
        { id: 'watame_mugshot', src: 'img/watame_mugshot.png' },
        { id: 'rushia_mugshot', src: 'img/rushia_mugshot.png' },
        { id: 'ok', src: 'img/ok.png' },

        { id: 'noel_idle', src: 'img/noel_idle.png' },
        { id: 'watame_idle', src: 'img/watame_idle.png' },
        { id: 'watame_focus', src: 'img/watame_focus.png' },
        { id: 'flash', src: 'img/flash.png' },
        
        { id: 'flare_idle', src: 'img/flare_idle_gun.png' },
        { id: 'flare_idle_down', src: 'img/flare_idle_gun_down.png' },
        { id: 'flare_idle_up', src: 'img/flare_idle_gun_up.png' },
        { id: 'flare_idle_look', src: 'img/flare_idle_gun_look.png' },

        { id: 'flare_walk', src: 'img/flare_walk_gun.png' },
        { id: 'flare_walk_down', src: 'img/flare_walk_gun_down.png' },
        { id: 'flare_walk_up', src: 'img/flare_walk_gun_up.png' },

        { id: 'flare_jump', src: 'img/flare_jump_gun.png' },
        { id: 'flare_jump_down', src: 'img/flare_jump_gun_down.png' },
        { id: 'flare_jump_up', src: 'img/flare_jump_gun_up.png' },

        { id: 'flare_wall', src: 'img/flare_wall_gun.png' },
        { id: 'flare_wall_down', src: 'img/flare_wall_gun_down.png' },
        { id: 'flare_wall_up', src: 'img/flare_wall_gun_up.png' },

        { id: 'road', src: 'img/road.png' },
        { id: 'kintsuba', src: 'img/kintsuba.png' },
        { id: 'bullet', src: 'img/bullet.png' },
        { id: 'shadow', src: 'img/shadow.png' },
        { id: 'naan', src: 'img/naan.png' },
        { id: 'bg', src: 'img/bg.png' },
        { id: 'flower', src: 'img/flower.png' },
        { id: 'petal', src: 'img/petal.png' }
    ];
    
    constructor() {
        this.imageDataList.forEach(imageData => {
            this.images[imageData.id] = new Image;
            this.images[imageData.id].src = imageData.src;
        });
    }

    load = () => Promise.all(Object.keys(this.images).map(key => new Promise(resolve => this.images[key].onload = () => resolve())));
}