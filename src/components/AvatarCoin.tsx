import { useEffect, useRef } from "react";
import { profile } from "../data/profile";

const sensitivity = 1.8;
const friction = 2;

export function AvatarCoin() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rotorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const rotor = rotorRef.current;
    if (!button || !rotor) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let angle = 0;
    let velocity = 0;
    let pointer: number | null = null;
    let lastX = 0;
    let lastDirection = 0;
    let bounds = { x: 0, y: 0, radius: 0 };
    let samples: { x: number; time: number }[] = [];
    let frame = 0;
    let previousTime = 0;
    let target: number | null = null;
    let wiggle: Animation | null = null;

    function paint() {
      rotor!.style.transform = `rotateY(${angle}deg)`;
    }

    function stop() {
      cancelAnimationFrame(frame);
      frame = 0;
      wiggle?.cancel();
      wiggle = null;
    }

    function forwardRest() {
      if (lastDirection > 0) return Math.ceil((angle - 0.00001) / 360) * 360;
      if (lastDirection < 0) return Math.floor((angle + 0.00001) / 360) * 360;
      return Math.round(angle / 360) * 360;
    }

    function tick(now: number) {
      const dt = Math.min((now - previousTime) / 1000, 0.032);
      previousTime = now;
      if (target === null) {
        const decay = Math.exp(-friction * dt);
        angle += velocity * (1 - decay) / friction;
        velocity *= decay;
        if (Math.abs(velocity) < 60) target = forwardRest();
      } else {
        angle += (target - angle) * (1 - Math.exp(-3.4 * dt));
        if (Math.abs(angle - target) < 0.12) {
          angle = target;
          velocity = 0;
          frame = 0;
          paint();
          return;
        }
      }
      paint();
      frame = requestAnimationFrame(tick);
    }

    function coast(speed: number) {
      stop();
      angle = ((angle % 360) + 360) % 360;
      if (angle > 180) angle -= 360;
      velocity = Math.max(-5200, Math.min(5200, speed));
      if (Math.abs(velocity) > 0.01) lastDirection = Math.sign(velocity);
      if (reduced.matches) {
        velocity = 0;
        paint();
        return;
      }
      target = Math.abs(velocity) < 60 ? forwardRest() : null;
      if (Math.abs(angle) < 0.01 && Math.abs(velocity) < 0.01) {
        paint();
        return;
      }
      previousTime = performance.now();
      frame = requestAnimationFrame(tick);
    }

    function sample(x: number, time: number) {
      samples.push({ x, time });
      samples = samples.filter((point) => time - point.time <= 100);
    }

    function onPointerDown(event: PointerEvent) {
      if (!event.isPrimary || event.button !== 0 || pointer !== null) return;
      stop();
      velocity = 0;
      const rect = button!.getBoundingClientRect();
      bounds = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, radius: rect.width / 2 + 10 };
      pointer = event.pointerId;
      lastX = event.clientX;
      lastDirection = 0;
      samples = [];
      sample(lastX, event.timeStamp);
      button!.dataset.dragging = "true";
      button!.setPointerCapture(pointer);
    }

    function move(event: PointerEvent) {
      const dx = event.clientX - bounds.x;
      const dy = event.clientY - bounds.y;
      const distance = Math.hypot(dx, dy);
      const outside = distance > bounds.radius;
      const boundedX = bounds.x + dx * (outside ? bounds.radius / distance : 1);
      const delta = boundedX - lastX;
      if (Math.abs(delta) > 0.01) lastDirection = Math.sign(delta);
      angle += delta * sensitivity;
      lastX = boundedX;
      sample(boundedX, event.timeStamp);
      paint();
      return outside;
    }

    function release(event: PointerEvent, cancelled = false, alreadyMoved = false) {
      if (event.pointerId !== pointer) return;
      if (!cancelled && !alreadyMoved) move(event);
      let speed = 0;
      const first = samples[0];
      const last = samples[samples.length - 1];
      if (!cancelled && first && last && last.time - first.time >= 8) {
        speed = (last.x - first.x) / (last.time - first.time) * 1000 * sensitivity;
      }
      const id = pointer;
      pointer = null;
      button!.dataset.dragging = "false";
      if (button!.hasPointerCapture(id)) button!.releasePointerCapture(id);
      coast(speed);
    }

    function onPointerMove(event: PointerEvent) {
      if (event.pointerId === pointer && move(event)) release(event, false, true);
    }
    const onPointerUp = (event: PointerEvent) => release(event);
    const onPointerCancel = (event: PointerEvent) => release(event, true);

    function onKeyDown(event: KeyboardEvent) {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key) || pointer !== null) return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      if (reduced.matches) {
        stop();
        angle += direction * 30;
        paint();
      } else {
        coast(direction * 900);
      }
    }

    function reset() {
      stop();
      velocity = 0;
      angle = 0;
      const id = pointer;
      pointer = null;
      button!.dataset.dragging = "false";
      if (id !== null && button!.hasPointerCapture(id)) button!.releasePointerCapture(id);
      paint();
    }
    const onMotionChange = () => { if (reduced.matches) reset(); };
    const onVisibilityChange = () => { if (document.hidden) reset(); };
    const onDragStart = (event: DragEvent) => event.preventDefault();

    button.addEventListener("pointerdown", onPointerDown);
    button.addEventListener("pointermove", onPointerMove);
    button.addEventListener("pointerup", onPointerUp);
    button.addEventListener("pointercancel", onPointerCancel);
    button.addEventListener("lostpointercapture", onPointerCancel);
    button.addEventListener("keydown", onKeyDown);
    button.addEventListener("dragstart", onDragStart);
    reduced.addEventListener("change", onMotionChange);
    document.addEventListener("visibilitychange", onVisibilityChange);

    if (!reduced.matches) {
      wiggle = rotor.animate([
        { transform: "rotateY(0deg)", offset: 0 },
        { transform: "rotateY(-32deg)", offset: 0.25 },
        { transform: "rotateY(32deg)", offset: 0.75 },
        { transform: "rotateY(0deg)", offset: 1 },
      ], { duration: 500, delay: 500, easing: "linear" });
    }

    return () => {
      button.removeEventListener("pointerdown", onPointerDown);
      button.removeEventListener("pointermove", onPointerMove);
      button.removeEventListener("pointerup", onPointerUp);
      button.removeEventListener("pointercancel", onPointerCancel);
      button.removeEventListener("lostpointercapture", onPointerCancel);
      button.removeEventListener("keydown", onKeyDown);
      button.removeEventListener("dragstart", onDragStart);
      reduced.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reset();
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      type="button"
      className="avatar-coin"
      aria-label={`Drag left or right to spin ${profile.name}'s portrait. Flick to add momentum, or use the left and right arrow keys.`}
    >
      <span ref={rotorRef} className="avatar-coin-rotor" aria-hidden="true">
        {Array.from({ length: 9 }, (_, index) => (
          <span key={index} className="avatar-coin-edge" style={{ transform: `translateZ(${index - 4}px)` }} />
        ))}
        <span className="avatar-coin-face avatar-coin-front">
          <img src={profile.avatarUrl} alt="" draggable={false} className="h-full w-full select-none object-cover" />
          <span className="avatar-coin-reflection" />
        </span>
        <span className="avatar-coin-face avatar-coin-back">
          {profile.initials}
          <span className="avatar-coin-reflection" />
        </span>
      </span>
    </button>
  );
}
