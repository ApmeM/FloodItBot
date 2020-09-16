namespace MyONez.Samples.Base.Systems
{
    using System;
    using System.Collections.Generic;

    using LocomotorECS;
    using LocomotorECS.Matching;

    using Microsoft.Xna.Framework;

    using MyONez.Samples.Base.Components;
    using MyONez.Samples.Base.Screens;

    public class ApplyTurnUpdateSystem : EntityProcessingSystem
    {
        private readonly BasicScene scene;

        public ApplyTurnUpdateSystem(BasicScene scene)
            : base(new Matcher().All(typeof(FieldComponent), typeof(TurnMadeComponent)))
        {
            this.scene = scene;
        }

        protected override void DoAction(Entity entity, TimeSpan gameTime)
        {
            base.DoAction(entity, gameTime);
            var map = entity.GetComponent<FieldComponent>();
            var turn = entity.GetComponent<TurnMadeComponent>();

            var x = turn.X;
            var y = turn.Y;
            if (x < 0 || y < 0 || x > map.Map.GetLength(0) || y > map.Map.GetLength(1))
            {
                return;
            }

            var color = map.Map[x, y];

            if (color == map.Map[0, 0] || color == map.Map[map.Map.GetLength(0) - 1, map.Map.GetLength(1) - 1])
            {
                return;
            }

            var counterEntity = this.scene.FindEntity("Counter");
            var counter = counterEntity.GetComponent<CounterComponent>();

            if (turn.Player == 0)
            {
                this.FloodIt(map.Map, color, 0, 0);
                counter.Player1Size = this.Calc(map.Map, 0, 0);
            }
            else
            {
                this.FloodIt(map.Map, color, map.Map.GetLength(0) - 1, map.Map.GetLength(1) - 1);
                counter.Player2Size = this.Calc(map.Map, map.Map.GetLength(0) - 1, map.Map.GetLength(1) - 1);
            }
        }

        private void FloodIt(int[,] map, int floodColor, int x, int y)
        {
            var color = map[x, y];

            var frontier = new Queue<Point>();
            frontier.Enqueue( new Point(x, y) );

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

        private int Calc(int[,] map, int x, int y)
        {
            var color = map[x, y];

            var result = 0;

            var frontier = new Queue<Point>();
            frontier.Enqueue(new Point(x, y));

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
}