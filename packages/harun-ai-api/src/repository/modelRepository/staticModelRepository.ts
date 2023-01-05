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
        description: 'Atas de Reunião',
        text: 'Atas de Reunião com {{variable}} variável',
        inputSchema: {
          required: ['annotations', 'tasks', 'reportOn', 'minutes'],
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
            reportOn: {
              type: 'boolean',
              description: 'Com relato',
            },
            minutes: {
              type: 'boolean',
              description: 'Com ata',
            },
          },
        },
      })
    );
    this.models.push(
      new Model(this.idProvider, {
        name: 'Explique a uma criança',
        description: 'Explique a uma criança',
        text: 'Explique a uma criança com {{variable}} variável',
        inputSchema: {
          type: 'object',
          required: ['text'],
          properties: {
            text: {
              type: 'string',
              description: 'Anotações',
            },
          },
        },
      })
    );
  }

  async getAll(): Promise<Model<IdType>[]> {
    return this.models.map(model => {
      return { id: model.id, name: model.name, description: model.description };
    });
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
