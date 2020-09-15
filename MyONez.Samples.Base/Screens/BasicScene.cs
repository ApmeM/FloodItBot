namespace MyONez.Samples.Base.Screens
{
    #region Using Directives

    using System;
    using System.Collections.Generic;

    using BrainAI.AI.FSM;
    using BrainAI.ECS.Components;
    using BrainAI.ECS.EntitySystems;

    using GeonBit.UI.ECS.Components;
    using GeonBit.UI.ECS.EntitySystems;

    using LocomotorECS;
    using LocomotorECS.Matching;

    using Microsoft.Xna.Framework;
    using Microsoft.Xna.Framework.Graphics;

    using MyONez.AdditionalContent.SceneTransitions;
    using MyONez.ECS;
    using MyONez.ECS.Components;
    using MyONez.Graphics;
    using MyONez.Graphics.Renderers;
    using MyONez.Graphics.ResolutionPolicy;
    using MyONez.Maths;

    using Entity = LocomotorECS.Entity;
    using Random = MyONez.Maths.Random;

    #endregion

    public class BasicScene : Scene
    {
        public const int BlockSize = 20;

        public const int GameSpeed = 50;

        public const int MapSize = 30;

        public BasicScene()
        {
            this.SetDesignResolution(720, 720, SceneResolutionPolicy.None);
            Core.Instance.Screen.SetSize(720, 720);

            this.AddRenderer(new DefaultRenderer());

            this.AddEntitySystem(new FieldMeshGeneratorSystem());
            this.AddEntitySystem(new FieldClickUpdateSystem());
            this.AddEntitySystem(new TurnUpdateSystem(this));
            this.AddEntitySystem(new UpdateCounterUpdateSystem());
            this.AddEntitySystem(new GameOverUpdateSystem(this));
            this.AddEntitySystem(new TextUIUpdateSystem());
            this.AddEntitySystem(new AIUpdateSystem());
            this.AddEntitySystem(new UIUpdateSystem(Core.Instance.Content));

            this.AddEntitySystemExecutionOrder<AIUpdateSystem, TurnUpdateSystem>();
            this.AddEntitySystemExecutionOrder<FieldClickUpdateSystem, TurnUpdateSystem>();
            this.AddEntitySystemExecutionOrder<TurnUpdateSystem, FieldMeshGeneratorSystem>();
            this.AddEntitySystemExecutionOrder<TurnUpdateSystem, GameOverUpdateSystem>();
            this.AddEntitySystemExecutionOrder<TurnUpdateSystem, UpdateCounterUpdateSystem>();
            this.AddEntitySystemExecutionOrder<UpdateCounterUpdateSystem, GameOverUpdateSystem>();
            this.AddEntitySystemExecutionOrder<UpdateCounterUpdateSystem, TextUIUpdateSystem>();
            this.AddEntitySystemExecutionOrder<UIUpdateSystem, TextUIUpdateSystem>();

            var fieldEntity = this.CreateEntity("player");
            fieldEntity.AddComponent<PositionComponent>().Position = Core.Instance.Screen.Center - Vector2.One * MapSize * BlockSize / 2;
            fieldEntity.AddComponent<InputMouseComponent>();
            var turn = fieldEntity.AddComponent<TurnMadeComponent>();
            var field = fieldEntity.AddComponent<FieldComponent>();
            field.Map = new int[MapSize, MapSize];
            fieldEntity.AddComponent<AIComponent>().AIBot = new StateMachine<int[,]>(field.Map, new FloodItAI(turn));

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

    /// <summary>
    /// Statistic 90%
    /// </summary>
    public class FloodItAI : State<int[,]>
    {
        private readonly TurnMadeComponent turn;

        public FloodItAI(TurnMadeComponent turn)
        {
            this.turn = turn;
        }

        private int delay;
        private int[,] copyArray;

        public override void Update()
        {
            this.delay++;
            if (this.delay < BasicScene.GameSpeed)
            {
                return;
            }

            var maxValue = 0;
            var maxColor = 0;

            for (var i = 0; i < 5; i++)
            {
                this.copyArray = this.copyArray ?? new int[this.Context.GetLength(0), this.Context.GetLength(1)];
                Array.Copy(this.Context, this.copyArray, this.Context.Length);
                this.FloodIt(this.copyArray, i);
                var value = this.Calc(this.copyArray);
                if(maxValue < value)
                {
                    maxValue = value;
                    maxColor = i;
                }
            }

            this.delay = 0;
            for (var x = 0; x < this.Context.GetLength(0); x++)
            for (var y = 0; y < this.Context.GetLength(1); y++)
            {
                if (maxColor != this.Context[x, y])
                {
                    continue;
                }

                this.turn.X = x;
                this.turn.Y = y;
                return;
            }
        }

        private int Calc(int[,] map)
        {
            var color = map[0, 0];

            var result = 0;

            var frontier = new Queue<Point>();
            frontier.Enqueue(new Point(0, 0));

            var visited = new HashSet<Point>();

            while (frontier.Count > 0)
            {
                var current = frontier.Dequeue();

                foreach (var next in this.GetNeighbors(current))
                {
                    if (!this.IsInMap(map, next))
                    {
                        continue;
                    }

                    if (map[next.X, next.Y] != color)
                    {
                        continue;
                    }

                    if (!visited.Contains(next))
                    {
                        frontier.Enqueue(next);
                        visited.Add(next);
                        result++;
                    }
                }
            }

            return result;
        }

        private void FloodIt(int[,] map, int floodColor)
        {
            var color = map[0, 0];

            var frontier = new Queue<Point>();
            frontier.Enqueue(new Point(0, 0));

            var visited = new HashSet<Point>();

            while (frontier.Count > 0)
            {
                var current = frontier.Dequeue();
                map[current.X, current.Y] = floodColor;

                foreach (var next in this.GetNeighbors(current))
                {
                    if (!this.IsInMap(map, next))
                    {
                        continue;
                    }

                    if (map[next.X, next.Y] != color)
                    {
                        continue;
                    }

                    if (!visited.Contains(next))
                    {
                        frontier.Enqueue(next);
                        visited.Add(next);
                    }
                }
            }
        }


        private bool IsInMap(int[,] map, Point next)
        {
            return next.X >= 0 && next.Y >= 0 && next.X < map.GetLength(0) && next.Y < map.GetLength(1);
        }

        private IEnumerable<Point> GetNeighbors(Point current)
        {
            yield return new Point(current.X - 1, current.Y);
            yield return new Point(current.X + 1, current.Y);
            yield return new Point(current.X, current.Y - 1);
            yield return new Point(current.X, current.Y + 1);
        }
    }

    /// <summary>
    /// Statistic 22%
    /// </summary>
    public class LineFloodItAI : State<int[,]>
    {
        private readonly TurnMadeComponent turn;

        public LineFloodItAI(TurnMadeComponent turn)
        {
            this.turn = turn;
        }

        private int delay;

        public override void Update()
        {
            this.delay++;
            if (this.delay < BasicScene.GameSpeed)
            {
                return;
            }

            this.delay = 0;
            var color = this.Context[0, 0];
            for (var x = 0; x < this.Context.GetLength(0); x++)
            for (var y = 0; y < this.Context.GetLength(1); y++)
            {
                if (color == this.Context[x, y])
                {
                    continue;
                }

                this.turn.X = x;
                this.turn.Y = y;
                return;
            }
        }
    }

    /// <summary>
    /// Statistic 0%
    /// </summary>
    public class RandomFloodItAI : State<int[,]>
    {
        private readonly TurnMadeComponent turn;

        public RandomFloodItAI(TurnMadeComponent turn)
        {
            this.turn = turn;
        }

        private int delay;

        public override void Update()
        {
            this.delay++;
            if (this.delay < BasicScene.GameSpeed)
            {
                return;
            }

            this.delay = 0;
            var color = this.Context[0, 0];

            this.turn.X = Random.NextInt(this.Context.GetLength(0));
            this.turn.Y = Random.NextInt(this.Context.GetLength(1));

            if (color == this.Context[this.turn.X, this.turn.Y])
            {
                this.delay = 1000;
            }
        }
    }

    public class UpdateCounterUpdateSystem : EntityProcessingSystem
    {
        public UpdateCounterUpdateSystem()
            : base(new Matcher().All(typeof(TextComponent), typeof(CounterComponent)))
        {
        }

        protected override void DoAction(Entity entity, TimeSpan gameTime)
        {
            base.DoAction(entity, gameTime);
            var text = entity.GetComponent<TextComponent>();
            var counter = entity.GetComponent<CounterComponent>();

            text.Text =
                $"Moves: {counter.Count}. \n Wins: {counter.StatisticWins} / {counter.StatisticCount} = {counter.StatisticWins * 100 / Math.Max(1, counter.StatisticCount)}";
        }
    }

    public class FieldClickUpdateSystem : EntityProcessingSystem
    {
        public FieldClickUpdateSystem()
            : base(new Matcher().All(typeof(TurnMadeComponent), typeof(InputMouseComponent)))
        {
        }

        protected override void DoAction(Entity entity, TimeSpan gameTime)
        {
            base.DoAction(entity, gameTime);
            var turn = entity.GetComponent<TurnMadeComponent>();
            var input = entity.GetComponent<InputMouseComponent>();
            var position = entity.GetComponent<PositionComponent>();

            if (!input.LeftMouseButtonPressed)
            {
                return;
            }

            var location = (input.MousePosition - position.Position) / BasicScene.BlockSize;
            turn.X = (int)location.X;
            turn.Y = (int)location.Y;
        }
    }

    public class TurnUpdateSystem : EntityProcessingSystem
    {
        private readonly BasicScene scene;

        public TurnUpdateSystem(BasicScene scene)
            : base(new Matcher().All(typeof(FieldComponent), typeof(TurnMadeComponent)))
        {
            this.scene = scene;
        }

        protected override void DoAction(Entity entity, TimeSpan gameTime)
        {
            base.DoAction(entity, gameTime);
            var map = entity.GetComponent<FieldComponent>();
            var position = entity.GetComponent<TurnMadeComponent>();

            var x = position.X;
            var y = position.Y;
            if (x < 0 || y < 0 || x > map.Map.GetLength(0) || y > map.Map.GetLength(1))
            {
                return;
            }

            var color = map.Map[x, y];

            if (color == map.Map[0, 0])
            {
                return;
            }

            var counterEntity = this.scene.FindEntity("Counter");
            var counter = counterEntity.GetComponent<CounterComponent>();
            counter.Count++;

            this.FloodIt(map.Map, color);
        }

        private void FloodIt(int[,] map, int floodColor)
        {
            var color = map[0, 0];

            var frontier = new Queue<Point>();
            frontier.Enqueue( new Point(0, 0) );

            var visited = new HashSet<Point>();

            while (frontier.Count > 0)
            {
                var current = frontier.Dequeue();
                map[current.X, current.Y] = floodColor;

                foreach (var next in this.GetNeighbors(current))
                {
                    if (!this.IsInMap(map, next))
                    {
                        continue;
                    }

                    if (map[next.X, next.Y] != color)
                    {
                        continue;
                    }

                    if (!visited.Contains(next))
                    {
                        frontier.Enqueue(next);
                        visited.Add(next);
                    }
                }
            }
        }

        private bool IsInMap(int[,] map, Point next)
        {
            return next.X >= 0 && next.Y >= 0 && next.X < map.GetLength(0) && next.Y < map.GetLength(1);
        }

        private IEnumerable<Point> GetNeighbors(Point current)
        {
            yield return new Point(current.X - 1, current.Y);
            yield return new Point(current.X + 1, current.Y);
            yield return new Point(current.X, current.Y - 1);
            yield return new Point(current.X, current.Y + 1);
        }
    }

    public class GameOverUpdateSystem : EntityProcessingSystem
    {
        private readonly BasicScene scene;

        public GameOverUpdateSystem(BasicScene scene)
            : base(new Matcher().All(typeof(CounterComponent)))
        {
            this.scene = scene;
        }

        protected override void DoAction(Entity entity, TimeSpan gameTime)
        {
            base.DoAction(entity, gameTime);
            var counter = entity.GetComponent<CounterComponent>();

            if (counter.GameOver)
            {
                return;
            }

            var field = this.scene.FindEntity("player").GetComponent<FieldComponent>();
            if (counter.Count == 25)
            {
                counter.StatisticCount++;
                counter.GameOver = true;
                Core.Instance.SwitchScene(
                    new WindTransition
                    {
                        SceneLoadAction = () =>
                        {
                            this.scene.Restart(field, counter);
                            return this.scene;
                        }
                    });
                return;
            }

            var map = field.Map;

            var color = map[0, 0];

            for (var x = 0; x < map.GetLength(0); x++)
            for (var y = 0; y < map.GetLength(1); y++)
            {
                if(map[x,y] != color)
                {
                    return;
                }
            }


            counter.StatisticCount++;
            counter.StatisticWins++;
            counter.GameOver = true;
            Core.Instance.SwitchScene(
                new WindTransition
                {
                    SceneLoadAction = () =>
                    {
                        this.scene.Restart(field, counter);
                        return this.scene;
                    }
                });
        }
    }

    public class FieldMeshGeneratorSystem : EntityProcessingSystem
    {
        public FieldMeshGeneratorSystem()
            : base(new Matcher().All(typeof(FieldComponent)))
        {
        }

        protected override void DoAction(Entity entity, TimeSpan gameTime)
        {
            base.DoAction(entity, gameTime);
            var map = entity.GetComponent<FieldComponent>();
            var finalRender = entity.GetOrCreateComponent<FinalRenderComponent>();
            var effect = entity.GetComponent<SpriteEffectsComponent>()?.SpriteEffects ?? SpriteEffects.None;
            var depth = entity.GetComponent<DepthLayerComponent>()?.Depth ?? 0;

            finalRender.Batch.Clear();

            var texture = map.Texture ?? Graphic.PixelTexture;
            var subtextureWidth = (float)texture.Width / (float)map.Map.GetLength(0);
            var subtextureHeight = (float)texture.Height / (float)map.Map.GetLength(1);

            for (var x = 0; x < map.Map.GetLength(0); x++)
            for (var y = 0; y < map.Map.GetLength(1); y++)
            {
                finalRender.Batch.Draw(
                    texture,
                    new RectangleF(
                        x * BasicScene.BlockSize,
                        y * BasicScene.BlockSize,
                        BasicScene.BlockSize,
                        BasicScene.BlockSize),
                    new RectangleF(subtextureWidth * x, subtextureHeight * y, subtextureWidth, subtextureHeight),
                    this.ConvertMapToColor(map.Map[x, y]),
                    depth);
            }

            var transformation = TransformationUtils.GetTransformation(entity).LocalTransformMatrix;
            foreach (var mesh in finalRender.Batch.Meshes)
            {
                mesh.ApplyEffectToMesh(effect);
                mesh.ApplyTransformMesh(transformation);
            }
        }

        private Color ConvertMapToColor(int map)
        {
            switch (map)
            {
                case 0: return Color.Red;
                case 1: return Color.Orange;
                case 2: return Color.Yellow;
                case 3: return Color.Green;
                case 4: return Color.LightBlue;
                case 5: return Color.Blue;
                case 6: return Color.Purple;
            }

            return Color.Black;
        }
    }

    public class CounterComponent : Component
    {
        public int Count { get; set; }

        public int StatisticWins { get; set; }

        public int StatisticCount { get; set; }

        public bool GameOver { get; set; }
    }

    public class FieldComponent : Component
    {
        public Texture2D Texture;
        public int ColorCount = 5;
        public int[,] Map;
    }

    public class TurnMadeComponent : Component
    {
        public int X;
        public int Y;
    }
}