namespace MyONez.Samples.Base.Systems
{
    using System;

    using GeonBit.UI.ECS.Components;

    using LocomotorECS;
    using LocomotorECS.Matching;

    using MyONez.Samples.Base.Components;

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

            text.Text = $@"
Statistic: 
     | {counter.Player1Name, 5} | {counter.Player2Name, 5}
Size | {counter.Player1Size, 5} | {counter.Player2Size, 5}
Wins | {counter.Player1Wins, 5} | {counter.Player2Wins, 5}";
        }
    }
}