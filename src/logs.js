var Log = cc.Sprite.extend({
    ctor: function(sprite) {
        this._super(sprite);

        this.x = -this.width;
        this.y = Math.floor((Math.random() * (cc.winSize.height - this.height * 2)) + this.height);   // randomly spawn on-screen

        // X and Y velocity, in log-units per second
        this.velX = 1.6;
        this.velY = 0;

        // the points of contact for the player
        this.contactPoints = [];
        this.contactPoints.push(cc.p(-0.25 * this.width, 0));
        this.contactPoints.push(cc.p(0.25 * this.width, 0));

        this.scheduleUpdate();
    },

    update: function(dt) {

        // calculate where we're headed
        this.x += this.velX * this.height * dt;
        this.y += this.velY * this.height * dt;
    }
});

var LongLog = Log.extend({
    ctor: function(sprite) {
        this._super(sprite);

        this.contactPoints = [];
        this.contactPoints.push(cc.p(-0.33 * this.width, 0));
        this.contactPoints.push(cc.p(0, 0));
        this.contactPoints.push(cc.p(0.33 * this.width, 0));
    }
});