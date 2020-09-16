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

        public RandomFloodItAI(TurnMadeComponent turn)
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

            this.turn.X = Random.NextInt(this.Context.GetLength(0));
            this.turn.Y = Random.NextInt(this.Context.GetLength(1));

            if (color != this.Context[this.turn.X, this.turn.Y])
            {
                this.turn.TurnMade = true;
            }
        }
    }
}