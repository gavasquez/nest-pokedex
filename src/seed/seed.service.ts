import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/pok-response.interface';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';


@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel = Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ){}

  async executeSeed(){
    await this.pokemonModel.deleteMany();
    //const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    //const insertPromisesArray = [];
    const pokemonToInsert: {name: string, no: number}[] = [];
    data.results.forEach(({name, url})=> {
      const segments = url.split('/');
      //const no = segments[segments.length - 2]; asi tambien se puede obtener la penultima posición
      const no: number = +segments.at(-2);
      //insertPromisesArray.push(this.pokemonModel.create({name, no}));
      //await this.pokemonModel.create({name, no}); //asi se crea un pokemon
      pokemonToInsert.push({name, no});
    });
    await this.pokemonModel.insertMany(pokemonToInsert);
    //await Promise.all(insertPromisesArray); // asi se ejecutarn todas las promesas
    return 'Seed execute';
  }
}
