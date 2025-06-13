import EditorLayout from "./components/Layout/EditorLayout";

export default function Home() {
  return (
    <EditorLayout>
      <div>
        <h1 className="text-3xl font-bold mb-2 text-[#377DFF]">
          Unleash the Electric Elegance.
        </h1>
        <p className="mb-4 text-white/80">
          Introducing the future of mobility - the Scootric electric scooter!
        </p>
        <button className="bg-[#377DFF] text-white px-4 py-2 rounded shadow">
          Explore Now
        </button>
      </div>
    </EditorLayout>
  );
}
