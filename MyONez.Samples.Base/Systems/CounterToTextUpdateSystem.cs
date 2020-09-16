namespace MyONez.Samples.Base.Systems
{
    using System;

    using GeonBit.UI.ECS.Components;

    using LocomotorECS;
    using LocomotorECS.Matching;

    using MyONez.Samples.Base.Components;
    using MyONez.Samples.Base.Screens;

    public class CounterToTextUpdateSystem : EntityProcessingSystem
    {
        public CounterToTextUpdateSystem()
            : base(new Matcher().All(typeof(TextComponent), typeof(CounterComponent)))
        {
        }

        protected override void DoAction(Entity entity, TimeSpan gameTime)
        {
            base.DoAction(entity, gameTime);
            var text = entity.GetComponent<TextComponent>();
            var counter = entity.GetComponent<CounterComponent>();

            text.Text = $"     | Player 1 | Player 2 \nSize | {counter.Player1Size, 8} | {counter.Player2Size, 8}\nWins | {counter.Player1Wins, 8} | {counter.Player2Wins, 8}";
        }
    }
}