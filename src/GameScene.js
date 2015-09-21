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
        
        cc.log("Entered Play Scene");
        
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
        var town = new cc.Sprite (res.City1_png);
        town.setPosition (centerpos.x, winsize.height - 64);
        this.addChild( town);
        
        //cc.log("Entered Play Scene");
        
        return true;
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
        return true;
    }
});

var deathLayer = cc.Layer.extend({
    ctor:function() {
        this._super();
    },
    init:function(){
        this._super();
        
        this.winsize = cc.director.getWinSize();
        this.centerpos = cc.p(this.winsize.width / 2, this.winsize.height / 2);
        
        this.img = new cc.Sprite ( res.pleaseStandBy_png);
        this.img.setPosition(this.centerpos);
        this.addChild( this.img);
        
        this.scheduleOnce(this.score, 2);
        this.Score = 0;
        
        return true;
    },
    score : function ( ) {
        this.img.setOpacity(0);
        this.LabelEnter = new cc.LabelTTF( "HIT ENTER", "Arial", 32, new cc.Size( 196, 64));
        this.LabelEnter.setHorizontalAlignment( cc.TEXT_ALIGN_CENTER);
        this.LabelEnter.setPosition(cc.p( this.winsize.width/2, this.winsize.height/2 - 64));
        this.LabelEnter.setColor( new cc.Color( 0, 0, 0));
        this.addChild( this.LabelEnter);
        
        this.LabelScore = new cc.LabelTTF( "SCORE: "+this.Score, "Arial", 32, new cc.Size( 196, 64));
        this.LabelScore.setHorizontalAlignment( cc.TEXT_ALIGN_CENTER);
        this.LabelScore.setPosition(cc.p( this.winsize.width/2, this.winsize.height/2));
        this.LabelScore.setColor( new cc.Color( 0, 0, 0));
        this.addChild( this.LabelScore);
    }
});

var levelTemplateScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.Score = 0;
    },
    init : function (GameScene) {
        this.gameScene = GameScene;
    },
    initDeath : function () {
        this.DeathLayer = new deathLayer();
        this.DeathLayer.init();
    },
    playerDie : function ( ) {
        this.DeathLayer.Score = this.Score;
        this.addChild(this.DeathLayer);
    },
    changeScoreBy : function ( deltaScore ) {
        this.Score += deltaScore;
    },
    acceptDeath : function () {
        cc.log("death accepted");
        this.gameScene.setScene("Menu");
        cc.director.popScene();
    }
});

var level1Scene = levelTemplateScene.extend({
    onEnter:function () {
        this._super();

        initPhysics(this);
        
        this.initDeath();
        // Make the level blue
        var blueBackground = cc.LayerColor.create( new cc.Color(0,0,196,255));
        blueBackground.setPosition(0,0);
        this.addChild(blueBackground);
        // Environment
        var EnvLayer = new environmentLayer();
        EnvLayer.init();
        this.addChild(EnvLayer);
        
        // Draw the game
        // This will probably end up being multiple layers.
        var logLayer = new LogLayer(this.space);
        this.addChild(logLayer);
        logLayer.addLog();
        var log = logLayer.logs[0];
        
        var Player = new player( log, logLayer.logs, this);
        logLayer.addChild(Player);
        
        // Gui
        var GuiLayer = new guiLayer();
        GuiLayer.init(90, 1, this.Score, this);
        
        this.addChild(GuiLayer);
    }
});

var level2Scene = levelTemplateScene.extend({
    onEnter:function () {
        this._super();

        // initialize the physics
        initPhysics(this);

        // Make the level blue
        var blueBackground = cc.LayerColor.create( new cc.Color(0,0,196,255));
        blueBackground.setPosition(0,0);
        this.addChild(blueBackground);
        // Environment
        var EnvLayer = new environmentLayer();
        EnvLayer.init();
        this.addChild(EnvLayer);
        
        // Draw the game
        // This will probably end up being multiple layers.
        var logLayer = new LogLayer(this.space);
        this.addChild(logLayer);
        logLayer.addLog();
        var log = logLayer.logs[0];
        
        var Player = new player( log, logLayer.logs);
        logLayer.addChild(Player);
        
        // Gui
        var GuiLayer = new guiLayer();
        GuiLayer.init(90, 2, 0, this);
        this.addChild(GuiLayer);
    }
});

var level3Scene = levelTemplateScene.extend({
    onEnter:function () {
        this._super();

        // initialize the physics
        initPhysics(this);

        // Make the level blue
        var blueBackground = cc.LayerColor.create( new cc.Color(0,0,196,255));
        blueBackground.setPosition(0,0);
        this.addChild(blueBackground);
        
        // Environment
        var EnvLayer = new environmentLayer();
        EnvLayer.init();
        this.addChild(EnvLayer);
        
        // Draw the game, this
        // This will probably end up being multiple layers.
        var logLayer = new LogLayer(this.space);
        this.addChild(logLayer);
        logLayer.addLog();
        var log = logLayer.logs[0];
        
        var Player = new player( log, logLayer.logs);
        logLayer.addChild(Player);
        
        // Gui
        var GuiLayer = new guiLayer();
        GuiLayer.init(90, 3, 0, this);
        this.addChild(GuiLayer);
    }
});

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        {
            this.score = 0;
            cc.log("Entered GameScene");
            
            switch (this.goToScene) {
                case ("Menu") : {
                    this.scheduleOnce( this.DoTransitionToMenu, 2.1);
                } break;
                case ("Level1") : {
                    this.scheduleOnce( this.DoTransitionToLevel1Scene, 2.1);
                } break;
                case ("Level2") : {
                    //this.scheduleOnce( this.DoTransitionToLevel1Scene, 2.1);
                } break;
                case ("Level3") : {
                    //this.scheduleOnce( this.DoTransitionToLevel1Scene, 2.1);
                } break;
                default : {} break;
            }
        }
    },
    setScene : function (string) {
        this.goToScene = string;
    },
    DoTransitionToLevel1Scene : function() {
        var Scene = new level1Scene();
        Scene.init(this);
        var SceneTransition = new cc.TransitionFade(2, Scene, cc.Color(0,0,0,1));
        cc.director.pushScene(SceneTransition);
        return true;
    },
    DoTransitionToMenu : function() {
        var Scene = new level1Scene();
        var SceneTransition = new cc.TransitionFade(2, Scene, cc.Color(0,0,0,1));
        cc.director.pushScene(SceneTransition);
        return true;
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
