/**
 * @version 1.0.0
 * @author FloodItBot.Web
 * @compiler Bridge.NET 17.6.0
 */
Bridge.assembly("FloodItBot.Web", function ($asm, globals) {
    "use strict";

    Bridge.define("Platformer2D.App", {
        main: function Main () {
            var canvas = document.createElement("canvas");
            canvas.width = 800;
            canvas.height = 480;
            canvas.id = "monogamecanvas";
            document.body.appendChild(canvas);

            document.body.appendChild(document.createElement("br"));

            var can = document.createElement("canvas");
            can.width = 800;
            can.height = 1024;
            document.body.appendChild(can);

            Platformer2D.App.game = new FloodItBot.Base.Game1();
            Platformer2D.App.game.Run();
        },
        statics: {
            fields: {
                game: null
            }
        }
    });
});
