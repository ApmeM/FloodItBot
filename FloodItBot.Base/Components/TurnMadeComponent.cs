namespace FloodItBot.Base.Components
{
    using LocomotorECS;

    public class TurnMadeComponent : Component
    {
        public int PlayerX;
        public int PlayerY;
        public int Color;
        public bool TurnMade;
    }
}