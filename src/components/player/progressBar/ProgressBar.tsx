export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="absolute -top-0.5 left-0 w-full bg-dark-100">
      <div
        style={{
          width: `${progress}%`,
        }}
        className="h-1 bg-primary relative"
      >
        <div
          className="absolute -top-1 -right-2.5 w-3 h-3 bg-primary
        rounded-full border border-solid border-white shadow"
        />
      </div>
    </div>
  );
}
