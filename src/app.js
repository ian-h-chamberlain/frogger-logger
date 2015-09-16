// a scene for testing logs – need not be included in final project
var LogScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new LogLayer();
        this.addChild(layer);
    }
});