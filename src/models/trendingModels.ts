import axios from 'axios';

export interface ModelMetadata {
    name: string;
    author: string;
    url: string;
}

export async function fetchTrendingModels(): Promise<ModelMetadata[]> {
    const response = await axios.get('https://huggingface.co/api/models?sort=downloads&direction=-1');
    const models = response.data.slice(0, 30).map((model: any) => ({
        name: model.modelId,
        author: model.author,
        url: `https://huggingface.co/${model.modelId}`
    }));
    return models;
}