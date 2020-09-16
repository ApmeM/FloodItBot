namespace MyONez.Samples.Base.Systems
{
    using System;

    using LocomotorECS;
    using LocomotorECS.Matching;

    using MyONez.Samples.Base.Components;

    public class TurnSelectorUpdateSystem : EntityProcessingSystem
    {
        public TurnSelectorUpdateSystem()
            : base(new Matcher().All(typeof(TurnMadeComponent), typeof(PlayerSwitcherComponent)))
        {
        }

        protected override void DoAction(Entity entity, TimeSpan gameTime)
        {
            base.DoAction(entity, gameTime);
            var turn = entity.GetComponent<TurnMadeComponent>();
            var switcher = entity.GetComponent<PlayerSwitcherComponent>();

            TurnMadeComponent player;
            TurnMadeComponent playerStart;
            if (switcher.Player == switcher.Player1.Player)
            {
                player = switcher.Player1;
                playerStart = switcher.Player2;
            }
            else
            {
                player = switcher.Player2;
                playerStart = switcher.Player1;
            }

            if (!player.TurnMade)
            {
                return;
            }

            turn.X = player.X;
            turn.Y = player.Y;
            turn.Player = player.Player;
            switcher.Player = 1 - switcher.Player;
            playerStart.TurnMade = false;
        }
    }
}