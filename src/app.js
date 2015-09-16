var RpiLayer = cc.Layer.extend({
    ctor:function() {
        this._super();
    },
    init:function(){
        this._super();
        
        var winsize = cc.director.getWinSize();
        var centerpos = cc.p(winsize.width / 2, winsize.height / 2);
        
        var RpiFlag = new cc.Sprite ( res.RpiMono_png);
        RpiFlag.setPosition(centerpos);
        this.addChild( RpiFlag);
        
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
    ctor:function() {
        this._super();
    },
    init:function(){
        this._super();
        
        var winsize = cc.director.getWinSize();
        var centerpos = cc.p(winsize.width / 2, winsize.height / 2);
        
        var TeamLogo = new cc.Sprite ( res.CompassLogo_png);
        TeamLogo.setPosition(centerpos);
        this.addChild( TeamLogo);
        
        //var NextScene = new GamePlayScene();
        //var TransitionScene = new cc.TransitionFade(2, NextScene, cc.Color(0,0,0,1));
        //cc.director.runScene(TransitionScene);
        
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