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
        if (Math.random() > 0.99) {
            this.logs.push(new Log());
            this.addChild(this.logs[this.logs.length-1]);
        }

        // check logs for being off-screen and delete them if so
        for (var i=0; i<this.logs.length; i++) {
            if ((this.logs[i].x - this.logs[i].width/2) > cc.winSize.width) {
                delete this.logs[i];
                this.logs.splice(i, 1);
            }
        }
    }
});

var LogScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new LogLayer();
        this.addChild(layer);
    }
});

