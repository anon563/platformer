class Stage extends Activity {
    actors = [new Character({}, WATAME, 'idle', false, new Vector2(344, 36))];

    rawTiles = [
        'xx   xxxxx            o     xx',
        'xo    xxx                    x',
        'x     xxxo                   x',
        'x     xxx                    x',
        'x                            x',
        'x   xxxxxxx   xx   xxxxxxx   x',
        'x        xx   xx     xxxo    x',
        'x        xx          xxx     x',
        'x        xx          xxx     x',
        'x        xx                  x',
        'xxxxxx   xx        xxxxxxxxxxx',
        'xo       xx        xxo       x',
        '                              ',
        'x                            x',
        '                              ',
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    ];

    tiles = [];
    dustParticles = [];
    targets = [
    ];

    timer = 0;

    constructor(keys) {
        super();
        this.player = new Character(keys, FLARE, 'idle', true, new Vector2(64, 196));

        this.rawTiles.forEach((row, y) => [...row].forEach((tile, x) => {
            if (tile === 'x') this.tiles.push({ pos: new Vector2(x * 16, y * 16), size: new Vector2(16, 16) });
        }));
        this.rawTiles.forEach((row, y) => [...row].forEach((tile, x) => {
            if (tile === 'o') this.targets.push({ pos: new Vector2(x * 16, y * 16), size: new Vector2(16, 16) });
        }));
    }

    update = game => {
        const cx = game.cx;
        cx.save();

        this.actors = this.actors.filter(actor => CollisionBox2.includedIn(actor, { pos: new Vector2(0, 0), size: new Vector2(30 * 16, 16 * 16) }));
        const actors = [this.player, ...this.actors];
        // Actors logic
        actors.forEach(actor => actor.update(game, this));

        
        cx.fillStyle = '#000';
        cx.fillRect(0, 0, game.width, 14);

        // Viewport
        cx.translate(0, 14);

        // Background
        cx.fillStyle = '#554';
        cx.fillRect(0, 0, game.width, 256);
        
        // Actors display
        actors.forEach(actor => {
            cx.save();
            actor.display(cx, game.assets);
            if (DEBUGMODE) actor.displayCollisionBox(game);
            cx.restore();
        });

        // Dust
        cx.fillStyle = '#fff';
        this.dustParticles = this.dustParticles.filter(particle => particle.life);
        this.dustParticles.forEach(particle => {
            particle.update();
            particle.display(cx);
        });

        // Tiles
        cx.fillStyle = '#8aa';
        this.tiles.forEach(tile => {
            cx.fillRect(tile.pos.x, tile.pos.y, tile.size.x, tile.size.y);
        })
        
        cx.fillStyle = '#0008';
        this.rawTiles.forEach((row, y) => [...row].forEach((tile, x) => {
            if (tile === ' ' && this.tiles.find(other => x * 16 === other.pos.x && other.pos.y < y*16)) {
                cx.fillRect(x*16, y*16, 16, 16);
            }
        }));

        this.targets.forEach(target => {
            cx.fillStyle = target.ok ? '#0f0' : '#f00';
            cx.fillRect(target.pos.x, target.pos.y, target.size.x, target.size.y);
        });

        if (this.timer > -3600000 && this.targets.filter(target => !target.ok).length) {
            this.timer-=1000;
            cx.fillStyle = '#fff';
        } else {
            cx.fillStyle = '#8f8';
        }
        
        cx.fillText(new Date(this.timer).toTimeString().slice(3, 9), 0, 0);
        cx.restore();
    }
}