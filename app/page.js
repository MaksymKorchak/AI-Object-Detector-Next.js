import { ObjectDetection } from "../components/object-detection";

export default function Home() {
  return (
    <main className="p-5 min-h-screen w-full flex flex-col items-center justify-center">
      <h1 className="gradient-title font-bold text-3xl md:text-5xl lg:text-8xl text-center tracking-tighter">
        Thief Detection Alarm
      </h1>
      <ObjectDetection />
    </main>
  );
}
