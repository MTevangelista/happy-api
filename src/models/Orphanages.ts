import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orphanages')
export default class Orphanages {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  public name: string;

  @Column()
  public latitude: number;

  @Column()
  public longitude: number;

  @Column()
  public about: number;

  @Column()
  public instructions: string;

  @Column()
  public opening_hours: string;

  @Column()
  public open_on_weekends: boolean;
}
