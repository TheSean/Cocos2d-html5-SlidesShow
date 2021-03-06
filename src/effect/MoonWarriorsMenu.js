cc.dumpConfig();

var MoonWarriorsSysMenu = cc.Layer.extend({
    _ship:null,

    ctor:function () {
        cc.associateWithNative( this, cc.Layer );
    },
    init:function () {
        var bRet = false;
        if (this._super()) {
            winSize = cc.size(320, 480);//cc.Director.getInstance().getWinSize();
            var iphone4base = cc.Sprite.create(s_iphone4base);
            this.addChild(iphone4base,0);
            iphone4base.setPosition(cc.p(-30, -127));
            iphone4base.ignoreAnchorPointForPosition(true);

            var sp = cc.Sprite.create(s_loading);
            sp.setAnchorPoint(cc.p(0,0));
            this.addChild(sp, 0, 1);



            var iphone4reflect = cc.Sprite.create(s_iphone4reflect);
            this.addChild(iphone4reflect,11)
            iphone4reflect.setPosition(cc.p(-30, -127));
            iphone4reflect.ignoreAnchorPointForPosition(true);

            var logo = cc.Sprite.create(s_logo);
            logo.setAnchorPoint(cc.p(0, 0));
            logo.setPosition(cc.p(0, 250));
            this.addChild(logo, 10, 1);

            var newGameNormal = cc.Sprite.create(s_menu, cc.rect(0, 0, 126, 33));
            var newGameSelected = cc.Sprite.create(s_menu, cc.rect(0, 33, 126, 33));
            var newGameDisabled = cc.Sprite.create(s_menu, cc.rect(0, 33 * 2, 126, 33));

            var gameSettingsNormal = cc.Sprite.create(s_menu, cc.rect(126, 0, 126, 33));
            var gameSettingsSelected = cc.Sprite.create(s_menu, cc.rect(126, 33, 126, 33));
            var gameSettingsDisabled = cc.Sprite.create(s_menu, cc.rect(126, 33 * 2, 126, 33));

            var aboutNormal = cc.Sprite.create(s_menu, cc.rect(252, 0, 126, 33));
            var aboutSelected = cc.Sprite.create(s_menu, cc.rect(252, 33, 126, 33));
            var aboutDisabled = cc.Sprite.create(s_menu, cc.rect(252, 33 * 2, 126, 33));

            var newGame = cc.MenuItemSprite.create(newGameNormal, newGameSelected, newGameDisabled, this, function () {
                this.onButtonEffect();
                flareEffect(this, this, this.onNewGame);
            });
            var gameSettings = cc.MenuItemSprite.create(gameSettingsNormal, gameSettingsSelected, gameSettingsDisabled, this, this.onSettings);
            var about = cc.MenuItemSprite.create(aboutNormal, aboutSelected, aboutDisabled, this, this.onAbout);

            var menu = cc.Menu.create(newGame, gameSettings, about);
            menu.alignItemsVerticallyWithPadding(10);
            this.addChild(menu, 1, 2);
            menu.setPosition(cc.p(winSize.width / 2, winSize.height / 2 - 80));
            this.schedule(this.update, 0.1);

           var tmp = cc.TextureCache.getInstance().addImage(s_ship01);
            this._ship = cc.Sprite.createWithTexture(tmp,cc.rect(0, 45, 60, 38));
            this.addChild(this._ship, 0, 4);
            this._ship.setPosition(cc.p(Math.random() * winSize.width, 0));
            this._ship.runAction(cc.MoveBy.create(2, cc.p(Math.random() * winSize.width, this._ship.getPosition().y + winSize.height + 100)));

            if (true) {     //MW.SOUND
                //cc.AudioEngine.getInstance().setBackgroundMusicVolume(0.7);
                //cc.AudioEngine.getInstance().playBackgroundMusic(s_mainMainMusic, true);
            }

            bRet = true;
        }
        return bRet;
    },
    onNewGame:function (pSender) {
        //var scene = cc.Scene.create();
        //scene.addChild(GameLayer.create());
        //scene.addChild(GameControlMenu.create());
        //cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
        //cc.AudioEngine.getInstance().stopBackgroundMusic(false);
    },
    onSettings:function (pSender) {
        this.onButtonEffect();
        //var scene = cc.Scene.create();
        //scene.addChild(SettingsLayer.create());
        //cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    },
    onAbout:function (pSender) {
        this.onButtonEffect();
        //var scene = cc.Scene.create();
        //scene.addChild(AboutLayer.create());
        //cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    },
    update:function () {
        if (this._ship.getPosition().y > 480) {
            this._ship.setPosition( cc.p(Math.random() * winSize.width, 10));
            this._ship.runAction( cc.MoveBy.create(
                parseInt(5 * Math.random(), 10),
                cc.p(Math.random() * winSize.width, this._ship.getPosition().y + 480)));
        }
    },
    onButtonEffect:function(){
        if (true) {   //MW.SOUND
            var s = cc.AudioEngine.getInstance().playEffect(s_buttonEffect);
        }
    }
});

MoonWarriorsSysMenu.create = function () {
    var sg = new MoonWarriorsSysMenu();
    if (sg && sg.init()) {
        sg.ignoreAnchorPointForPosition(true);
        return sg;
    }
    return null;
};


