var gameLayer = cc.Layer.extend({
    ctor:function() {
        this._super();
    },
    init:function(){
        this._super();
        
        var winsize = cc.director.getWinSize();
        var centerpos = cc.p(winsize.width / 2, winsize.height / 2);
        
        //var TeamLogo = new cc.Sprite ( res.CompassLogo_png);
        //TeamLogo.setPosition(centerpos);
        //this.addChild( TeamLogo);
        
       //cc.log("Entered Play Scene");
        
        return true;
    }
});

var environmentLayer = cc.Layer.extend({
    ctor:function() {
        this._super();
    },
    init:function(){
        this._super();
        
        // We need this for placement information.
        var winsize = cc.director.getWinSize();
        var centerpos = cc.p(winsize.width / 2, winsize.height / 2);

        // tiled water background
        cc.spriteFrameCache.addSpriteFrame(
            new cc.SpriteFrame(res.water1_png, cc.rect(0, 0, 64, 64)), "water1");
        cc.spriteFrameCache.addSpriteFrame(
            new cc.SpriteFrame(res.water2_png, cc.rect(0, 0, 64, 64)), "water2");
        cc.spriteFrameCache.addSpriteFrame(
            new cc.SpriteFrame(res.water3_png, cc.rect(0, 0, 64, 64)), "water3");
        cc.spriteFrameCache.addSpriteFrame(
            new cc.SpriteFrame(res.water4_png, cc.rect(0, 0, 64, 64)), "water4");
        cc.spriteFrameCache.addSpriteFrame(
            new cc.SpriteFrame(res.water5_png, cc.rect(0, 0, 64, 64)), "water5");
        cc.spriteFrameCache.addSpriteFrame(
            new cc.SpriteFrame(res.water6_png, cc.rect(0, 0, 64, 64)), "water6");
        cc.spriteFrameCache.addSpriteFrame(
            new cc.SpriteFrame(res.water7_png, cc.rect(0, 0, 64, 64)), "water7");
        cc.spriteFrameCache.addSpriteFrame(
            new cc.SpriteFrame(res.water8_png, cc.rect(0, 0, 64, 64)), "water8");
        cc.spriteFrameCache.addSpriteFrame(
            new cc.SpriteFrame(res.water9_png, cc.rect(0, 0, 64, 64)), "water9");

        this.waterTiles = new cc.Node();
        this.waterTiles.lastUpdate = 0;
        this.waterTiles.time = 0;
        this.addChild(this.waterTiles);

        // add the tiles
        for (var i=0; i <= winsize.width + 64 ; i += 64) {
            for (var j=64; j < winsize.height - 64; j += 64) {
                var waterTile = new cc.Sprite();
                waterTile.setSpriteFrame("water1");
                waterTile.setPosition(i, j);
                this.waterTiles.addChild(waterTile, -1, 1);
            }
        }

        this.scheduleUpdate();
        
        // The river's bank at the top of the screen.
        var topBank = new cc.Sprite ( res.TopBank_png);
        topBank.setPosition( centerpos.x, winsize.height - 64);
        this.addChild( topBank);
        
        // Add the wood GUI panels.
        var LeftPanel = new cc.Sprite (res.GuiWoodPanel_png);
        LeftPanel.setPosition(196/2 - 1, winsize.height - 64);
        this.addChild( LeftPanel);
        var RightPanel = new cc.Sprite (res.GuiWoodPanel_png);
        RightPanel.setPosition(winsize.width - (196/2 - 1) , winsize.height - 64);
        this.addChild( RightPanel);
        
        // The river's bank at the bottom of the screen.
        var bottomBank = new cc.Sprite (res.BottomBank_png);
        bottomBank.setPosition( centerpos.x, 64);
        this.addChild( bottomBank);
        
        // The town at the top of the screen
        this.town1 = new cc.Sprite (res.City1_png);
        this.town1.setPosition (centerpos.x, winsize.height - 64);
        this.addChild( this.town1);
        
        this.town2 = new cc.Sprite (res.City2_png);
        this.town2.setPosition (centerpos.x, winsize.height - 64);
        this.town2.setOpacity(1);
        this.addChild( this.town2);
        
        this.town3 = new cc.Sprite (res.City3_png);
        this.town3.setPosition (centerpos.x, winsize.height - 64);
        this.town3.setOpacity(1);
        this.addChild( this.town3);
        
        //cc.log("Entered Play Scene");
        
        return true;
    },

    // update the water tile animations
    update: function(dt) {
        this.waterTiles.time += dt;
        if (this.waterTiles.time - this.waterTiles.lastUpdate >= 0.02) {
            this.waterTiles.lastUpdate = this.waterTiles.time;
            for (var i = 0; i < this.waterTiles.getChildrenCount(); i++) {
                var frameNo = this.waterTiles.getChildren()[i].getTag() + 1;
                if (frameNo > 9)
                    frameNo = 1;
                this.waterTiles.getChildren()[i].setSpriteFrame("water" + frameNo);
                this.waterTiles.getChildren()[i].setTag(frameNo);
            }
        }
    }
});

var guiLayer = cc.Layer.extend({
    ctor : function () {
        this._super();
    },
    init : function (InTimer, InLevel, InScore, InScene) {
        this._super();
        this.Scene = InScene;
        
        var winsize = cc.director.getWinSize();
        var centerpos = cc.p(winsize.width / 2, winsize.height / 2);
        
        this.Timer = InTimer;
        this.LabelTime = new cc.LabelTTF("Time: "+ this.Timer.toPrecision(2), "Arial", 32, new cc.Size(256, 64));
        this.LabelTime.setHorizontalAlignment( cc.TEXT_ALIGN_LEFT);
        this.LabelTime.setPosition( cc.p( 128, winsize.height - 48));
        this.LabelTime.setColor( new cc.Color(0,0,0));
        this.addChild( this.LabelTime);
        
        this.Level = InLevel;
        this.LabelLevel = new cc.LabelTTF("Level: "+this.Level, "Arial", 32, new cc.Size(256, 64));
        this.LabelLevel.setHorizontalAlignment( cc.TEXT_ALIGN_LEFT);
        this.LabelLevel.setPosition( cc.p( 128, winsize.height - 80));
        this.LabelLevel.setColor( new cc.Color(0,0,0));
        this.addChild( this.LabelLevel);
        
        this.Score = InScore;
        this.LabelScore = new cc.LabelTTF( "Score: "+this.Score, "Arial", 32, new cc.Size( 196, 64));
        this.LabelScore.setHorizontalAlignment( cc.TEXT_ALIGN_RIGHT);
        this.LabelScore.setPosition(cc.p( winsize.width - 196/2, winsize.height - 80));
        this.LabelScore.setColor( new cc.Color( 0, 0, 0));
        this.addChild( this.LabelScore);
        
        this.scheduleUpdate();
        
        return true;
    },
    update : function (dt) {
        this.Timer -= dt;
        this.LabelTime.setString("Time: "+ this.Timer.toPrecision(2));
        this.LabelScore.setString("Score: "+this.Scene.Score.toPrecision(4));
        
        if (this.Timer < 0 )
        {
            if (this.Scene.Score < this.Scene.ScoreVictory)
            {
                this.Scene.killPlayer("I'll never win this bet now!", false, "Menu");
            }
            else
            {
                this.Scene.killPlayer("I'm on my way to winning this bet!", false, "nextlevel");
            }
        }
        return true;
    }
});

var endLayer = cc.Layer.extend({
    ctor:function() {
        this._super();
    },
    init:function( note){
        this._super();
        
        this.hadDied = 0;
        
        this.winsize = cc.director.getWinSize();
        this.centerpos = cc.p(this.winsize.width / 2, this.winsize.height / 2);
        this.Note = "\"I can't swim!\"";
        
        var blackBackground = cc.LayerColor.create( new cc.Color(0,0,0,255));
        blackBackground.setPosition(0,0);
        this.addChild(blackBackground);
        
        this.img = new cc.Sprite ( res.pleaseStandBy_png);
        this.img.setPosition(this.centerpos);
        this.addChild( this.img);
        
        this.Score = 0;
        
        return true;
    },
    updateNote : function ( newNote, badDeath){
        if (this.hasDied) {return true;}
        this.Note = newNote;
        this.hasDied = 1;
        if (badDeath)
        {
            this.scheduleOnce(this.score,2);
        }
        else
        {
            this.img.setOpacity(0);
            this.score();
        }
        return true;
    },
    score : function ( ) {
        this.img.setOpacity(0);
        
        this.LabelNote = new cc.LabelTTF( this.Note , "Arial", 32, new cc.Size( 256, 64));
        this.LabelNote.setHorizontalAlignment( cc.TEXT_ALIGN_CENTER);
        this.LabelNote.setPosition(cc.p( this.winsize.width/2, this.winsize.height/2 + 64));
        this.LabelNote.setColor( new cc.Color( 255, 255, 255));
        this.addChild( this.LabelNote);
        
        this.LabelEnter = new cc.LabelTTF( "HIT ENTER", "Arial", 32, new cc.Size( 196, 64));
        this.LabelEnter.setHorizontalAlignment( cc.TEXT_ALIGN_CENTER);
        this.LabelEnter.setPosition(cc.p( this.winsize.width/2, this.winsize.height/2 - 64));
        this.LabelEnter.setColor( new cc.Color( 255, 255, 255));
        this.addChild( this.LabelEnter);
        
        this.LabelScore = new cc.LabelTTF( "SCORE: "+this.Score, "Arial", 32, new cc.Size( 196, 64));
        this.LabelScore.setHorizontalAlignment( cc.TEXT_ALIGN_CENTER);
        this.LabelScore.setPosition(cc.p( this.winsize.width/2, this.winsize.height/2));
        this.LabelScore.setColor( new cc.Color( 255, 255, 255));
        this.addChild( this.LabelScore);
    }
});

var levelTemplateScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        // play background music
        if (!cc.audioEngine.isMusicPlaying())
            cc.audioEngine.playMusic(res.backgroundMusic_mp3, true);
        this.Score = 0;
        this.ScoreMilestone1 = 50;
        this.ScoreMilestone2 = 100;
        this.ScoreVictory = 200;
        
        this.ActualGotoScene;
        //cc.log("start next scene on MENU");
        //this.ProgressScene = "Menu";
        this.badDeath = 0;
    },
    init : function (GameScene, inScoreMilestone1, inScoreMilestone2, inScoreVictory, nextScene) {
        this.gameScene = GameScene;
        this.ScoreMilestone1 = inScoreMilestone1;
        this.ScoreMilestone2 = inScoreMilestone2;
        this.ScoreVictory = inScoreVictory;
        this.ProgressScene = nextScene;
        //cc.log("planned next scene: "+this.ProgressScene);
        
    },
    initDeath : function () {
        this.DeathLayer = new endLayer();
        this.DeathLayer.init();
    },
    killPlayer : function ( causeOfDeath, badDeath, newScene) {
        this.Player.die();
        this.DeathLayer.updateNote( causeOfDeath,badDeath);
        this.badDeath = badDeath;
        if ( newScene == "Menu" )
        {
            //cc.log( causeOfDeath );
            //cc.log("set next stage menu");
            this.ActualGotoScene = "Menu";
        }
        else
        {
            this.ActualGotoScene = this.ProgressScene;
            //cc.log( causeOfDeath );
            //cc.log("set next stage: "+this.ActualGotoScene);
        }
    },
    playerDie : function ( ) {
        this.DeathLayer.Score = this.Score;
        // stop bg music
        cc.audioEngine.stopMusic();
        // and effects
        cc.audioEngine.stopAllEffects();
        // play death sound
        if (this.badDeath)
        {
            cc.audioEngine.playEffect(res.sawmill_wav, false);
        }
        this.addChild(this.DeathLayer);
    },
    changeScoreBy : function ( deltaScore ) {
        this.Score += deltaScore;
        if (this.Score > this.ScoreMilestone2)
        {
           //cc.log("city3");
            this.EnvLayer.town3.setOpacity(255);
        }
        else if (this.Score > this.ScoreMilestone1)
        {
           //cc.log("city2");
            this.EnvLayer.town2.setOpacity(255);
        }
    },
    moveToNextStage : function () {
        //cc.log("Next stage: " + this.ActualGotoScene);
        this.gameScene.setScene(this.ActualGotoScene);
        cc.director.popScene();
    }
});

var level1Scene = levelTemplateScene.extend({
    onEnter:function () {
        this._super();

        initPhysics(this);
        cc.log("LVL1");
        this.initDeath();
        /* Make the level blue
        var blueBackground = cc.LayerColor.create( new cc.Color(0,0,196,255));
        blueBackground.setPosition(0,0);
        this.addChild(blueBackground);
        */
        // Environment
        this.EnvLayer = new environmentLayer();
        this.EnvLayer.init();
        this.addChild(this.EnvLayer);
        
        // Draw the game
        // This will probably end up being multiple layers.
        var logLayer = new LogLayer(this.space);
        this.addChild(logLayer);
        logLayer.addLog();
        var log = logLayer.logs[0];
        
        this.Player = new player( log, logLayer.logs, this);
        logLayer.addChild(this.Player);
        
        // Gui
        var GuiLayer = new guiLayer();
        GuiLayer.init(10, 1, this.Score, this);
        
        this.addChild(GuiLayer);
    }
});

var level2Scene = levelTemplateScene.extend({
    onEnter:function () {
        this._super();
        cc.log("LVL2");
        initPhysics(this);
        this.initDeath();
        /* Make the level blue
        var blueBackground = cc.LayerColor.create( new cc.Color(0,0,196,255));
        blueBackground.setPosition(0,0);
        this.addChild(blueBackground);
        */
        // Environment
        this.EnvLayer = new environmentLayer();
        this.EnvLayer.init();
        this.addChild(this.EnvLayer);
        
        // Draw the game
        // This will probably end up being multiple layers.
        var logLayer = new LogLayer(this.space);
        this.addChild(logLayer);
        logLayer.addLog();
        var log = logLayer.logs[0];
        
        this.Player = new player( log, logLayer.logs, this);
        logLayer.addChild(this.Player);
        
        // Gui
        var GuiLayer = new guiLayer();
        GuiLayer.init(10, 2, this.Score, this);
        
        this.addChild(GuiLayer);
    }
});

var level3Scene = levelTemplateScene.extend({
    onEnter:function () {
        this._super();
        cc.log("LVL3");
        initPhysics(this);
        this.initDeath();
        /* Make the level blue
        var blueBackground = cc.LayerColor.create( new cc.Color(0,0,196,255));
        blueBackground.setPosition(0,0);
        this.addChild(blueBackground);
        */
        // Environment
        this.EnvLayer = new environmentLayer();
        this.EnvLayer.init();
        this.addChild(this.EnvLayer);
        
        // Draw the game
        // This will probably end up being multiple layers.
        var logLayer = new LogLayer(this.space);
        this.addChild(logLayer);
        logLayer.addLog();
        var log = logLayer.logs[0];
        
        this.Player = new player( log, logLayer.logs, this);
        logLayer.addChild(this.Player);
        
        // Gui
        var GuiLayer = new guiLayer();
        GuiLayer.init(10, 3, this.Score, this);
        
        this.addChild(GuiLayer);
    }
});

var GameScene = cc.Scene.extend({
    onEnter:function () {

        this._super();

        // play background music
        //cc.audioEngine.playMusic("res/sound/backgroundMusic.mp3", true);

        {
            this.score = 0;
           //cc.log("Entered GameScene");
            
            switch (this.goToScene) {
                case ("MenuIntro") : {
                    var Scene = new playCutScene();
                    var imgList = [];
                    imgList.push(res.cs_intro1_png,res.cs_intro2_png);
                    Scene.init(this, "Menu", imgList);
                    cc.director.pushScene(Scene);
                } break;
                case ("Menu") : {
                    //cc.log("ROUTE TO MENU SCENE");
                    var Scene = new startScene();
                    Scene.init(this, "Level1Intro");
                    cc.director.pushScene(Scene);
                } break;
                case ("Level1Intro") : {
                    var Scene = new playCutScene();
                    var imgList = [];
                    imgList.push(res.cs_round1_1_png,res.cs_round1_2_png);
                    Scene.init(this, "Level1", imgList);
                    cc.director.pushScene(Scene);
                } break;
                case ("Level1") : {
                    var Scene = new level1Scene();
                    Scene.init(this, 50, 100, 200, "Level2Intro");
                    cc.director.pushScene(Scene);
                } break;
                case ("Level2Intro") : {
                    var Scene = new playCutScene();
                    var imgList = [];
                    imgList.push(res.cs_round2_1_png,res.cs_round2_2_png);
                    Scene.init(this, "Level2", imgList);
                    cc.director.pushScene(Scene);
                } break;
                case ("Level2") : {
                    var Scene = new level2Scene();
                    Scene.init(this, 50, 100, 200, "Level3Intro");
                    cc.director.pushScene(Scene);
                } break;
                case ("Level3Intro") : {
                    var Scene = new playCutScene();
                    var imgList = [];
                    imgList.push(res.cs_round3_1_png,res.cs_round3_2_png);
                    Scene.init(this, "Level3", imgList);
                    cc.director.pushScene(Scene);
                } break;
                case ("Level3") : {
                    var Scene = new level3Scene();
                    Scene.init(this, 50, 100, 200, "Level3End");
                    cc.director.pushScene(Scene);
                } break;
                case ("Level3End") : {
                    var Scene = new playCutScene();
                    var imgList = [];
                    imgList.push(res.cs_round4_1_png,res.cs_round4_2_png,res.cs_round4_3_png);
                    Scene.init(this, "End", imgList);
                    cc.director.pushScene(Scene);
                } break;
                case ("End") : {
                    var Scene = new endScene();
                    cc.director.pushScene(Scene);
                } break;
                default : {} break;
            }
        }
    },
    setScene : function (string) {
        this.goToScene = string;
    }
    
});

// initPhysics - initialize the physics for this scene
initPhysics = function(scene) {
    scene.space = new cp.Space();

    scene.space.gravity = cp.v(0, 0);
    scene.space.collisionBias = 0;
    scene.space.fixedUpdateInterval = 1/120;

    // build the riverbanks
    var bottomBank = new cp.SegmentShape(
        scene.space.staticBody,
        cp.v(0, 130),
        cp.v(cc.winSize.width, 130),
        0);
    scene.space.addStaticShape(bottomBank);
    var topBank = new cp.SegmentShape(
        scene.space.staticBody,
        cp.v(0, cc.winSize.height - 130),
        cp.v(cc.winSize.width, cc.winSize.height - 130),
        0);
    scene.space.addStaticShape(topBank);
}