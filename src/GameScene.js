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
    init : function () {
        this._super();
        
        var winsize = cc.director.getWinSize();
        var centerpos = cc.p(winsize.width / 2, winsize.height / 2);
        
        this.Timer = 90;
        this.LabelTime = new cc.LabelTTF("Time: "+ this.Timer.toPrecision(2), "Arial", 32, new cc.Size(256, 64));
        this.LabelTime.setHorizontalAlignment( cc.TEXT_ALIGN_LEFT);
        this.LabelTime.setPosition( cc.p( 128, winsize.height - 48));
        this.LabelTime.setColor( new cc.Color(0,0,0));
        this.addChild( this.LabelTime);
        
        this.Level = 1;
        this.LabelLevel = new cc.LabelTTF("Level: "+this.Level, "Arial", 32, new cc.Size(256, 64));
        this.LabelLevel.setHorizontalAlignment( cc.TEXT_ALIGN_LEFT);
        this.LabelLevel.setPosition( cc.p( 128, winsize.height - 80));
        this.LabelLevel.setColor( new cc.Color(0,0,0));
        this.addChild( this.LabelLevel);
        
        this.Score = 100;
        // TODO: Why doesn't right align work here?
        this.LabelScore = new cc.LabelTTF( "Score: "+this.Score, "Arial", 32, new cc.Size( 196, 64));
        this.LabelScore.setHorizontalAlignment( cc.TEXT_ALIGN_RIGHT);
        this.LabelScore.setPosition(cc.p( winsize.width - 196/2, winsize.height - 80));
        this.LabelScore.setColor( new cc.Color( 0, 0, 0));
        this.addChild( this.LabelScore);
        
        this.scheduleUpdate();
        
        var Input = new inputRead();
        this.addChild(Input);
        
        return true;
    },
    update : function (dt) {
        this.Timer -= dt;
        this.LabelTime.setString("Time: "+ this.Timer.toPrecision(2));
        return true;
    }
});

var inputRead = cc.Node.extend({
    ctor : function () {
        this._super();
        if (cc.sys.capabilities.hasOwnProperty('keyboard'))
        {
            cc.eventManager.addListener(
                cc.EventListener.create({
                    event: cc.EventListener.KEYBOARD,
                    onKeyPressed: this.onKeyPressed,
                    onKeyReleased: this.onKeyReleased
                }),
            this );
        }
    },
    onKeyPressed : function (key, event) {
        switch (key) {
        case cc.KEY.a : {cc.log("A");} break; 
        case cc.KEY.s : {cc.log("S");} break;
        case cc.KEY.w : {cc.log("W");} break;
        case cc.KEY.d : {cc.log("D");} break;
        case cc.KEY.shift : {cc.log("SHIFT");} break;
        default : {cc.log(key)} break;
        }
    },
    onKeyReleased : function (key, event) {
        switch (key) {
        case cc.KEY.a : {cc.log("A-");} break;
        case cc.KEY.s : {cc.log("S-");} break;
        case cc.KEY.w : {cc.log("W-");} break;
        case cc.KEY.d : {cc.log("D-");} break;
        case cc.KEY.shift : {cc.log("SHIFT-");} break;
        default : {cc.log(key)} break;
        }
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
        var layer = new LogLayer();
        this.addChild(layer);
        
        // Environment
        var EnvLayer = new environmentLayer();
        EnvLayer.init();
        this.addChild(EnvLayer);
        
        // Gui
        var GuiLayer = new guiLayer();
        GuiLayer.init();
        this.addChild(GuiLayer);

        // Saws
        var sawLayer = new SawLayer();
        sawLayer.init();
        this.addChild(sawLayer);
    }
});