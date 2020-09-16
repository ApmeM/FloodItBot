namespace MyONez.Samples.Base.AI
{
    using BrainAI.AI.FSM;

    using MyONez.Samples.Base.Components;
    using MyONez.Samples.Base.Screens;

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
}