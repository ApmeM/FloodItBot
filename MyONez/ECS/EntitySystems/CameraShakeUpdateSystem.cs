namespace MyONez.ECS.EntitySystems
{
    using System;

    using LocomotorECS;
    using LocomotorECS.Matching;

    using Microsoft.Xna.Framework;

    using MyONez.ECS.Components;

    using Random = MyONez.Maths.Random;

    public class CameraShakeUpdateSystem : EntityProcessingSystem
    {
        public CameraShakeUpdateSystem()
            : base(new Matcher().All(typeof(CameraShakeComponent)))
        {
        }

        protected override void DoAction(Entity entity, TimeSpan gameTime)
        {
            base.DoAction(entity, gameTime);

            var shake = entity.GetComponent<CameraShakeComponent>();

            if (!shake.Enabled)
            {
                return;
            }

            if (shake.OriginalPosition == Vector2.Zero)
            {
                shake.OriginalPosition = shake.Camera.Position;
            }

            if (Math.Abs(shake.ShakeIntensity) > 0f)
            {
                shake.ShakeOffset = shake.ShakeDirection;
                if (shake.ShakeOffset.X != 0f || shake.ShakeOffset.Y != 0f)
                {
                    shake.ShakeOffset.Normalize();
                }
                else
                {
                    shake.ShakeOffset.X = shake.ShakeOffset.X + Random.NextFloat() - 0.5f;
                    shake.ShakeOffset.Y = shake.ShakeOffset.Y + Random.NextFloat() - 0.5f;
                }

                // ToDo: this needs to be multiplied by camera zoom so that less shake gets applied when zoomed in
                shake.ShakeOffset *= shake.ShakeIntensity;
                shake.ShakeIntensity *= -shake.ShakeDegradation;
                if (Math.Abs(shake.ShakeIntensity) <= 0.01f)
                {
                    shake.ShakeIntensity = 0f;
                    shake.Enabled = false;
                    shake.ShakeOffset = shake.OriginalPosition - shake.Camera.Position;
                    shake.OriginalPosition = Vector2.Zero;
                }
            }

            shake.Camera.Position += shake.ShakeOffset;
        }
    }
}