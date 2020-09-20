namespace MyONez.Samples.Base.AI
{
    using BrainAI.AI.FSM;

    using MyONez.Maths;
    using MyONez.Samples.Base.Components;

    /// <summary>
    /// Statistic 0%
    /// </summary>
    public class RandomFloodItAI : State<int[,]>
    {
        private readonly TurnMadeComponent turn;

        private readonly int startX;

        private readonly int startY;

        public RandomFloodItAI(TurnMadeComponent turn, int startX, int startY)
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
            
            var x = Random.NextInt(this.Context.GetLength(0));
            var y = Random.NextInt(this.Context.GetLength(1));
            
            if (this.Context[0, 0] == this.Context[x, y]
                || this.Context[this.Context.GetLength(0) - 1, this.Context.GetLength(1) - 1] == this.Context[x, y])
            {
                return;
            }

            this.turn.Color = this.Context[x, y];
            this.turn.TurnMade = true;
        }
    }
}