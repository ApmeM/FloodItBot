namespace FloodItBot.Base.AI
{
    using MyONez.Maths;
    using FloodItBot.Base.Components;
    using FloodItBot.Base.Screens;

    public class RandomFloodItAI : BaseFloodItAI
    {
        public RandomFloodItAI(TurnMadeComponent turn, PlayerSwitcherComponent switcher)
            : base(turn, switcher)
        {
        }

        public override int Act()
        {
            return Random.NextInt(SharedData.ColorsCount);
        }
    }
}