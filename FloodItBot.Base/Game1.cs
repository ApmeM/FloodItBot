namespace FloodItBot.Base
{
    #region Using Directives

    using System.Collections;
    using System.Collections.Generic;
    using System.Threading;

    using Microsoft.Xna.Framework.Graphics;

    using MyONez.AdditionalContent.Scenes;
    using FloodItBot.Base.Screens;

    using MyONez;
    using MyONez.AdditionalContent.FaceUI.Utils;

    #endregion

    /// <summary>
    ///     This is the main type for your game.
    /// </summary>
    public class Game1 : Core
    {
        public Game1()
            : base(650, 800)
        {
            this.Window.AllowUserResizing = true;
        }

        protected override void Initialize()
        {
            base.Initialize();
            Instance.SwitchScene(new LoadingScene<GameChooseScene>(new List<LoadingData>
            {
                new LoadingData
                {
                    Count = 4,
                    Enumerator = MultiplayerScene.GetEnumerator(this.Content)
                },
                new LoadingData
                {
                    Count = 4,
                    Enumerator = SingleplayerScene.GetEnumerator(this.Content)
                },
                new LoadingData
                {
                    Count = 47,
                    Enumerator = GeonBitUIResources.GetEnumerator(this.Content, "hd")
                },
            }, 1200, 600));
        }
    }
}