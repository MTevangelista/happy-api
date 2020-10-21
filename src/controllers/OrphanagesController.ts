import { Request, Response, Express } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
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

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      images,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        }),
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const orphanage = orphanagesRepository.create(data);

    await orphanagesRepository.save(orphanage);

    return res.status(201).json(orphanage);
  }
}

export default new OrphanagesController();
