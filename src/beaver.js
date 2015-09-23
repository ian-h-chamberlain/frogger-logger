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
        this.setLocalZOrder(15);

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

        var hit_found = false;

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
                // cc.log("bodied");
                // play sound
                cc.audioEngine.playEffect(res.beaver_wav, false);

                var logLayer = this.parent.logLayer;

                if (logLayer.getChildByName("player").ParentLog == this.logs[i]) {
                    cc.director.getRunningScene().killPlayer("Bodied", true, true, true);

                    logLayer.removeChild(logLayer.logs[i]);
                    this.logs.splice(i, 1);
                }
                hit_found = true;
                break;
            }
        }

        if (hit_found == false) {
            var splash = new Splash(this.beavers[beaver_index].x, this.beavers[beaver_index].y);
            this.addChild(splash);
        }

        this.removeChild(this.beavers[beaver_index], true);

        this.beavers.splice(beaver_index, 1);
    }

});

var Beaver = cc.Sprite.extend({
    ctor: function(sprite) {

        this.curFrame = 0;
        this.sinceLastFrame = 0;

        this._super(sprite);
        cc.spriteFrameCache.addSpriteFrame(
            new cc.SpriteFrame(res.beaver_walk_1_png, cc.rect(0,0, 64, 64)), "beaver0");
        cc.spriteFrameCache.addSpriteFrame(
            new cc.SpriteFrame(res.beaver_walk_2_png, cc.rect(0,0, 64, 64)), "beaver1");
        cc.spriteFrameCache.addSpriteFrame(
            new cc.SpriteFrame(res.beaver_walk_3_png, cc.rect(0,0, 64, 64)), "beaver2");
        cc.spriteFrameCache.addSpriteFrame(
            new cc.SpriteFrame(res.beaver_walk_4_png, cc.rect(0,0, 64, 64)), "beaver3");
        cc.spriteFrameCache.addSpriteFrame(
            new cc.SpriteFrame(res.beaver_jump_png, cc.rect(0,0,64,64)), "beaver4");

        this.inWater = false;


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
        if (this.attack == false && this.inWater == false) {
            if (this.sinceLastFrame > .25) {
                this.curFrame++;
                if (this.curFrame > 3) {
                    this.curFrame = 0;
                }
                this.sinceLastFrame = 0;
            }
            else {
                this.sinceLastFrame += dt;
            }
        }
        else if (this.attack == true) {
            this.curFrame = 4;
            this.sinceLastFrame = 0;
        }
        else if (this.inWater == true) {
            if (this.sinceLastFrame > .1) {
                this.curFrame++;
                if (this.curFrame > 9) {
                    this.killBeaver();
                }
                this.sinceLastFrame += dt;
            }
        }

        this.setSpriteFrame("beaver" + this.curFrame);
    },

    attackMode:function(target_y) {
        // Move beaver vertically
        this.velocity = 180;

        this.target_y = target_y;

        this.attack = true;

        this.curFrame = 4;
        this.setSpriteFrame("beaver4");

    },

    killBeaver:function() {
        // destroy the beaver

        for (i = 0; i<this.parent.beavers.length; i++) {
            if (this.parent.beavers[i] == this) {
                this.parent.removeChild(this.beavers[i], true);

                this.parent.beavers.splice(i, 1);
            }
        }
    }

});

var Splash = cc.Sprite.extend({
   ctor:function(x, y) {

       this._super(res.lumberjackSplash1_png);

       cc.spriteFrameCache.addSpriteFrame(
           new cc.SpriteFrame(res.lumberjackSplash1_png, cc.rect(0,0,64,64)), "splash0");
       cc.spriteFrameCache.addSpriteFrame(
           new cc.SpriteFrame(res.lumberjackSplash2_png, cc.rect(0,0,64,64)), "splash1");
       cc.spriteFrameCache.addSpriteFrame(
           new cc.SpriteFrame(res.lumberjackSplash3_png, cc.rect(0,0,64,64)), "splash2");
       cc.spriteFrameCache.addSpriteFrame(
           new cc.SpriteFrame(res.lumberjackSplash4_png, cc.rect(0,0,64,64)), "splash3");
       cc.spriteFrameCache.addSpriteFrame(
           new cc.SpriteFrame(res.lumberjackSplash5_png, cc.rect(0,0,64,64)), "splash4");

       this.setSpriteFrame("splash0");

       this.curFrame = 0;
       this.sinceLastFrame = 0;
       //this.setPosition(x, y);
       this.x = x;
       this.y = y;

       this.Splashtime = 0;

       cc.audioEngine.playEffect(res.splash_wav, false);

       this.scheduleUpdate();

   },

   update:function(dt) {
       this.Splashtime += dt;
       this.curFrame = Math.floor (this.Splashtime *16) + 1;

       if (this.curFrame > 4) {
           this.parent.removeChild(this);
           return;
       }

       //this.sinceLastFrame += dt;

       this.setSpriteFrame("splash"+ this.curFrame);
   }
});