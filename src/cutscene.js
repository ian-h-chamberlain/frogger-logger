var displayLayer = cc.Layer.extend({
    ctor : function () {
        this._super();
        
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
        
        return true;
    },
    onKeyReleased: function (key, event) {
        if (key == cc.KEY.enter) {this.nextFrame();}
        return false;
    },
    onKeyPressed: function (key, event) {return false;},
    init : function (GameScene, destinationtoken, imgList) {
        this.gameScene = GameScene;
        this.destinationToken = destinationtoken;
        
        var winsize = cc.director.getWinSize();
        var centerpos = cc.p(winsize.width / 2, winsize.height / 2);
        
        this.frametime = 5;
        this.currentframe = 0;
        
        this.Frames = [];
        //cc.log("imgList Length: " + imgList.length);
        for (var imgIndex = 0; imgIndex < imgList.length; imgIndex++)
        {
            //cc.log(imgIndex +" < "+ imgList.length);
            //cc.log("Loop index: " + imgIndex);
            this.Frames.push(new cc.Sprite (imgList[imgIndex]));
            this.Frames[imgIndex].setPosition(centerpos);
            this.Frames[imgIndex].setOpacity(0);
            this.addChild( this.Frames[imgIndex]);
        }
        //cc.log("Frames Length: " + this.Frames.length);
        
        this.Frames[0].setOpacity(255);
        this.schedule( this.nextFrame, this.frametime, this.Frames.length, this.frametime);
        this.resume();
        return true;
    },
    nextFrame : function ( dt) {
        this.currentframe++;
        //cc.log(this.currentframe+" < "+this.Frames.length);
        if (this.currentframe < this.Frames.length)
        {
            this.Frames[this.currentframe].setOpacity(255); 
        }
        else
        {
            this.unschedule(this.nextFrame) 
            this.leave();
        }
        return true;
    },
    leave : function ( ) {
        //cc.log("left cutscene");
        this.gameScene.setScene( this.destinationToken);
        cc.director.popScene();
        return true;
    }
});

var playCutScene = cc.Scene.extend({
    onEnter : function () {
        this._super();
        return true;
    },
    init : function ( GameScene, destinationtoken, imgList ) {
        //cc.log("playcutscene");
        
        this.DisplayLayer = new displayLayer();
        this.DisplayLayer.init(GameScene, destinationtoken, imgList);
        this.addChild(this.DisplayLayer);
        
        return true;
    }
});