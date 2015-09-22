var BeaverLayer = cc.Layer.extend({
    sprite:null,

    ctor:function (player, level, logs) {
        // Call super classes ctor function
        this._super();

        // Container for logs
        this.logs = logs;

        // Container for beaver
        this.beavers = [];

        //handle to player
        this.target = player;

        this.lastBeaver = 0;

        this.currentLevel = level;
        this.setLocalZOrder(25000);

        this.scheduleUpdate();

        return true;

    },

    init:function() {
        // Call super class's super function
        this._super();


    },

    update: function(dt) {
        var checktime;
        var chance;

        // Set up the updates for each level
        if (this.currentLevel == 1){
            // do nothing

            // beavers
            // Checktime in seconds, may spawn beaver
            checktime = 5;

            this.lastBeaver += dt;

            if (this.lastBeaver >= checktime) {
                chance = Math.random();
                if (true) {
                    this.addBeaver();
                    this.lastBeaver = 0;
                }
            }
        }
        else if (this.currentLevel == 2){
            // beavers
            // Checktime in seconds, may spawn beaver
            checktime = 25;

            this.lastBeaver += dt;

            if (this.lastBeaver >= checktime) {
                chance = Math.random();

                if (chance>.25) {
                    this.addBeaver();
                    this.lastBeaver = 0;
                }
            }

        }
        else if (this.currentLevel == 3) {
            // Checktime in seconds, may spawn beaver
            checktime = 15;

            this.lastBeaver += dt;

            if (this.lastBeaver >= checktime) {
                chance = Math.random();

                if (chance>.15) {
                    this.addBeaver();
                    this.lastBeaver = 0;
                }
            }
        }

        for (i=0; i<this.beavers.length; i++) {
            if (this.beavers[i].attack == false) {
                this.beavers[i].x += (this.beavers[i].velocity*dt);
                // Check to see if beavers are ready to pounce
                if (this.beavers[i].x <= this.target.x + 64) {
                    //pounce
                    this.beavers[i].attack = true;
                    this.beavers[i].attackMode(this.target.y);
                }
            }
            else {
                this.beavers[i].y += (this.beavers[i].velocity*dt);
                //check if at target y
                // if the difference is less than the distance traveled next frame
                if (this.target.y - this.beavers[i].y < (this.beavers[i].velocity*dt)) {
                    //DIVE!!!!
                    this.beavers[i].y = this.target.y;
                    this.checkHit(this.beavers[i], i, this.logs);
                }
            }
        }
    },

    addBeaver:function() {
        // create a beaver at the spawn location
        var beaver = new Beaver(res.beaver_walk_1_png);

        beaver.x = beaver.spawn_x;
        beaver.y = beaver.spawn_y;

        this.addChild(beaver);
        this.beavers.push(beaver)
    },

    checkHit:function(beaver, beaver_index, logs) {
        for (i=0; i<logs.length; i++) {
            var targetTop = this.logs[i].y + (this.logs[i].height / 2);
            var targetBottom = this.logs[i].y - (this.logs[i].height / 2);
            var targetRight = this.logs[i].x + (this.logs[i].width / 2);
            var targetLeft = this.logs[i].x - (this.logs[i].width / 2);

            var beaverTop = beaver.y + (beaver.height / 2);
            var beaverBottom = beaver.y - (beaver.height / 2);
            var beaverRight = beaver.x + (beaver.width / 2);
            var beaverLeft = beaver.x - (beaver.width / 2);

            var not_hit = false;
            not_hit = not_hit || targetTop < beaverBottom;
            not_hit = not_hit || targetBottom > beaverTop;
            not_hit = not_hit || targetRight < beaverLeft;
            not_hit = not_hit || targetLeft > beaverRight;

            if (!not_hit) {
                cc.log("bodied");
                var logLayer = this.parent.logLayer;

                if (logLayer.getChildByName("player").ParentLog == this.logs[i]) {
                    //cc.director.getRunningScene().killPlayer("Bodied", true, true, true);

                    logLayer.removeChild(logLayer.logs[i]);
                    this.logs(i, 1);
                }
            }
            else {
            }
        }
        this.removeChild(this.beavers[beaver_index], true);

        this.beavers.splice(beaver_index, 1);
    }

});

var Beaver = cc.Sprite.extend({
    ctor: function(sprite) {

        this._super(sprite);


        //Beaver spawns slightly offscreen
        this.spawn_x = cc.winSize.width + 32;
        this.spawn_y = 32;

        this.attack = false;
        this.target_y = cc.winSize.height;

        // Set velocity
        this.velocity = -100;

        this.scheduleUpdate();
    },

    update:function(dt) {
        //cc.log("(" + this.x + ", " + this.y + ")");
    },

    attackMode:function(target_y) {
        // Move beaver vertically
        var attackVelocity = 180;
        this.velocity = attackVelocity;

        this.target_y = target_y;

    }

});