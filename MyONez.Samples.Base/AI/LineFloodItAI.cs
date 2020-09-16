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

        public LineFloodItAI(TurnMadeComponent turn)
        {
            this.turn = turn;
        }

        public override void Update()
        {
            if (this.turn.TurnMade)
            {
                return;
            }

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
                this.turn.TurnMade = true;
                return;
            }
        }
    }
}