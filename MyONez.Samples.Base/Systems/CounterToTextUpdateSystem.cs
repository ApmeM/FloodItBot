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

            var name = "     ";
            var size = "Size ";
            var wins = "Wins ";
            var rate = "Rate ";
            for (var i = 0; i < counter.Players.Count; i++)
            {
                name += $"| {counter.Players[i].Name,5} ";
                size += $"| {counter.Players[i].Size,5} ";
                wins += $"| {counter.Players[i].Wins,5} ";
                rate += $"| {(counter.GamesPlayed == 0 ? 0 : counter.Players[i].Wins * 100 / counter.GamesPlayed),4}% ";
            }

            text.Text = $@"Statistic: 
{name}
{size}
{wins}
{rate}";
        }
    }
}