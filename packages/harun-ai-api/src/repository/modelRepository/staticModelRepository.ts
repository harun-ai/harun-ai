// import Model from '../../core/entities/Model';
// import ModelAlreadyExistsError from '../../core/errors/ModelAlreadyExistsError';
// import ModelNotFoundError from '../../core/errors/ModelNotFoundError';
// import IdProvider from '../../provider/idProvider/IdProvider';
// import IModelRepository from './IModelRepository';

// export default class StaticModelRepository implements IModelRepository {
//   private models: Model[] = [];

//   constructor(private idProvider: IdProvider) {
//     this.idProvider.generateId().then(id =>
//       this.models.push(
//         new Model({
//           id,
//           name: 'Atas de Reunião',
//           model: 'text-davinci-003',
//           description:
//             'Construir uma ata de reunião ou um relato de um encontro',
//           prompt:
//             'Converta minhas {{annotations}} em um {{type}} da reunião, escrita em primeira mão e crie uma lista de {{tasks}}',
//           temperature: 0,
//           maxTokens: 500,
//           topP: 1,
//           frequencyPenalty: 0,
//           presencePenalty: 0,
//           inputSchema: {
//             required: ['annotations', 'tasks', 'type'],
//             type: 'object',
//             properties: {
//               annotations: {
//                 type: 'string',
//                 description: 'Anotações',
//               },
//               tasks: {
//                 type: 'string',
//                 description: 'Tarefas',
//               },
//               type: {
//                 type: 'string',
//                 enum: ['relato', 'ata'],
//                 description: 'Tipo relato ou ata',
//               },
//             },
//           },
//         })
//       )
//     );
//     this.idProvider.generateId().then(id =>
//       this.models.push(
//         new Model({
//           id,
//           name: 'Explique a uma criança',
//           model: 'text-davinci-003',
//           description:
//             'Traduz texto difícil em conceitos mais simples.que até uma criança pode entender',
//           prompt: 'Resuma para uma criança: {{text}}',
//           temperature: 0.7,
//           maxTokens: 500,
//           topP: 1,
//           frequencyPenalty: 0,
//           presencePenalty: 0,
//           inputSchema: {
//             required: ['text'],
//             type: 'object',
//             properties: {
//               text: {
//                 type: 'string',
//                 description: 'Texto',
//               },
//             },
//           },
//         })
//       )
//     );
//   }

//   async getAll(): Promise<Partial<Model>[]> {
//     return this.models.map(item => {
//       return { id: item.id, name: item.name, descrtion: item.description };
//     });
//   }

//   async get(modelId: string): Promise<Model> {
//     const model = this.models.find(model => model.id === modelId);

//     if (model) {
//       return model;
//     }
//     throw new ModelNotFoundError(`Model id: ${modelId} not found`);
//   }

//   async update(model: Model): Promise<Model> {
//     const index = this.models.findIndex(item => item.id === model.id);

//     if (index === -1)
//       throw new ModelNotFoundError(`Model id: ${model.id} not found`);

//     this.models[index] = model;

//     return model;
//   }

//   async save(model: Model): Promise<Model> {
//     const index = this.models.findIndex(item => item.name === model.name);

//     if (index > -1)
//       throw new ModelAlreadyExistsError(
//         `Model name: ${model.name} already exists`
//       );

//     this.models.push(model);

//     return model;
//   }

//   async delete(modelId: string): Promise<void> {
//     const index = this.models.findIndex(model => model.id === modelId);

//     if (index === -1)
//       throw new ModelNotFoundError(`Model id: ${modelId} not found`);

//     this.models.splice(index, 1);
//   }
// }
