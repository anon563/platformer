class Bullet extends Actor {

    speed = 4;
    size = new Vector2(4, 4);

    constructor(pos, n) {
        super();

        this.pos = pos;
        this.vel = n.times(this.speed);
    }
    
    update = (game, activity) => {
        const wallTile = activity.tiles.find(tile => CollisionBox2.collidesWith(tile, this));

        this.isDone = wallTile;
        this.action = this.isDone ? 'done' : 'idle';
        if (this.isDone) this.vel = new Vector2(0, 0);
        this.pos = this.pos.plus(this.vel);

        this.frameCount++;
    }
    
    display = (cx, assets) => {
        cx.fillStyle = '#ff0';
        cx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
        if (this.frameCount < 2) {
            cx.fillStyle = '#fff';
            cx.fillRect(this.pos.x - 2, this.pos.y - 2, this.size.x *2, this.size.y * 2);
        }
    }
}