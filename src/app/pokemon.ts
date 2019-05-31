export class Pokemon {
    id: number;
    names: string[];
    type1: string;
    type2: string;
    sprites: string[];
    stats: string[];
    descriptions: string[];

    constructor(pkmnNumber: number, pkmnNames: string[], pkmnType1?: string, pkmnType2?: string, pkmnSprites?: string[], pkmnStats?: string[], pkmnDescriptions?: string[]) {
        this.id = pkmnNumber;
        this.names = pkmnNames;
        this.type1 = pkmnType1;
        this.type2 = pkmnType2;
        this.sprites = pkmnSprites;
        this.stats = pkmnStats;
        this.descriptions = pkmnDescriptions;
    }

    display() {
        return ("N°"+this.id+" : "+this.names[0]);
    }

    setSprite(pkmnSprites: string[]) {
        this.sprites = pkmnSprites;
    }

    setDescriptions(pkmnDescriptions: string[]) {
        this.descriptions = pkmnDescriptions;
    }

    setNames(pkmnNames: string[]) {
        this.names = pkmnNames;
    }
}
