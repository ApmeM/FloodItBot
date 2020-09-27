namespace FloodItBot.Base.Components
{
    using System.Collections.Generic;

    using LocomotorECS;

    public class PlayerSwitcherComponent : Component
    {
        public List<TurnMadeComponent> Players { get; set; }

        public int CurrentPlayer { get; set; }
    }
}