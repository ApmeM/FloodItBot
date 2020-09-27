namespace FloodItBot.Base.Systems
{
    using System;
    using System.Collections.Generic;

    using LocomotorECS;
    using LocomotorECS.Matching;

    using Microsoft.Xna.Framework;

    using MyONez.ECS;
    using FloodItBot.Base.Components;

    public class ApplyTurnUpdateSystem : EntityProcessingSystem
    {
        private readonly Scene scene;

        public ApplyTurnUpdateSystem(Scene scene)
            : base(new Matcher().All(typeof(FieldComponent), typeof(TurnMadeComponent)))
        {
            this.scene = scene;
        }

        protected override void DoAction(Entity entity, TimeSpan gameTime)
        {
            base.DoAction(entity, gameTime);
            var field = entity.GetComponent<FieldComponent>();
            var turn = entity.GetComponent<TurnMadeComponent>();
            var switcher = entity.GetComponent<PlayerSwitcherComponent>();
            var color = turn.Color;

            for (var index = 0; index < switcher.Players.Count; index++)
            {
                var otherTurns = switcher.Players[index];
                if (color == field.Map[otherTurns.PlayerX, otherTurns.PlayerY])
                {
                    return;
                }
            }

            var counterEntity = this.scene.FindEntity("Counter");
            var counter = counterEntity.GetComponent<CounterComponent>();

            this.FloodIt(field.Map, color, turn.PlayerX, turn.PlayerY);
            counter.Players[switcher.CurrentPlayer].Size = this.Calc(field.Map, turn.PlayerX, turn.PlayerY);
            counter.TurnsMade++;
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