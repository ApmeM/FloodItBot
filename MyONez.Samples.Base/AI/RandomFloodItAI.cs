namespace MyONez.Samples.Base.AI
{
    using BrainAI.AI.FSM;

    using MyONez.Maths;
    using MyONez.Samples.Base.Components;
    using MyONez.Samples.Base.Screens;

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
}