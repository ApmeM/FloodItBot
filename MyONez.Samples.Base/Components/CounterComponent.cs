namespace MyONez.Samples.Base.Components
{
    using LocomotorECS;

    public class CounterComponent : Component
    {
        public int Count { get; set; }

        public int StatisticWins { get; set; }

        public int StatisticCount { get; set; }

        public bool GameOver { get; set; }
    }
}