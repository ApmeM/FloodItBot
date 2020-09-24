namespace MyONez.Samples.Base.AI
{
    using MyONez.Maths;
    using MyONez.Samples.Base.Components;
    using MyONez.Samples.Base.Screens;

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