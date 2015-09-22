var RpiLogoLayer = cc.Layer.extend({
    ctor:function() {
        this._super();
    },
    init:function(){
        this._super();
        
        var winsize = cc.director.getWinSize();
        var centerpos = cc.p(winsize.width / 2, winsize.height / 2);
        
       //cc.log("rpi logo");
        
        // Display an image
        var RpiFlag = new cc.Sprite ( res.RpiMono_png);
        RpiFlag.setPosition(centerpos);
        this.addChild( RpiFlag);
        
        //cc.log("Got to Rpi Scene!");
        
        // Transition to the next scene.
        var NextScene = new TeamLogoScene();
        var TransitionScene = new cc.TransitionFade(2, NextScene, cc.Color(0,0,0,1));
        cc.director.runScene(TransitionScene);
        
        return true;
    }
});

var EnterWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new RpiLogoLayer();
        layer.init();
        this.addChild(layer);
    }
});

var TeamLogoLayer = cc.Layer.extend({
    ctor : function () {
        this._super();
    },
    init : function () {
        this._super();
        
        var winsize = cc.director.getWinSize();
        var centerpos = cc.p(winsize.width / 2, winsize.height / 2);
        
       //cc.log("Team Logo Layer");
        
        // Display an image
        var TeamLogo = new cc.Sprite ( res.CompassLogo_png);
        TeamLogo.setPosition(centerpos);
        this.addChild( TeamLogo);
        
        // Wait until the transition into this scene is over, then transition to the next.
        this.scheduleOnce( this.DoTransitionToGame, 2.5);
        //cc.log("Got To Logo Scene!");
        return true;
    },
    DoTransitionToGame : function() {
        //cc.log("Ran CallBack");
        var NNextScene = new GameScene();
        NNextScene.setScene("MenuIntro");
        //var NTransitionScene = new cc.TransitionFade(2, NNextScene, cc.Color(0,0,0,1));
        cc.director.runScene(NNextScene);
        return true;
    }
});

var TeamLogoScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        
       //cc.log("Team Logo Scene");
        var layer = new TeamLogoLayer();
        layer.init();
        this.addChild(layer);
    }
});

var startLayer = cc.Layer.extend({
    ctor : function () {
        this._super();
       //cc.log("construct layer");
        
        //var randomthinglookatthisname = new inputRead();
        //this.addChild(randomthinglookatthisname);
        
        if (cc.sys.capabilities.hasOwnProperty('keyboard'))
        {
            cc.eventManager.addListener(
                cc.EventListener.create({
                    event: cc.EventListener.KEYBOARD,
                    onKeyPressed: this.onKeyPressed.bind(this),
                    onKeyReleased: this.onKeyReleased.bind(this)
                }),
            this );
        }
        
        //cc.log (" added event manager");
    },
    onKeyReleased: function (key, event) {
        if (key == cc.KEY.enter) {this.leave();}
        return false;
    },
    onKeyPressed: function (key, event) {return false;},
    init : function (gameScene, token) {
        
        //cc.log ("start layer");
        
        var winsize = cc.director.getWinSize();
        var centerpos = cc.p(winsize.width / 2, winsize.height / 2);
        
        // Display an image
        var TeamLogo = new cc.Sprite ( res.pressStart_png);
        TeamLogo.setPosition(centerpos);
        this.addChild( TeamLogo);
        
        this.destinationToken = token;
        this.gameScene = gameScene;
    },
    leave : function () {
        this.gameScene.setScene( this.destinationToken);
        cc.director.popScene();
    }
});

var startScene = cc.Scene.extend({
    onEnter : function () {
        this._super();
        //cc.log ("start scene entered");
        return true;
    },
    init : function (gameScene, token) {
        //cc.log ("start scene initialized");
        this.StartLayer = new startLayer();
        this.StartLayer.init(gameScene, token);
        this.addChild(this.StartLayer);
    }
});

var endLayer = cc.Layer.extend({
    ctor : function () {
        this._super();
        var winsize = cc.director.getWinSize();
        var centerpos = cc.p(winsize.width / 2, winsize.height / 2);
        
        // Display an image
        var endImg = new cc.Sprite ( res.cs_round4_3_png);
        endImg.setPosition(centerpos);
        this.addChild( endImg);
    }
});


var endScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new endLayer();
        layer.init();
        this.addChild(layer);
    }
});