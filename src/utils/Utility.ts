import { XY } from './XY';

export class Utility{

    public static GenerateRandomPointInBox(min : XY, max: XY) : XY{
        var x1 : number = Utility.GenerateRandomNumberBetween(min.X, max.X);
        var y1 : number = Utility.GenerateRandomNumberBetween(min.Y, max.Y);
        return new XY(x1, y1);
    }

    public static GenerateRandomNumberBetween(lowerBound : number, upperBound: number) : number {
        var range : number = Math.abs(upperBound - lowerBound);
        return Math.floor(Math.random() * range) + lowerBound;
    }
}