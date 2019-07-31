import { Utility } from './Utility';

export class IdGenerator{
    private largestNumber : number;
    private idsGenerated : {};

    constructor(largestNumber: number){
        this.largestNumber = largestNumber;
        this.idsGenerated = {};
    }
    
    generateNew(){
        var id;
        do{
            id = Utility.GenerateRandomNumberBetween(0, this.largestNumber);
        }while(this.idsGenerated[id] != null);
        return id;
    }

}