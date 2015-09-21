var BeaverLayer = cc.Layer.extend({
    sprite:null,

    ctor:function () {
        // Call super classes ctor function
        this._super();

        // Container for beaver
        this.beavers = [];

        this.setLocalZOrder(15);

        this.scheduleUpdate();

        return true;

    },

    init:function() {
        // Call super class's super function
        this._super();


    },

    update: function(dt) {

    }
});

var Beaver = cc.Sprite.extend({
    ctor: function(sprite) {

        this._super(sprite);

        //Beaver spawns slightly offscreen TODO find out if this breaks
        this.spawn_x = cc.winSize.width + Beaver.width/2;
        this.spawn_y = Beaver.height/2;

        // Set velocity to half screen distance every second
        this.velocity = (cc.winSize.width/2) * -1;

        this.scheduleUpdate();
    },

    update:function(dt) {

    }

});