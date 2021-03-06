var SawLayer = cc.Layer.extend({
    sprite:null,

    ctor:function (logList) {
        // Call super classes ctor function
        this._super();

        //an array to hold current saws
        this.saws = [];

        //an array of the logs
        this.logs = logList;

        //The x at which the saws move long
        //this.sawLine = cc.winSize.width - (Saw.width/2);

        this.sawMAX = cc.winSize.height-155;
        this.sawMIN = 150;

        this.setLocalZOrder(10);

        this.scheduleUpdate();


        return true;

    },

    init:function(numSaws, random) {
        // Call super class's super function
        this._super();

        for (var i=0; i<numSaws; i++) {
            var yHeight = (cc.winSize.height - 256)/(numSaws + 1);
            yHeight *= i + 1;
            yHeight += 128;
            if (!random) {
                this.addSaw(cc.winSize.width - 32, yHeight, 0);
            }
            else {
                var vel;
                if (i % 2 == 0)
                    vel = 100;
                else
                    vel = -100;
                this.addSaw(cc.winSize.width - 32, yHeight, vel);
            }
        }

    },

    update: function(dt) {

        for (var i=0; i<this.saws.length; i++) {
            var new_y = this.saws[i].y + this.saws[i].sawVelocity *dt;

            if (new_y >= this.sawMAX) {
                new_y = this.sawMAX-(new_y-this.sawMAX);
                this.saws[i].sawVelocity *= -1;
            }

            if (new_y <= this.sawMIN) {
                new_y = this.sawMIN+(this.sawMIN-new_y);
                this.saws[i].sawVelocity *= -1;
            }

            this.saws[i].y = new_y;

            if (this.saws[i].sawActive == true) {
                this.checkHits(this.saws[i]);
            }
        }

    },


    addSaw:function(x_pos, y_pos, velocity) {
        var newSaw = new Saw(res.saw_1_png);

        newSaw.x = x_pos;
        newSaw.y = y_pos;

        newSaw.sawVelocity = velocity;

        this.saws.push(newSaw);
        this.addChild(this.saws[this.saws.length-1]);

    },

    checkHits:function(x) {
        var saw = x;
        var sawboxLeft = saw.x-(saw.width/2);
        var sawboxRight = saw.x+(saw.width/2);
        var sawboxTop = saw.y+(saw.height/2);
        var sawboxBottom = saw.y-(saw.height/2);
        for(var i = 0; i < this.logs.length; i++) {
            var logboxLeft = this.logs[i].x - (this.logs[i].width / 2);
            var logboxRight = this.logs[i].x + (this.logs[i].width / 2);
            var logboxTop = this.logs[i].y + (this.logs[i].height / 2);
            var logboxBottom = this.logs[i].y - (this.logs[i].height / 2);

            var not_hit = false;
            not_hit = not_hit || (logboxRight<sawboxLeft);
            not_hit = not_hit || (logboxLeft>sawboxRight);
            not_hit = not_hit || (logboxTop<sawboxBottom);
            not_hit = not_hit || (logboxBottom>sawboxTop);

            //if any of the above made not_hit true; the log wasn't hit.

            if (!not_hit) {

                var score = 0;

                var logLayer = this.parent.logLayer;

                if (logLayer.getChildByName("player").ParentLog == this.logs[i]) {
                    // also kill the player
                    cc.director.getRunningScene().killPlayer("Saw  blades  are  sharp...", true, true, true);
                }
                else if (this.logs[i].getChildByName("beaver name string") != null) {
                    score += this.logs[i].getChildByName("beaver name string").getScore();
                }
                else {
                    score += this.logs[i].getScore();
                }

                // change the player's score
                cc.director.getRunningScene().changeScoreBy(score);

                // remove the relevant log
                this.logs[i].parent.removeChild(this.logs[i], true);
                this.logs.splice(i, 1);

            }

        }
    }


});

var Saw = cc.Sprite.extend({
    ctor: function(sprite) {

        // How fast the saw moves up and down
        this.sawVelocity = 0;

        this.sawActive = true;

        this.curFrame = 0;
        this.sinceLastFrame = 0;

        this._super(res.saw_1_png);
        cc.spriteFrameCache.addSpriteFrame(
            new cc.SpriteFrame(res.saw_1_png, cc.rect(0, 0, 64, 64)), "saw0");
        cc.spriteFrameCache.addSpriteFrame(
            new cc.SpriteFrame(res.saw_2_png, cc.rect(0, 0, 64, 64)), "saw1");
        cc.spriteFrameCache.addSpriteFrame(
            new cc.SpriteFrame(res.saw_3_png, cc.rect(0, 0, 64, 64)), "saw2");

        this.scheduleUpdate();
    },

    update:function(dt) {

        if (this.sawActive == true) {
            if (this.sinceLastFrame > 0) {
                this.curFrame++;
                if (this.curFrame > 2) {
                    this.curFrame = 0;
                }
                this.sinceLastFrame = 0;
            }
            else{
                this.sinceLastFrame += dt;
            }
        }

        this.setSpriteFrame("saw" + this.curFrame);


    }

});