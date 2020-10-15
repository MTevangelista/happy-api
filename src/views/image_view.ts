import Image from '../models/Image';

export default {
  render(image: Image): object {
    return {
      id: image.id,
      url: `http://localhost:3333/uploads/${image.path}`,
    };
  },

  renderMany(images: Image[]): Image[] {
    return images.map((image) => this.render(image));
  },
};
