namespace MyONez.Samples.Base.AI
{
    using System;
    using System.Collections.Generic;

    using BrainAI.AI.FSM;

    using Microsoft.Xna.Framework;

    using MyONez.Samples.Base.Components;

    /// <summary>
    /// Statistic 90%
    /// </summary>
    public class GreedyFloodItAI : State<int[,]>
    {
        private readonly TurnMadeComponent turn;

        public GreedyFloodItAI(TurnMadeComponent turn)
        {
            this.turn = turn;
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

            for (var i = 0; i < 5; i++)
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

            for (var x = 0; x < this.Context.GetLength(0); x++)
            for (var y = 0; y < this.Context.GetLength(1); y++)
            {
                if (maxColor != this.Context[x, y])
                {
                    continue;
                }

                this.turn.X = x;
                this.turn.Y = y;
                this.turn.TurnMade = true;
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
}