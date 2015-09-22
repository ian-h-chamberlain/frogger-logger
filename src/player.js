var player = cc.Sprite.extend({
    ctor : function( inparent, inlogList, inScene) {
        this._super(res.lumberjackstand_png);
        this.ParentLog = inparent;
        this.logList = inlogList;
        this.Scene = inScene;
        this.ParentLog.y = 375;
        this.ParentLog.velY = 0;
        
        this.isDead = 0 ;
        this.wentToDeathScreen = 0;
        
        this.standardAcceleration = .1;
        this.yAcceleration = 0;
        
        this.NextFrame = "lumberjackstand";
        this.curFrame = 0;
        this.time = 0;
        this.lastFrameUpdate = 0;
        
        this.ContactPoints = this.ParentLog.getContactPoints();
        for (var i = 0 ; i < this.ContactPoints.length; i++)
        {
            this.ContactPoints[i].x -= this.ParentLog.x;
            this.ContactPoints[i].y -= this.ParentLog.y;
        }
        this.ParentContactIndex = Math.floor(this.ContactPoints.length / 2);
        
        this.setLocalZOrder(2000000);
        this.setAnchorPoint(cc.p(0.5,0.05));
        this.scheduleUpdate();    
        
        cc.spriteFrameCache.addSpriteFrame( new cc.SpriteFrame(res.lumberjackstand_png, cc.rect(0, 0, 64, 128)), "lumberjackstand");
        
        cc.spriteFrameCache.addSpriteFrame( new cc.SpriteFrame(res.lumberjackRunDown1_png, cc.rect(0, 0, 64, 128)), "lumberjack_man_run_down_1");
        cc.spriteFrameCache.addSpriteFrame( new cc.SpriteFrame(res.lumberjackRunDown2_png, cc.rect(0, 0, 64, 128)), "lumberjack_man_run_down_2");
        cc.spriteFrameCache.addSpriteFrame( new cc.SpriteFrame(res.lumberjackRunDown3_png, cc.rect(0, 0, 64, 128)), "lumberjack_man_run_down_3");
        cc.spriteFrameCache.addSpriteFrame( new cc.SpriteFrame(res.lumberjackRunDown4_png, cc.rect(0, 0, 64, 128)), "lumberjack_man_run_down_4");
        
        cc.spriteFrameCache.addSpriteFrame( new cc.SpriteFrame(res.lumberjackRunUp1_png, cc.rect(0, 0, 64, 128)), "lumberjack_man_run_up_1");
        cc.spriteFrameCache.addSpriteFrame( new cc.SpriteFrame(res.lumberjackRunUp2_png, cc.rect(0, 0, 64, 128)), "lumberjack_man_run_up_2");
        cc.spriteFrameCache.addSpriteFrame( new cc.SpriteFrame(res.lumberjackRunUp3_png, cc.rect(0, 0, 64, 128)), "lumberjack_man_run_up_3");
        cc.spriteFrameCache.addSpriteFrame( new cc.SpriteFrame(res.lumberjackRunUp4_png, cc.rect(0, 0, 64, 128)), "lumberjack_man_run_up_4");
        
        cc.spriteFrameCache.addSpriteFrame( new cc.SpriteFrame(res.lumberjackLeanLeft_png, cc.rect(0, 0, 64, 128)), "lumberjack_man_lean_left");
        cc.spriteFrameCache.addSpriteFrame( new cc.SpriteFrame(res.lumberjackLeanRight_png, cc.rect(0, 0, 64, 128)), "lumberjack_man_lean_right");
        
        this.SplashTime = 0;
        cc.spriteFrameCache.addSpriteFrame( new cc.SpriteFrame(res.lumberjackSplash1_png, cc.rect(0, 0, 64, 128)), "lumberjack_Splash_1");
        cc.spriteFrameCache.addSpriteFrame( new cc.SpriteFrame(res.lumberjackSplash2_png, cc.rect(0, 0, 64, 128)), "lumberjack_Splash_2");
        cc.spriteFrameCache.addSpriteFrame( new cc.SpriteFrame(res.lumberjackSplash3_png, cc.rect(0, 0, 64, 128)), "lumberjack_Splash_3");
        cc.spriteFrameCache.addSpriteFrame( new cc.SpriteFrame(res.lumberjackSplash4_png, cc.rect(0, 0, 64, 128)), "lumberjack_Splash_4");
        cc.spriteFrameCache.addSpriteFrame( new cc.SpriteFrame(res.lumberjackSplash5_png, cc.rect(0, 0, 64, 128)), "lumberjack_Splash_5");
        
        this.Input = new inputRead(this);
        this.addChild(this.Input);
        
        },
    update : function(dt) {

        if (!this.isDead)
        {
            this.x = this.ParentLog.x + this.ContactPoints[this.ParentContactIndex].x;
            this.y = this.ParentLog.y + this.ContactPoints[this.ParentContactIndex].y;
            
            this.ParentLog.velY += this.yAcceleration;
            if (this.ParentLog.velY > .8)
            {this.ParentLog.velY = .8}
            else if (this.ParentLog.velY < -.8)
            {this.ParentLog.velY = -.8}
            
            this.decideSpriteFrame(dt);
        }
        else
        {
            this.SplashTime += dt;
            var FrameNumber = Math.floor(this.SplashTime / (1/16)) + 1;

            // play splash effect
            if (FrameNumber == 1) {
                cc.audioEngine.playEffect(res.splash_wav, false);
            }

            if (FrameNumber <= 6)
            {
                if (FrameNumber == 6)
                {
                    if (!this.wentToDeathScreen)
                    {
                        this.setOpacity(0);
                        //cc.log("death screen");
                        this.Scene.playerDie();
                        this.wentToDeathScreen = 1;
                    }
                }
                else
                {
                    var NextFrame = "lumberjack_Splash_" + FrameNumber;
                    this.setSpriteFrame(NextFrame);
                }
            }
        }
        return true;
    },
    moveLogLeft : function( ) {
        this.ParentLog.velX = -.8;
        return true;
    },
    switchSegmentLeft : function ( ) {
        if (this.ParentContactIndex > 0)
        {this.ParentContactIndex--;}
        else
        {this.switchLog(this.x - 64, this.y);}
        return true;
    },
    moveLogRight : function( ) {
        this.ParentLog.velX = 2.6;
        return true;
    },
    switchSegmentRight : function ( ) {
        if (this.ParentContactIndex < this.ContactPoints.length-1)
        {this.ParentContactIndex++;}
        else
        {this.switchLog(this.x + 64, this.y);}
    },
    LogSetVerticalAcceleration : function( NewAcceleration ) {
        this.yAcceleration = NewAcceleration;
        return true;
    },
    normalizeLogXVel : function( ) {
        
        this.ParentLog.velX = 1.6;
        return true;
    },
    switchLog : function( JumpPositionX, JumpPositionY) {
        
        // loop through the logs to see if there is one that does fits our destination.
        //cc.log("looking for jump");
        for (var logIndex = 0 ; logIndex < this.logList.length; logIndex++) {
            var log = this.logList[logIndex];
            if ((Math.abs(log.x - JumpPositionX) < log.width/2)){
                //cc.log((Math.abs(log.y - JumpPositionY) +" < "+ log.height/2));
            if ((Math.abs(log.y - JumpPositionY) < log.height/2))
            {   
                //cc.log("Log in Y");
                this.normalizeLogXVel();
                this.ParentLog = this.logList[logIndex];
                this.ContactPoints = this.ParentLog.getContactPoints();
                for (var i = 0 ; i < this.ContactPoints.length; i++)
                {
                    this.ContactPoints[i].x -= this.ParentLog.x;
                    this.ContactPoints[i].y -= this.ParentLog.y;
                }
                if (JumpPositionX < this.x)
                {
                    this.ParentContactIndex = this.ContactPoints.length-1;
                }
                else if (JumpPositionX > this.x)
                {
                    this.ParentContactIndex = 0;
                }
                else
                {
                    var LowX = this.ContactPoints[0].x - 32 + this.ParentLog.x;
                    this.ParentContactIndex = Math.floor((this.x - LowX)/64);
                }
                return true;
            }}
        }
        
        //Player death stuff
        this.x = JumpPositionX;
        this.y = JumpPositionY;
        this.Scene.killPlayer( "\"I can't swim!\"", true, "Menu");
        return false;
    },
    die : function () {
        this.isDead = 1;
    },
    decideSpriteFrame : function ( dt) {
        
        this.time += dt;

        if (Math.abs(this.ParentLog.velY) > 0.2)
        {
            var updateTime = Math.abs(0.2 / this.ParentLog.velY);

            if (this.time - this.lastFrameUpdate >= updateTime) {
                this.lastFrameUpdate = this.time;

                // roll the correct way based on y-velocity
                if (this.ParentLog.velY > 0) {
                    this.curFrame++;
                    if (this.curFrame > 3)
                        this.curFrame = 0;
                    this.NextFrame = ("lumberjack_man_run_up_" + (this.curFrame+1));
                }
                else if (this.ParentLog.velY < 0) {
                    this.curFrame--;
                    if (this.curFrame < 0)
                        this.curFrame = 3;
                    this.NextFrame = ("lumberjack_man_run_down_" + (this.curFrame+1));
                }
            }
        }
        else
        {
            if (this.Input.KeyStates.a)
            {
                this.NextFrame = "lumberjack_man_lean_left";
            }
            else if (this.Input.KeyStates.d)
            {
                this.NextFrame = "lumberjack_man_lean_right";
            }
            else
            {
                this.NextFrame = "lumberjackstand";
            }
        }
        
        this.setSpriteFrame(this.NextFrame);
        return true;
    }
});