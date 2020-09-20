namespace MyONez.Samples.Base.AI
{
    using BrainAI.AI.FSM;

    using MyONez.Samples.Base.Components;
    using MyONez.Samples.Base.Screens;

    public abstract class BaseFloodItAI : State<int[,]>
    {
        private readonly TurnMadeComponent turn;

        protected readonly int startX;
        
        protected readonly int startY;

        protected BaseFloodItAI(TurnMadeComponent turn, int startX, int startY)
        {
            this.turn = turn;
            this.startX = startX;
            this.startY = startY;
        }

        public sealed override void Update()
        {
            if (this.turn.TurnMade)
            {
                return;
            }

            var color = this.Act();

            if (this.Context[0, 0] == color
                || this.Context[this.Context.GetLength(0) - 1, this.Context.GetLength(1) - 1] == color 
                || color < 0
                || color >= BasicScene.ColorsCount)
            {
                return;
            }

            this.turn.Color = color;
            this.turn.TurnMade = true;
        }

        public abstract int Act();
    }
}