import { Request, Response, Express } from 'express';
import { getRepository } from 'typeorm';
import orphanageView from '../views/orphanage_view';

import Orphanages from '../models/Orphanage';

class OrphanagesController {
  public async index(req: Request, res: Response): Promise<Response> {
    const orphanagesRepository = getRepository(Orphanages);

    const orphanages = await orphanagesRepository.find({
      relations: ['images'],
    });

    return res.json(orphanageView.renderMany(orphanages));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const orphanagesRepository = getRepository(Orphanages);

    const orphanage = await orphanagesRepository.findOne(id, {
      relations: ['images'],
    });

    if (!orphanage) {
      return res.status(404).json({ message: 'Orphanage not found!' });
    }

    return res.json(orphanageView.render(orphanage));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    console.log(req.files);
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = req.body;

    const orphanagesRepository = getRepository(Orphanages);

    const requestImages = req.files as Express.Multer.File[];

    const images = requestImages.map((image) => ({ path: image.filename }));

    const orphanage = orphanagesRepository.create({
      name, latitude, longitude, about, instructions, opening_hours, open_on_weekends, images,
    });

    await orphanagesRepository.save(orphanage);

    return res.status(201).json(orphanage);
  }
}

export default new OrphanagesController();
