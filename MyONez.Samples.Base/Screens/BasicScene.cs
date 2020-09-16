namespace MyONez.Samples.Base.Screens
{
    #region Using Directives

    using BrainAI.AI.FSM;
    using BrainAI.ECS.Components;
    using BrainAI.ECS.EntitySystems;

    using GeonBit.UI.ECS.Components;
    using GeonBit.UI.ECS.EntitySystems;

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

        public const int GameSpeed = 5;

        private const int MapSize = 30;

        public const int AvailableTurns = (int)(MapSize * 1.65);

        public BasicScene()
        {
            this.SetDesignResolution(720, 720, SceneResolutionPolicy.None);
            Core.Instance.Screen.SetSize(720, 720);

            this.AddRenderer(new DefaultRenderer());

            this.AddEntitySystem(new FieldMeshGeneratorSystem());
            this.AddEntitySystem(new FieldClickUpdateSystem());
            this.AddEntitySystem(new ApplyTurnUpdateSystem(this));
            this.AddEntitySystem(new CounterToTextUpdateSystem());
            this.AddEntitySystem(new GameOverUpdateSystem(this));
            this.AddEntitySystem(new TextUIUpdateSystem());
            this.AddEntitySystem(new AIUpdateSystem());
            this.AddEntitySystem(new UIUpdateSystem(Core.Instance.Content));

            this.AddEntitySystemExecutionOrder<AIUpdateSystem, ApplyTurnUpdateSystem>();
            this.AddEntitySystemExecutionOrder<FieldClickUpdateSystem, ApplyTurnUpdateSystem>();
            this.AddEntitySystemExecutionOrder<ApplyTurnUpdateSystem, FieldMeshGeneratorSystem>();
            this.AddEntitySystemExecutionOrder<ApplyTurnUpdateSystem, GameOverUpdateSystem>();
            this.AddEntitySystemExecutionOrder<ApplyTurnUpdateSystem, CounterToTextUpdateSystem>();
            this.AddEntitySystemExecutionOrder<CounterToTextUpdateSystem, GameOverUpdateSystem>();
            this.AddEntitySystemExecutionOrder<CounterToTextUpdateSystem, TextUIUpdateSystem>();
            this.AddEntitySystemExecutionOrder<UIUpdateSystem, TextUIUpdateSystem>();

            var moonTex = this.Content.Load<Texture2D>(ContentPaths.Basic.moon);

            var fieldEntity = this.CreateEntity("Field");
            fieldEntity.AddComponent<PositionComponent>().Position = Core.Instance.Screen.Center - Vector2.One * MapSize * BlockSize / 2;
            fieldEntity.AddComponent<InputMouseComponent>();
            var turn = fieldEntity.AddComponent<TurnMadeComponent>();
            var field = fieldEntity.AddComponent<FieldComponent>();
            field.Map = new int[MapSize, MapSize];
            field.Texture = moonTex;
            fieldEntity.AddComponent<AIComponent>().AIBot = new StateMachine<int[,]>(field.Map, new GreedyFloodItAI(turn));

            var counterEntity = this.CreateEntity("Counter");
            var counter = counterEntity.AddComponent<CounterComponent>();
            counterEntity.AddComponent<TextComponent>().Text = "Test text;";
            counterEntity.AddComponent<ColorComponent>().Color = Color.Gray;

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
            counter.Count = 0;
        }
    }
}