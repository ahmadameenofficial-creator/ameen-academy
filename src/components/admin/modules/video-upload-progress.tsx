interface VideoUploadProgressProps {
  progress: number;
  fileName?: string;
  fileSize?: number;
}

function formatFileSize(bytes: number): string {
  if (bytes >= 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(0)} MB`;
  return `${(bytes / 1024).toFixed(0)} KB`;
}

export function VideoUploadProgress({ progress, fileName, fileSize }: VideoUploadProgressProps) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <div className="flex flex-col gap-1 min-w-0">
        {fileName && (
          <span className="text-[10px] text-muted-foreground truncate max-w-[120px]">{fileName}</span>
        )}
        <div className="w-24 bg-muted rounded-full h-2">
          <div
            className="bg-brand-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className="flex flex-col items-end shrink-0">
        <span className="text-xs font-medium text-brand-600">{progress}%</span>
        {fileSize && (
          <span className="text-[10px] text-muted-foreground">{formatFileSize(fileSize)}</span>
        )}
      </div>
    </div>
  );
}
