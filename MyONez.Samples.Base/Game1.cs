namespace MyONez.Samples.Base
{
    #region Using Directives

    using System.Collections;
    using System.Collections.Generic;
    using System.Threading;

    using GeonBit.UI.Utils;

    using Microsoft.Xna.Framework.Graphics;

    using MyONez.AdditionalContent.Scenes;
    using MyONez.Samples.Base.Screens;

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
            Instance.SwitchScene(new LoadingScene<BasicScene>(new List<LoadingData>
            {
                new LoadingData
                {
                    Count = 4,
                    Enumerator = BasicScene.GetEnumerator(this.Content)
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