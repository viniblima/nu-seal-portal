export class Seal {
    id: string;
    createdAt: Date;
    isValid: boolean;
    numSeal: number;
    updatedAt: Date;
    numSealText: string;

    constructor(json: SealInterface) {
        this.createdAt = new Date(json.createdAt);
        this.id = json.id;
        this.isValid = json.isValid;
        this.numSeal = json.numSeal;
        this.updatedAt = new Date(json.updatedAt);
        this.numSealText = this.convertSealText(json.numSeal);
    }

    convertSealText(num: number): string {
        let result: string = "";
        const numConverted = num.toString().split("");

        if (num > 9999999) {
            result = `${numConverted[0]}${numConverted[1]}.${numConverted[2]}${numConverted[3]}${numConverted[4]}.${numConverted[5]}${numConverted[6]}${numConverted[7]}`;
        } else if (num > 999999) {
            result = `${numConverted[0]}.${numConverted[1]}${numConverted[2]}${numConverted[3]}.${numConverted[4]}${numConverted[5]}${numConverted[6]}`
        } else if (num > 99999) {
            result = `${numConverted[0]}${numConverted[1]}${numConverted[2]}.${numConverted[3]}${numConverted[4]}${numConverted[5]}`
        } else if (num > 9999) {
            result = `0${numConverted[0]}${numConverted[1]}.${numConverted[2]}${numConverted[3]}${numConverted[4]}`
        } else if (num > 999) {
            result = `00${numConverted[0]}.${numConverted[1]}${numConverted[2]}${numConverted[3]}`
        } else if (num > 99) {
            result = `000.${numConverted[0]}${numConverted[1]}${numConverted[2]}`
        } else if (num > 9) {
            result = `000.0${numConverted[0]}${numConverted[1]}`
        } else {
            result = `000.00${numConverted[0]}`
        }

        return result;
    }

}

export interface SealInterface {
    createdAt: string;
    id: string;
    isValid: boolean;
    numSeal: number;
    updatedAt: string;
}