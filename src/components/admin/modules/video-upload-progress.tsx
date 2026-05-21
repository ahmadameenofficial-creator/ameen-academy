interface VideoUploadProgressProps {
  progress: number;
}

export function VideoUploadProgress({ progress }: VideoUploadProgressProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 bg-muted rounded-full h-1.5">
        <div
          className="bg-brand-500 h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-xs text-brand-500">{progress}%</span>
    </div>
  );
}
