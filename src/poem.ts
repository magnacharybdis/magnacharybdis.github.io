import _poems from './poems.json'

export default interface Poem {
    title: string;
    verses: string[];
    score: number;
}
export interface ExtendedPoem {
    title: string;
    verses: string[];
    rating: any[];
}

export const allPoems: Poem[] = _poems
export const mch1Poems = allPoems.filter(poem => poem.title.endsWith("MCh I"))
export const mch2Poems = allPoems.filter(poem => poem.title.endsWith("MCh II"))
export const tressanPoems = allPoems.filter(poem => poem.title.endsWith("- Treßan"))
export const bestPoems = allPoems.filter(poem => poem.score < 3 && poem.score !== 0)
export const worstPoems = allPoems.filter(poem => poem.score > 3)
