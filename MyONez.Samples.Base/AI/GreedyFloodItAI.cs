namespace MyONez.Samples.Base.AI
{
    using System;
    using System.Collections.Generic;

    using BrainAI.AI.FSM;

    using Microsoft.Xna.Framework;

    using MyONez.Samples.Base.Components;
    using MyONez.Samples.Base.Screens;

    /// <summary>
    /// Statistic 90%
    /// </summary>
    public class GreedyFloodItAI : State<int[,]>
    {
        private readonly TurnMadeComponent turn;

        private readonly int startX;

        private readonly int startY;

        public GreedyFloodItAI(TurnMadeComponent turn, int startX, int startY)
        {
            this.turn = turn;
            this.startX = startX;
            this.startY = startY;
        }

        private int[,] copyArray;

        public override void Update()
        {
            if (this.turn.TurnMade)
            {
                return;
            }

            var maxValue = 0;
            var maxColor = 0;

            for (var i = 0; i < BasicScene.ColorsCount; i++)
            {
                if (this.Context[0, 0] == i
                    || this.Context[this.Context.GetLength(0) - 1, this.Context.GetLength(1) - 1] == i)
                {
                    continue;
                }

                this.copyArray = this.copyArray ?? new int[this.Context.GetLength(0), this.Context.GetLength(1)];
                Array.Copy(this.Context, this.copyArray, this.Context.Length);
                this.FloodIt(this.copyArray, i);
                var value = this.Calc(this.copyArray);
                if (maxValue < value)
                {
                    maxValue = value;
                    maxColor = i;
                }
            }

            this.turn.Color = maxColor;
            this.turn.TurnMade = true;
        }

        private int Calc(int[,] map)
        {
            var color = map[startX, startY];

            var result = 0;

            var frontier = new Queue<Point>();
            frontier.Enqueue(new Point(startX, startY));

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
            var color = map[startX, startY];

            var frontier = new Queue<Point>();
            frontier.Enqueue(new Point(startX, startY));

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
}