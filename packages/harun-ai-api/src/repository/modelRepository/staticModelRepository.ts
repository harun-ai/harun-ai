import Model from '../../core/entities/Model';
import InvalidInputSchemaError from '../../core/errors/InvalidInputSchemaError';
import ModelAlreadyExistsError from '../../core/errors/ModelAlreadyExistsError';
import ModelNotFoundError from '../../core/errors/ModelNotFoundError';
import IdProvider from '../../provider/idProvider/IdProvider';
import ISchemaProvider from '../../provider/schemaProvider/ISchemaProvider';
import IModelRepository from './IModelRepository';

export default class StaticModelRepository<IdType>
  implements IModelRepository<IdType>
{
  private models: Model<IdType>[] = [];

  constructor(
    private idProvider: IdProvider<IdType>,
    private schemaProvider: ISchemaProvider
  ) {
    this.models.push(
      new Model(this.idProvider, {
        name: 'Atas de Reunião',
        model: 'text-davinci-003',
        description: 'Construir uma ata de reunião ou um relato de um encontro',
        prompt:
          'Converta minhas {{annotations}} em um {{type}} da reunião, escrita em primeira mão e crie uma lista de {{tasks}}',
        temperature: 0,
        maxTokens: 500,
        topP: 1,
        frequencyPenalty: 0,
        presencePenalty: 0,
        inputSchema: {
          required: ['annotations', 'tasks', 'type'],
          type: 'object',
          properties: {
            annotations: {
              type: 'string',
              description: 'Anotações',
            },
            tasks: {
              type: 'string',
              description: 'Tarefas',
            },
            type: {
              type: 'string',
              enum: ['relato', 'ata'],
              description: 'Tipo relato ou ata',
            },
          },
        },
      })
    );
    this.models.push(
      new Model(this.idProvider, {
        name: 'Explique a uma criança',
        model: 'text-davinci-003',
        description:
          'Traduz texto difícil em conceitos mais simples.que até uma criança pode entender',
        prompt: 'Resuma para uma criança: {{text}}',
        temperature: 0.7,
        maxTokens: 500,
        topP: 1,
        frequencyPenalty: 0,
        presencePenalty: 0,
        inputSchema: {
          required: ['text'],
          type: 'object',
          properties: {
            text: {
              type: 'string',
              description: 'Texto',
            },
          },
        },
      })
    );
  }

  async getAll(): Promise<Model<IdType>[]> {
    return this.models;
  }

  async get(modelId: IdType): Promise<Model<IdType>> {
    const model = this.models.find(model => model.id === modelId);

    if (model) {
      return model;
    }
    throw new ModelNotFoundError(`Model id: ${modelId} not found`);
  }

  async update(model: Model<IdType>): Promise<Model<IdType>> {
    const index = this.models.findIndex(item => item.id === model.id);

    if (index === -1)
      throw new ModelNotFoundError(`Model id: ${model.id} not found`);

    if (model.inputSchema) {
      try {
        await this.schemaProvider.validateSchema(model.inputSchema);
      } catch (error) {
        if (error instanceof Error)
          throw new InvalidInputSchemaError(error.message);

        throw new InvalidInputSchemaError();
      }
    }

    const updatedModel = Object.assign(this.models[index], model);

    this.models[index] = updatedModel;

    return updatedModel;
  }

  async save(model: Model<IdType>): Promise<Model<IdType>> {
    const index = this.models.findIndex(
      item => item.name === model.name || item.id === model.id
    );

    if (index > -1)
      throw new ModelAlreadyExistsError(
        `Model name: ${model.name} already exists`
      );

    if (model.inputSchema) {
      try {
        await this.schemaProvider.validateSchema(model.inputSchema);
      } catch (error) {
        if (error instanceof Error)
          throw new InvalidInputSchemaError(error.message);

        throw new InvalidInputSchemaError();
      }
    }

    const newModel = new Model(this.idProvider, model);

    this.models.push(newModel);

    return newModel;
  }

  async delete(modelId: IdType): Promise<void> {
    const index = this.models.findIndex(model => model.id === modelId);

    if (index === -1)
      throw new ModelNotFoundError(`Model id: ${modelId} not found`);

    this.models.splice(index, 1);
  }
}
