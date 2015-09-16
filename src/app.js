var LogLayer = cc.Layer.extend({
    sprite:null,

    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        this.logs = [];

        this.scheduleUpdate();

        return true;
    },

    update: function(dt) {
        if (Math.random() > 0.99) {
            this.logs.push(new Log());
            this.addChild(this.logs[this.logs.length-1]);
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

