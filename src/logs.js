var LogLayer = cc.Layer.extend({
    sprite:null,

    ctor:function (space) {
        //////////////////////////////
        // 1. super init first
        this._super();

        this.space = space;

        // an array to hold the logs
        this.logs = [];

        // schedule the update function to run
        this.scheduleUpdate();

        // add a drawNode for primitive drawing
        this.dn = new cc.DrawNode();
        this.addChild(this.dn);
        this.dn.setLocalZOrder(21);

        this.debugNode = new cc.PhysicsDebugNode(this.space);
        this.addChild(this.debugNode);
        this.debugNode.setLocalZOrder(20);

        return true;
    },

    update: function(dt) {

        // run physics
        this.space.step(dt);

        // spawn logs randomly
        if (Math.random() > 0.95) {
            this.addLog();
        }

        // check logs for being off-screen and delete them if so
        for (var i=0; i<this.logs.length; i++) {
            if ((this.logs[i].x - this.logs[i].width/2) > cc.winSize.width) {
                delete this.logs[i];
                this.logs.splice(i, 1);
                continue;
            }
        }

        // draw bounding boxes and anchor points for each log, for debugging purposes
        this.dn.clear();
        for (var i=0; i<this.logs.length; i++) {
            var start = cc.p(this.logs[i].getBoundingBox().x - this.logs[i].getBoundingBox().width / 2,
                this.logs[i].getBoundingBox().y - this.logs[i].getBoundingBox().height / 2);
            var finish = cc.p(this.logs[i].getBoundingBox().x + this.logs[i].getBoundingBox().width / 2,
                this.logs[i].getBoundingBox().y + this.logs[i].getBoundingBox().height / 2);

            // draw the bounding box
            this.dn.drawRect(start, finish, null, 2, cc.color(0, 255, 0, 255));
            // draw the contact points of the log
            for (var j=0; j < this.logs[i].getContactPoints().length; j++) {
                this.dn.drawDot(this.logs[i].getContactPoints()[j], 5, cc.color(255, 0, 0, 255));
            }
            this.dn.drawDot(this.logs[i].getPosition(), 7, cc.color(255, 0, 255, 255));
        }
    },

    // addLog - adds a log randomly with bounds checking
    addLog: function() {
        var newLog;
        if (Math.random() > 0.5)
            newLog = new Log(3, this.space);
        else
            newLog = new Log(4, this.space);

        for (var i=0; i<this.logs.length; i++) {
            // ensure that the new log will not overlap an existing log
            if (newLog.y >= this.logs[i].y - 1.5*this.logs[i].height
                    && newLog.y <= this.logs[i].y + 1.5*this.logs[i].height
                    && this.logs[i].x <= cc.winSize.width / 3) {
                return;
            }
        }

        // actually add the log
        newLog.init();
        this.logs.push(newLog);
        this.addChild(this.logs[this.logs.length - 1]);
    }
});

/**
 * LogSegment: each square of the log will be of this type
 */

var LogSegment = cc.Sprite.extend({
    ctor: function(type) {

        this.curFrame = 0;
        this.type = type;
        this.time = 0;
        this.lastFrameUpdate = 0;

        this.score = 100;   // points this log segment is worth

        // initialize the correct sprites
        switch(this.type) {
            case "left":
                this._super(res.log_left1_png);
                cc.spriteFrameCache.addSpriteFrame(
                    new cc.SpriteFrame(res.log_left1_png, cc.rect(0, 0, 64, 64)), "log_left0");
                cc.spriteFrameCache.addSpriteFrame(
                    new cc.SpriteFrame(res.log_left2_png, cc.rect(0, 0, 64, 64)), "log_left1");
                cc.spriteFrameCache.addSpriteFrame(
                    new cc.SpriteFrame(res.log_left3_png, cc.rect(0, 0, 64, 64)), "log_left2");
                cc.spriteFrameCache.addSpriteFrame(
                    new cc.SpriteFrame(res.log_left4_png, cc.rect(0, 0, 64, 64)), "log_left3");
                break;

            case "middle":
                this._super(res.log_middle1_png);
                cc.spriteFrameCache.addSpriteFrame(
                    new cc.SpriteFrame(res.log_middle1_png, cc.rect(0, 0, 64, 64)), "log_middle0");
                cc.spriteFrameCache.addSpriteFrame(
                    new cc.SpriteFrame(res.log_middle2_png, cc.rect(0, 0, 64, 64)), "log_middle1");
                cc.spriteFrameCache.addSpriteFrame(
                    new cc.SpriteFrame(res.log_middle3_png, cc.rect(0, 0, 64, 64)), "log_middle2");
                cc.spriteFrameCache.addSpriteFrame(
                    new cc.SpriteFrame(res.log_middle4_png, cc.rect(0, 0, 64, 64)), "log_middle3");
                break;

            case "right":
                this._super(res.log_right1_png);
                cc.spriteFrameCache.addSpriteFrame(
                    new cc.SpriteFrame(res.log_right1_png, cc.rect(0, 0, 64, 64)), "log_right0");
                cc.spriteFrameCache.addSpriteFrame(
                    new cc.SpriteFrame(res.log_right2_png, cc.rect(0, 0, 64, 64)), "log_right1");
                cc.spriteFrameCache.addSpriteFrame(
                    new cc.SpriteFrame(res.log_right3_png, cc.rect(0, 0, 64, 64)), "log_right2");
                cc.spriteFrameCache.addSpriteFrame(
                    new cc.SpriteFrame(res.log_right4_png, cc.rect(0, 0, 64, 64)), "log_right3");
                break;
        }

    },

    // update - animate the log segment based on parent's velocity
    update: function(dt) {
        this.time += dt;

        if (this.parent.velY != 0)
            var updateTime = Math.abs(0.2 / this.parent.velY);
        else
            return;

        if (this.time - this.lastFrameUpdate >= updateTime) {
            this.lastFrameUpdate = this.time;

            // roll the correct way based on y-velocity
            if (this.parent.velY > 0) {
                this.curFrame++;
                if (this.curFrame > 3)
                    this.curFrame = 0;
            }
            else if (this.parent.velY < 0) {
                this.curFrame--;
                if (this.curFrame < 0)
                    this.curFrame = 3;
            }

            // actually set the frame
            switch (this.type) {
                case "left":
                    this.setSpriteFrame("log_left" + this.curFrame);
                    break;
                case "middle":
                    this.setSpriteFrame("log_middle" + this.curFrame);
                    break;
                case "right":
                    this.setSpriteFrame("log_right" + this.curFrame);
                    break;
            }
        }
    }
});

var Log = cc.Node.extend({
    ctor: function(numSegments, space) {
        this._super();

        this.space = space;

        this.logLength = numSegments;

        // add children for each logSegment
        var segment = new LogSegment("left");
        this.addChild(segment,0,0);
        for (var i=1; i<this.logLength - 1; i++) {
            segment = new LogSegment("middle");
            this.addChild(segment, 0, i);
        }
        segment = new LogSegment("right");
        this.addChild(segment, 0, this.logLength - 1);

        // X and Y velocity, in log-units per second
        this.velX = 1.6;
        this.velY = (Math.random() - 0.5);

        // position the log segments as necessary
        for (var i=0; i<this.logLength; i++) {
            this.getChildByTag(i).setPositionX((i - (this.logLength - 1)/2) * 64);
        }

        // set this.width correctly and height
        this.width = this.logLength * 64;
        this.height = 64;

        this.setAnchorPoint(cc.p(0, 0));

        this.x = -this.width;
        this.y = Math.floor((Math.random() * (cc.winSize.height - 256 - 2*this.height)) + this.height + 128);   // randomly spawn on-screen
    },

    init: function() {
        this.phys = new cc.PhysicsSprite();
        this.phys.body = new cp.Body(1, cp.momentForBox(1, this.width, this.height));
        this.phys.body.setPos(cc.p(this.x, this.y));

        this.phys.shape = new cp.BoxShape(this.phys.body, this.width, this.height);

        this.phys.setBody(this.phys.body);

        this.space.addBody(this.phys.body);
        this.space.addShape(this.phys.shape);

        this.phys.body.applyImpulse(cp.v(this.velX * this.height, this.velY * this.height), cc.p(0,0));

        this.scheduleUpdate();
    },

    // returns a list of contact points to snap the player to
    getContactPoints : function() {
        var points = [];
        for (var i = 0; i < this.logLength; i++) {
            points.push(cc.pAdd(this.getPosition(),
                this.getChildByTag(i).getPosition()));
        }
        return points;
    },

    getScore: function() {
        var score = 0;
        for (var i=0; i<this.logLength; i++) {
            score += this.getChildByTag(i).score;
        }
        return score;
    },

    update: function(dt) {

        this.phys.body.applyImpulse(cp.v(this.velX * this.height - this.phys.body.getVel().x,
            this.velY * this.height - this.phys.body.getVel().y), cc.p(0,0));

        this.x = this.phys.body.getPos().x;
        this.y = this.phys.body.getPos().y;

        this.phys.body.setAngle(0);

        // update the children
        for (var i=0; i<this.logLength; i++) {
            this.getChildByTag(i).update(dt);
        }
    }
});