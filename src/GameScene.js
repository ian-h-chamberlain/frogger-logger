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
    init : function (InTimer, InLevel, InScore) {
        this._super();
        
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
        return true;
    }
});

var level1Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        
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
        var logLayer = new LogLayer();
        this.addChild(logLayer);
        logLayer.addLog();
        var log = logLayer.logs[0];
        
        var Player = new player( log, logLayer.logs);
        logLayer.addChild(Player);
        
        // Gui
        var GuiLayer = new guiLayer();
        GuiLayer.init(90, 1, 0);
        this.addChild(GuiLayer);
    },
    init : function (GameScene) {
        this.gameScene = GameScene;
    },
    leaveLevel : function (){
        this.gameScene.setScene("Menu");
        cc.director.popScene();
    }
});

var level2Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
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
        var logLayer = new LogLayer();
        this.addChild(logLayer);
        logLayer.addLog();
        var log = logLayer.logs[0];
        
        var Player = new player( log, logLayer.logs);
        logLayer.addChild(Player);
        
        // Gui
        var GuiLayer = new guiLayer();
        GuiLayer.init(90, 2, 0);
        this.addChild(GuiLayer);
    }
});

var level3Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
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
        var logLayer = new LogLayer();
        this.addChild(logLayer);
        logLayer.addLog();
        var log = logLayer.logs[0];
        
        var Player = new player( log, logLayer.logs);
        logLayer.addChild(Player);
        
        // Gui
        var GuiLayer = new guiLayer();
        GuiLayer.init(90, 3, 0);
        this.addChild(GuiLayer);
    }
});

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        {
            cc.log("Entered GameScene");
            
            switch (this.goToScene) {
                case ("Menu") : {
                    this.scheduleOnce( this.DoTransitionToMenu, 2.1);
                } break;
                case ("Level1") : {
                    this.scheduleOnce( this.DoTransitionToLevel1Scene, 2.1);
                } break;
                case ("Level1EndScreen") : {
                    //this.scheduleOnce( this.DoTransitionToLevel1Scene, 2.1);
                } break;
                case ("Level2") : {
                    //this.scheduleOnce( this.DoTransitionToLevel1Scene, 2.1);
                } break;
                case ("Level2EndScreen") : {
                    //this.scheduleOnce( this.DoTransitionToLevel1Scene, 2.1);
                } break;
                case ("Level3") : {
                    //this.scheduleOnce( this.DoTransitionToLevel1Scene, 2.1);
                } break;
                case ("Level3") : {
                    //this.scheduleOnce( this.DoTransitionToLevel1Scene, 2.1);
                } break;
                default : {} break;
            }
            
            //var Level2Scene = new level2Scene();
            //var Level2SceneTransition = new cc.TransitionFade(2, Level2Scene, cc.Color(0,0,0,1));
            //cc.director.pushScene(Level2SceneTransition);
            //
            //var Level3Scene = new level3Scene();
            //var Level3SceneTransition = new cc.TransitionFade(2, Level3Scene, cc.Color(0,0,0,1));
            //cc.director.pushScene(Level3SceneTransition);
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
        var Scene = new LogoScene();
        var SceneTransition = new cc.TransitionFade(2, Scene, cc.Color(0,0,0,1));
        cc.director.pushScene(SceneTransition);
        return true;
    }
});

