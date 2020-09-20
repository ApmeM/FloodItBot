namespace MyONez.Samples.Base.AI
{
    using BrainAI.AI.FSM;

    using MyONez.Samples.Base.Components;

    /// <summary>
    /// Statistic 22%
    /// </summary>
    public class LineFloodItAI : State<int[,]>
    {
        private readonly TurnMadeComponent turn;

        private readonly int startX;

        private readonly int startY;

        public LineFloodItAI(TurnMadeComponent turn, int startX, int startY)
        {
            this.turn = turn;
            this.startX = startX;
            this.startY = startY;
        }

        public override void Update()
        {
            if (this.turn.TurnMade)
            {
                return;
            }

            if (this.startX == 0 && this.startY == 0)
            {
                for (var x = 0; x < this.Context.GetLength(0); x++)
                for (var y = 0; y < this.Context.GetLength(1); y++)
                {
                    if (this.Context[0, 0] == this.Context[x, y]
                        || this.Context[this.Context.GetLength(0) - 1, this.Context.GetLength(1) - 1] == this.Context[x, y])
                    {
                        continue;
                    }

                    this.turn.Color = this.Context[x, y];
                    this.turn.TurnMade = true;
                    return;
                }
            }
            else
            {
                for (var x = this.Context.GetLength(0) - 1; x >= 0; x--)
                for (var y = this.Context.GetLength(1) - 1; y >= 0; y--)
                {
                    if (this.Context[0, 0] == this.Context[x, y]
                        || this.Context[this.Context.GetLength(0) - 1, this.Context.GetLength(1) - 1] == this.Context[x, y])
                    {
                        continue;
                    }

                    this.turn.Color = this.Context[x, y];
                    this.turn.TurnMade = true;
                    return;
                }
            }
        }
    }
}