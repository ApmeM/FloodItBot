namespace FloodItBot.Base.Screens
{
    #region Using Directives

    using FaceUI.Entities;

    using Microsoft.Xna.Framework;

    using MyONez.ECS;
    using MyONez.Graphics.Renderers;
    using MyONez.Graphics.ResolutionPolicy;
    using MyONez;
    using MyONez.AdditionalContent.FaceUI.ECS.Components;
    using MyONez.AdditionalContent.FaceUI.ECS.EntitySystems;

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