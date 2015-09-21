var playCutScene = cc.Scene.extend({
    onEnter : function () {
        this._super();
    },
    init : function ( GameScene, destinationtoken, imgList ) {
        this.gameScene = GameScene;
        this.destinationToken = destinationtoken;
        cc.log("entered cutscene");
    },
    leave : function ( ) {
        this.gameScene.setScene( this.destinationToken);
        cc.director.popScene();
        cc.log("left cutscene");
    }
});