var RpiLayer = cc.Layer.extend({
    ctor:function() {
        this._super();
    },
    init:function(){
        this._super();
        
        var winsize = cc.director.getWinSize();
        var centerpos = cc.p(winsize.width / 2, winsize.height / 2);
        
        // Display an image
        var RpiFlag = new cc.Sprite ( res.RpiMono_png);
        RpiFlag.setPosition(centerpos);
        this.addChild( RpiFlag);
        
        //cc.log("Got to Rpi Scene!");
        
        // Transition to the next scene.
        var NextScene = new LogoScene();
        var TransitionScene = new cc.TransitionFade(2, NextScene, cc.Color(0,0,0,1));
        cc.director.runScene(TransitionScene);
        
        return true;
    }
});

var EnterWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new RpiLayer();
        layer.init();
        this.addChild(layer);
    }
});

var TeamLayer = cc.Layer.extend({
    ctor : function () {
        this._super();
    },
    init : function () {
        this._super();
        
        var winsize = cc.director.getWinSize();
        var centerpos = cc.p(winsize.width / 2, winsize.height / 2);
        
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
        NNextScene.setScene("Level1");
        var NTransitionScene = new cc.TransitionFade(2, NNextScene, cc.Color(0,0,0,1));
        cc.director.runScene(NTransitionScene);
        return true;
    }
});

var LogoScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        
        var layer = new TeamLayer();
        layer.init();
        this.addChild(layer);
    }
});