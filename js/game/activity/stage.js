class Stage extends Activity {
    actors = [new Character({}, WATAME, 'idle', false, new Vector2(344, 36))];

    rawTiles = [
        'xx   xxxxx                  xx',
        'x     xxx                    x',
        'x     xxx                    x',
        'x     xxx                    x',
        'x                            x',
        'x   xxxxxxx   xx   xxxxxxx   x',
        'x        xx   xx     xxx     x',
        'x        xx          xxx     x',
        'x        xx          xxx     x',
        'x        xx                  x',
        'xxxxxx   xx        xxxxxxxxxxx',
        'x        xx        xx        x',
        '                              ',
        'x                            x',
        '                              ',
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    ];

    tiles = [];

    constructor(keys) {
        super();
        this.player = new Character(keys, FLARE, 'idle', true, new Vector2(64, 196));

        this.rawTiles.forEach((row, y) => [...row].forEach((tile, x) => {
            if (tile !== ' ') this.tiles.push({ pos: new Vector2(x * 16, y * 16), size: new Vector2(16, 16) });
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

        cx.restore();
    }
}