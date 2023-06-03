export const imgToDataURL = (file: File, width?: number, height?: number) => {
  const getWith = () => (width ? width : 100);
  const getHeight = () => (height ? height : 100);

  return new Promise<string>((resolve) => {
    try {
      if (!file) return resolve('');
      const url = URL.createObjectURL(file as Blob);
      const img = new Image();
      img.onload = async () => {
        const w = img.width;
        const h = img.height;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        const nImage =
          w < h ? await resizeHeight(img, w, h) : w > h ? await resizeWidth(img, w, h) : img;
        ctx.canvas.width = getWith();
        ctx.canvas.height = getHeight();
        ctx.drawImage(nImage, 0, 0, getWith(), getHeight());
        const dataUrl = ctx.canvas.toDataURL();
        URL.revokeObjectURL(url);
        resolve(dataUrl);
      };
      img.crossOrigin = 'Anonymous';
      img.src = url;
    } catch (error) {
      resolve('');
    }
  });
};

const resizeHeight = (img: HTMLImageElement, width: number, height: number) => {
  return new Promise<HTMLImageElement>((resolve) => {
    const cv = document.createElement('canvas');
    const context = cv.getContext('2d')!;
    context.canvas.width = width;
    context.canvas.height = width;
    context.drawImage(img, 0, height * 0.2, width, width, 0, 0, width, width);
    const image = new Image();
    image.onload = () => resolve(image);
    image.src = context.canvas.toDataURL();
  });
};

const resizeWidth = (img: HTMLImageElement, width: number, height: number) => {
  return new Promise<HTMLImageElement>((resolve) => {
    const cv = document.createElement('canvas');
    const context = cv.getContext('2d')!;
    context.canvas.width = height;
    context.canvas.height = height;
    context.drawImage(img, width * 0.2, 0, height, height, 0, 0, height, height);
    const image = new Image();
    image.onload = () => resolve(image);
    image.src = context.canvas.toDataURL();
  });
};
