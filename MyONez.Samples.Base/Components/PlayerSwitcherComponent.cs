namespace MyONez.Samples.Base.Components
{
    using LocomotorECS;

    public class PlayerSwitcherComponent : Component
    {
        public TurnMadeComponent Player2 { get; set; }

        public TurnMadeComponent Player1 { get; set; }

        public int Player { get; set; }
    }
}