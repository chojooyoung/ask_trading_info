export const compressImage = (file: File, maxSizeMB: number): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const elem = document.createElement("canvas");
        const ctx = elem.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }

        const scaleFactor = Math.sqrt((maxSizeMB * 1024 * 1024) / file.size);
        const width = img.width * scaleFactor;
        const height = img.height * scaleFactor;

        elem.width = width;
        elem.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        ctx.canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Failed to create blob"));
              return;
            }
            const newFile = new File([blob], file.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            resolve(newFile);
          },
          "image/jpeg",
          0.7
        );
      };
    };
    reader.onerror = (error) => reject(error);
  });
};
