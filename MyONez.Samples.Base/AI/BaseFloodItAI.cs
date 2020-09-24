namespace MyONez.Samples.Base.AI
{
    using BrainAI.AI.FSM;

    using MyONez.Samples.Base.Components;
    using MyONez.Samples.Base.Screens;

    public abstract class BaseFloodItAI : State<int[,]>
    {
        private readonly TurnMadeComponent turn;

        private readonly PlayerSwitcherComponent switcher;

        protected readonly int startX;
        
        protected readonly int startY;

        protected BaseFloodItAI(TurnMadeComponent turn, PlayerSwitcherComponent switcher)
        {
            this.turn = turn;
            this.switcher = switcher;
            this.startX = this.turn.PlayerX;
            this.startY = this.turn.PlayerY;
        }

        public sealed override void Update()
        {
            if (this.turn.TurnMade)
            {
                return;
            }

            var color = this.Act();

            if (!IsColorPossible(color))
            {
                return;
            }

            this.turn.Color = color;
            this.turn.TurnMade = true;
        }

        protected bool IsColorPossible(int color)
        {
            if (color < 0 || color >= SharedData.ColorsCount)
            {
                return false;
            }

            for (var index = 0; index < this.switcher.Players.Count; index++)
            {
                var otherTurns = this.switcher.Players[index];
                if (color == this.Context[otherTurns.PlayerX, otherTurns.PlayerY])
                {
                    return false;
                }
            }

            return true;
        }

        public abstract int Act();
    }
}