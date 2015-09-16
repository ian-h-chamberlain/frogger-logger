var LogLayer = cc.Layer.extend({
    sprite:null,

    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        // an array to hold the logs
        this.logs = [];

        // schedule the update function to run
        this.scheduleUpdate();

        return true;
    },

    update: function(dt) {
        // spawn logs randomly
        // TODO: check for other logs in spawn location and determine when to spawn logs
        if (Math.random() > 0.9) {
            this.addLog();
        }

        // check logs for being off-screen and delete them if so
        for (var i=0; i<this.logs.length; i++) {
            if ((this.logs[i].x - this.logs[i].width/2) > cc.winSize.width) {
                delete this.logs[i];
                this.logs.splice(i, 1);
            }
        }
    },

    // addLog - adds a log randomly with bounds checking
    addLog: function() {
        var newLog;
        if (Math.random() > 0.5)
            newLog = new Log(res.log_png);
        else
            newLog = new LongLog(res.longLog_png);

        for (var i=0; i<this.logs.length; i++) {
            // ensure that the new log will not overlap an existing log
            if (newLog.y >= this.logs[i].y - 1.5*this.logs[i].height
                && newLog.y <= this.logs[i].y + 1.5*this.logs[i].height
                && this.logs[i].x <= cc.winSize.width / 3) {
                return;
            }
        }

        // actually add the log
        this.logs.push(newLog);
        this.addChild(this.logs[this.logs.length - 1]);
    }
});

var Log = cc.Sprite.extend({
    ctor: function(sprite) {
        this._super(sprite);

        this.x = -this.width;
        this.y = Math.floor((Math.random() * (cc.winSize.height - 256 - 2*this.height)) + this.height + 128);   // randomly spawn on-screen

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

        // calculate where we're headed and update accordingly using the dt
        this.x += this.velX * this.height * dt;
        this.y += this.velY * this.height * dt;
    }
});

var LongLog = Log.extend({
    ctor: function(sprite) {
        this._super(sprite);

        // different contact points than in Log
        this.contactPoints = [];
        this.contactPoints.push(cc.p(-0.33 * this.width, 0));
        this.contactPoints.push(cc.p(0, 0));
        this.contactPoints.push(cc.p(0.33 * this.width, 0));
    }
});