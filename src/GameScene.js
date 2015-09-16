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
        
        // The river's bank at the bottom of the screen.
        var bottomBank = new cc.Sprite (res.BottomBank_png);
        bottomBank.setPosition( centerpos.x, 64);
        this.addChild( bottomBank);
        
        // The town at the top of the screen
        var town = new cc.Sprite (res.CityTest_png);
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
    init : function () {
        this._super();
        
        
        
        return true;
    },
    update : function () {
        
        return true;
    }
});

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        // Make the level blue
        var blueBackground = cc.LayerColor.create( new cc.Color(0,0,196,255));
        blueBackground.setPosition(0,0);
        this.addChild(blueBackground);
        
        // Draw the game
        // This will probably end up being multiple layers.
        //var layer = new GameLayer();
        //layer.init();
        //this.addChild(layer);
        
        // Environment
        var EnvLayer = new environmentLayer();
        EnvLayer.init();
        this.addChild(EnvLayer);
        
        // Gui
    }
});