var SawLayer = cc.Layer.extend({
    sprite:null,

    ctor:function () {
        // Call super classes ctor function
        this._super();

        //an array to hold current saws
        this.saws = [];

        //The x at which the saws move long
        this.sawLine = cc.winSize.width - (Saw.width/2);

        this.sawMAX = cc.winSize.height-Saw.height;
        this.sawMIN = Saw.height;

        this.setLocalZOrder(10);

        cc.log("SawLayer Activated!");

        return true;

    },

    init:function() {
        // Call super class's super function
        this._super();

        //The x at which the saws move along
        this.sawLine = (cc.background.width/2) - 64;

        this.addSaw(this.sawLine, 0, 0);

    },

    update: function(dt) {


    },


    addSaw:function(x_pos, y_pos, velocity) {
        var newSaw = new Saw(res.Saw_png);

        newSaw.x = x_pos;
        newSaw.y = y_pos;

        newSaw.sawVelocity = velocity;

        this.saws.push(newSaw);
        this.addChild(this.saws[this.saws.length-1]);

    }


});

var Saw = cc.Sprite.extend({
    ctor: function(sprite) {

      this._super(sprite);

      // How fast the saw moves up and down
      var sawVelocity = 0;

    },

    update:function(dt) {
        // Move the saw as needed. Probably should have its own function
        var new_y = this.y + this.sawVelocity *dt;

        if (new_y >= SawLayer.sawMAX) {
            new_y = SawLayer.sawMAX(new_y-SawLayer.sawMAX);
        }

        if (new_y <= SawLayer.sawMIN) {
            new_y = SawLayer.sawMIN+(SawLayer.sawMIN-new_y);
        }

        this.y = new_y;

        // Check to see if we're hitting anything
        this.checkHits();
    },


    checkHits:function() {
        var sawboxLeft = this.x-(this.width/2);
        var sawboxRight = this.x+(this.width/2);
        var sawboxTop = this.y+(this.height/2);
        var sawboxBottom = this.y-(this.height/2);


        logs = [];
        logs = LogLayer.allLogs();

        for(var i = 0; i < logs.length; i++) {
            var logboxLeft = logs[i].x - (logs[i].width / 2);
            var logboxRight = logs[i].x + (logs[i].width / 2);
            var logboxTop = logs[i].y + (logs[i].height / 2);
            var logboxBottom = logs[i].y - (logs[i].height / 2);

            var not_hit = false;
            not_hit = not_hit || (logboxRight<sawboxLeft);
            not_hit = not_hit || (logboxLeft>sawboxRight);
            not_hit = not_hit || (logboxTop<sawboxBottom);
            not_hit = not_hit || (logboxBottom>sawboxTop);

            //if any of the above made not_hit true; the log wasn't hit.

            if (!not_hit) {
                //TODO Replace the below pseudocode with actual code
                cc.log("We have a hit!");

                var score = 0;

                score += logs[i].getScore();

                /*
                if (logs[i].getChildByName("player name string").getName() == "player name string") {
                    score += logs[i].getChildByName("player name string").getScore();
                }

                if (logs[i].getChildByName("beaver name string").getName() == "beaver name string") {
                    score += logs[i].getChildByName("beaver name string").getScore();
                }

                Player.updateScore(score);
                */

            }

        }
    }

});