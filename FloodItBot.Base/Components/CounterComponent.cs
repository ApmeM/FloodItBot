namespace FloodItBot.Base.Components
{
    using System.Collections.Generic;

    using LocomotorECS;

    public class CounterComponent : Component
    {
        public class PlayerData
        {
            public int Size;

            public int Wins;

            public string Name;
        }

        public List<PlayerData> Players = new List<PlayerData>();

        public int GamesPlayed;
        public bool GameOver;
        public int TurnsMade;
    }
}