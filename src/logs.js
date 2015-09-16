var Log = cc.Sprite.extend({
    ctor: function() {
        this._super(res.log_png);

        this.x = -this.width;
        this.y = Math.floor((Math.random() * cc.winSize.height) + 1);   // randomly spawn on-screen

        // X and Y velocity, in log-units per second
        this.velX = 1.6;
        this.velY = 0;

        this.scheduleUpdate();
    },

    update: function(dt) {
        // calculate where we're headed
        this.x += this.velX * this.width * dt;
        this.y += this.velY * this.width * dt;
    }
});