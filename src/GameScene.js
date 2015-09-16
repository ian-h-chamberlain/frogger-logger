var TestLayer = new cc.Layer.extend({
    ctor:function() {
        this._super();
    },
    init:function(){
        this._super();
        cc.log("in logo scene");
        return true;
    }
});

var GamePlayScene = new cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new TestLayer();
        layer.init();
        this.addChild(layer);
    }
});