namespace MyONez.Samples.Base.AI
{
    using MyONez.Maths;
    using MyONez.Samples.Base.Components;
    using MyONez.Samples.Base.Screens;

    public class RandomFloodItAI : BaseFloodItAI
    {
        public RandomFloodItAI(TurnMadeComponent turn, int startX, int startY)
            : base(turn, startX, startY)
        {
        }

        public override int Act()
        {
            return Random.NextInt(BasicScene.ColorsCount);
        }
    }
}