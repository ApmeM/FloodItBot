namespace FloodItBot.Base.Components
{
    using LocomotorECS;

    using Microsoft.Xna.Framework.Graphics;

    public class FieldComponent : Component
    {
        public Texture2D Texture;
        public int[,] Map;
        public int BlockSize;
        public int BlockInterval;
    }
}