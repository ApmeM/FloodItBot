namespace MyONez.Samples.Base.Components
{
    using LocomotorECS;

    using Microsoft.Xna.Framework.Graphics;

    public class FieldComponent : Component
    {
        public Texture2D Texture;
        public int ColorCount = 5;
        public int[,] Map;
    }
}