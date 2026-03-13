export interface Meme {
    filename: string;   // e.g. "bongerlo.jpg"
    title: string;
    tags?: string[];
}

function shuffleArray(array:Meme[]):Meme[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

const memes: Meme[] = shuffleArray([
    { filename: ",alskld.jpg",                              title: "MCh, Schibzi",  tags: ["mch", "schibzi"] },
    { filename: ",masdla.jpg",                              title: "Bongerló",      tags: ["mch", "bongerlo"] },
    { filename: "0cbabae9-9a96-4567-bbec-08173b9d42ac.jpg", title: "Schibzi, mő",   tags: ["schibzi","mo"] },
    { filename: "0cbdbcfe-73d9-40b9-8039-de4f9d67b7cf.jpg", title: "Amikor CsWM",   tags: ["amikorcswm"] },
    { filename: "2c2447f6-e54c-46dd-a0a8-ac184926cbc8.jpg", title: "Schibzikli",   tags: ["schibzi"] },
    { filename: "2ec92891-0c77-498f-912c-686dfdb0ff52.jpg", title: "Schibzi, mő",   tags: ["schibzi","mo"] },
    { filename: "6c26407f-c60c-421f-9df4-54e0bc50797f.jpg", title: "Schibzi, ispan",   tags: ["schibzi","mch"] },
    { filename: "64ec73b5-944e-4287-98bd-f360cdf9f9be.jpg", title: "Amikor CsWM",   tags: ["amikorcswm"] },
    { filename: "67uasdnmas.jpg", title: "Random Bullshit",   tags: ["misc"] },
    { filename: "168f771b-09c8-4bcb-b4a8-b5db1eba60b0.jpg", title: "Amikor CsWM",   tags: ["amikorcswm"] },
    { filename: "490e23f0-42a3-4f4b-ba5e-9f58dd891864.jpg", title: "MCh StarWars",   tags: ["mch"] },
    { filename: "1947e28c18c2cf2cf5a6aa15f9002546.jpg", title: "MCh",   tags: ["mch"] },
    { filename: "2025-08-16-005835_551x763_scrot.png", title: "Chatgpt",   tags: ["misc"] },
    { filename: "9266b47b-8813-4329-8198-c572e847c65f.jpg", title: "Schibzikli",   tags: ["mch","schibzi","mo"] },
    { filename: "290197f9-5a4b-4495-b04c-2343d7c7b97f.jpg", title: "Mch",   tags: ["mch"] },
    { filename: "05372229-6a0c-453e-949f-a215a45bcf1f.jpg", title: "Pest",   tags: ["mch","mch2","pest"] },
    { filename: "20241220_144949.jpg", title: "Tabló",   tags: ["mch","mch2","collage"] },
    { filename: "20241223_231934.jpg", title: "Athén",   tags: ["mch","mch2","athen"] },
    { filename: "20241223_232848.jpg", title: "Ch x Tr",   tags: ["mch","mch2","tressanne"] },
    { filename: "20241223_233105.jpg", title: "Pest",   tags: ["mch","mch2","pest"] },
    { filename: "20241223_235350.jpg", title: "Szegény Júlio",   tags: ["júlio"] },
    { filename: "20250328_000627.jpg", title: "Athen",   tags: ["mch","athen"] },
    { filename: "20250705_215534.jpg", title: "Schibzi",   tags: ["mch","schibzi"] },
    { filename: "20250829_002450.jpg", title: "Júlio",   tags: ["júlio","mandula"] },
    { filename: "20250829_002634.jpg", title: "MCh 1",   tags: ["mch","schibzi"] },
    { filename: "20251007_000944h.jpg", title: "Amikor CsWM",   tags: ["amikorcswm","puzser"] },
    { filename: "20251010_090351.jpg", title: "Amikor CsWM",   tags: ["amikorcswm"] },
    { filename: "20251122_172232.jpg", title: "Tablo",   tags: ["collage"] },
    { filename: "57362397-554d-41f4-8c2d-96cfb292388e.jpg", title: "Göttinga",   tags: ["mch","gottinga"] },
    { filename: "1000001165.jpg", title: "tf is a bongerláb",   tags: ["mch","bongerló"] },

]);

export default memes;