namespace MyONez.Samples.Base.AI
{
    using MyONez.Samples.Base.Components;

    public class LineFloodItAI : BaseFloodItAI
    {

        public LineFloodItAI(TurnMadeComponent turn, PlayerSwitcherComponent switcher)
            : base(turn, switcher)
        {
        }

        public override int Act()
        {
            if (this.startX == 0 && this.startY == 0)
            {
                for (var x = 0; x < this.Context.GetLength(0); x++)
                for (var y = 0; y < this.Context.GetLength(1); y++)
                {
                    if (!IsColorPossible(this.Context[x, y]))
                    {
                        continue;
                    }

                    return this.Context[x, y];
                }
            }
            else
            {
                for (var x = this.Context.GetLength(0) - 1; x >= 0; x--)
                for (var y = this.Context.GetLength(1) - 1; y >= 0; y--)
                {
                    if (!IsColorPossible(this.Context[x, y]))
                    {
                        continue;
                    }

                    return this.Context[x, y];
                }
            }

            return this.Context[0, 0];
        }
    }
}