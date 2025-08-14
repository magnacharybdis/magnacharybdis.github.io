import _poems from './poems.json'

export default interface Poem {
    title: string;
    verses: string[];
}

export const allPoems: Poem[] = _poems
