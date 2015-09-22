var SawLayer = cc.Layer.extend({
    sprite:null,

    ctor:function (logList, level) {
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

    init:function() {
        // Call super class's super function
        this._super();

        // TODO: Put the saw in the correct place
        this.addSaw(cc.winSize.width-32, cc.winSize.height/2, 0);


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
                //TODO Replace the below pseudocode with actual code

                var score = 0;

                score += this.logs[i].getScore();

                if (this.logs[i].getChildByName("player name string") != null) {
                    score += this.logs[i].getChildByName("player name string").getScore();
                }
                if (this.logs[i].getChildByName("beaver name string") != null) {
                    score += this.logs[i].getChildByName("beaver name string").getScore();
                }

                //Todo update player's score, destroy player and logs

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
            new cc.SpriteFrame(res.saw_2_png, cc.rect(0, 0, 64, 64)), "saw2");

        this.scheduleUpdate();
    },

    update:function(dt) {

        if (this.sawActive == true) {;
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