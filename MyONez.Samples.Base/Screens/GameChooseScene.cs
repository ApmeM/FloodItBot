namespace MyONez.Samples.Base.Screens
{
    #region Using Directives

    using System.Collections.Generic;

    using BrainAI.AI.FSM;
    using BrainAI.ECS.Components;
    using BrainAI.ECS.EntitySystems;

    using GeonBit.UI.ECS.Components;
    using GeonBit.UI.ECS.EntitySystems;
    using GeonBit.UI.Entities;

    using Microsoft.Xna.Framework;
    using Microsoft.Xna.Framework.Graphics;

    using MyONez.ECS;
    using MyONez.ECS.Components;
    using MyONez.Graphics.Renderers;
    using MyONez.Graphics.ResolutionPolicy;
    using MyONez.Samples.Base.AI;
    using MyONez.Samples.Base.Components;
    using MyONez.Samples.Base.Systems;

    using Random = MyONez.Maths.Random;

    #endregion

    public class GameChooseScene : Scene
    {
        public static int AvailableTurns = (int)(SharedData.MapSize * 1.65);

        public GameChooseScene()
        {
            this.SetDesignResolution(1200, 600, SceneResolutionPolicy.None);
            Core.Instance.Screen.SetSize(1200, 600);

            this.AddRenderer(new DefaultRenderer());

            this.AddEntitySystem(new UIUpdateSystem(Core.Instance.Content));
            
            var uiEntity = this.CreateEntity("UI");
            var ui = uiEntity.AddComponent<UIComponent>();
            ui.UserInterface.ShowCursor = false;

            var panel = new Panel(new Vector2(500, 500));

            panel.AddChild(new Button("Single player")).OnClick =
                (b) => Core.Instance.SwitchScene(new SingleplayerScene());
            panel.AddChild(new Button("Multi player")).OnClick =
                (b) => Core.Instance.SwitchScene(new MultiplayerScene());
            ui.UserInterface.AddEntity(panel);
        }
    }
}