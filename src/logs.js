var Log = cc.Sprite.extend({
    ctor: function() {
        this._super(res.log_png);

        this.x = -40;
        this.y = Math.floor((Math.random() * cc.winSize.height) + 1);   // randomly spawn on-screen

        this.runAction(new cc.MoveTo(30, cc.p(cc.winSize.width + 40, this.y)));

        this.scheduleUpdate();
    },

    update: function(dt) {
        ; // do nothing for now
    }
});