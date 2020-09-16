namespace MyONez.Samples.Base.Screens
{
    #region Using Directives

    using BrainAI.AI.FSM;
    using BrainAI.ECS.Components;
    using BrainAI.ECS.EntitySystems;

    using GeonBit.UI.ECS.Components;
    using GeonBit.UI.ECS.EntitySystems;
    using GeonBit.UI.Entities;
    using GeonBit.UI.Utils;

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

    public class BasicScene : Scene
    {
        public const int BlockSize = 20;

        public const int MapSize = 30;

        public BasicScene()
        {
            this.SetDesignResolution(600, 800, SceneResolutionPolicy.None);
            Core.Instance.Screen.SetSize(600, 800);

            this.AddRenderer(new DefaultRenderer());

            this.AddEntitySystem(new FieldMeshGeneratorSystem());
            this.AddEntitySystem(new FieldClickUpdateSystem(this));
            this.AddEntitySystem(new ApplyTurnUpdateSystem(this));
            this.AddEntitySystem(new CounterToTextUpdateSystem());
            this.AddEntitySystem(new GameOverUpdateSystem(this));
            this.AddEntitySystem(new TextUIUpdateSystem());
            this.AddEntitySystem(new AIUpdateSystem());
            this.AddEntitySystem(new UIUpdateSystem(Core.Instance.Content));
            this.AddEntitySystem(new TurnSelectorUpdateSystem());

            this.AddEntitySystemExecutionOrder<AIUpdateSystem, TurnSelectorUpdateSystem>();
            this.AddEntitySystemExecutionOrder<FieldClickUpdateSystem, TurnSelectorUpdateSystem>();
            this.AddEntitySystemExecutionOrder<TurnSelectorUpdateSystem, ApplyTurnUpdateSystem>();
            this.AddEntitySystemExecutionOrder<ApplyTurnUpdateSystem, FieldMeshGeneratorSystem>();
            this.AddEntitySystemExecutionOrder<ApplyTurnUpdateSystem, GameOverUpdateSystem>();
            this.AddEntitySystemExecutionOrder<ApplyTurnUpdateSystem, CounterToTextUpdateSystem>();
            this.AddEntitySystemExecutionOrder<CounterToTextUpdateSystem, GameOverUpdateSystem>();
            this.AddEntitySystemExecutionOrder<CounterToTextUpdateSystem, TextUIUpdateSystem>();
            this.AddEntitySystemExecutionOrder<UIUpdateSystem, TextUIUpdateSystem>();

            var moonTex = this.Content.Load<Texture2D>(ContentPaths.Basic.moon);

            var fieldEntity = this.CreateEntity("Field");
            fieldEntity.AddComponent<PositionComponent>().Position = Core.Instance.Screen.Center - Vector2.One * MapSize * BlockSize / 2;
            fieldEntity.AddComponent<TurnMadeComponent>();
            fieldEntity.AddComponent(new CameraShakeComponent(this.Camera));
            var field = fieldEntity.AddComponent<FieldComponent>();
            field.Map = new int[MapSize, MapSize];
            field.Texture = moonTex;

            var player1 = this.CreateEntity("Player1");
            var player1Turn = player1.AddComponent<TurnMadeComponent>();
            player1Turn.Player = 0;
            player1Turn.TurnMade = false;
            player1.AddComponent<AIComponent>().AIBot = new StateMachine<int[,]>(field.Map, new GreedyFloodItAI(player1Turn));

            var player2 = this.CreateEntity("Player2");
            var player2Turn = player2.AddComponent<TurnMadeComponent>();
            player2Turn.Player = 1;
            player2Turn.TurnMade = true;
            player2.AddComponent<InputMouseComponent>();

            fieldEntity.AddComponent(new PlayerSwitcherComponent
            {
                Player1 = player1Turn,
                Player2 = player2Turn
            });
            
            var counterEntity = this.CreateEntity("Counter");
            var counter = counterEntity.AddComponent<CounterComponent>();
            counterEntity.AddComponent<TextComponent>().Text = "Test text;";
            counterEntity.AddComponent<ColorComponent>().Color = Color.Gray;

            var help = this.CreateEntity("Help");
            var ui = help.AddComponent<UIComponent>();
            ui.UserInterface.ShowCursor = false;
            ui.UserInterface.AddEntity(
                new Button("?", ButtonSkin.Default, Anchor.TopRight, Vector2.One * 50)
                {
                    OnClick = (b) => { MessageBox.ShowMsgBox("Help", "Turn base flood it game.\n AIBot start in top left corner. \nYou start in bottom right corner. \nEach turn you select a color to flood your corner with by clicking on a colored cell on a field. \nIf any player reach size more then half of a field - game is over."); }
                });

            this.Restart(field, counter);
        }

        public void Restart(FieldComponent field, CounterComponent counter)
        {
            for (var x = 0; x < field.Map.GetLength(0); x++)
            for (var y = 0; y < field.Map.GetLength(1); y++)
            {
                field.Map[x, y] = Random.NextInt(field.ColorCount);
            }

            counter.GameOver = false;
            counter.Player1Size = 1;
            counter.Player2Size = 1;
        }
    }
}