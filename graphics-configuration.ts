export class GraphicsConfiguration {
    /**
     * Drawing configuration.
     */
    public cellSize = 48; // Size in pixels of a cell square.
    public cellSizeSmall = 32; // Size in pixels of a cell square for small boards.
    public footerSize = 16; // Size in pixels of footer of board.

    /**
     * Resource URLs
     */
    public urls = {
        images: {
            pieces: ["res/empty.png", "res/cheese.png", "res/crackers.png"],
        },
    };

    /**
     * Globally accessible resources.
     */
    public images = {
        pieces: [] as HTMLImageElement[],
    };

    /**
     * Load all of the image assets into array.
     */
    async loadImages() {
        // Load pieces images.
        const promises: Promise<void>[] = [];
        for (let url of this.urls.images.pieces)
            promises.push(new Promise<void>(resolve => {
                const image = new Image();
                image.onload = () => {
                    resolve();
                }
                image.src = url;
                this.images.pieces.push(image);
            }));
        // Wait for them all to load.
        await Promise.all(promises);
    }
}
