export class XY{
    public X : number;
    public Y : number;

    constructor(X: number, Y:number){
        this.X = X;
        this.Y = Y;
    }

    public add(other:XY){
        var newX = this.X + other.X;
        var newY = this.Y + other.Y;
        return new XY(newX, newY);
    }

    public subtract(other){
        var newX = this.X - other.X;
        var newY = this.Y - other.Y;
        return new XY(newX, newY);
    }

    public multiply(scalar){
        var newX = this.X * scalar;
        var newY = this.Y * scalar;
        return new XY(newX, newY);
	}

    public divide(scalar){
        var newX = this.X / scalar;
        var newY = this.Y / scalar;
        return new XY(newX, newY);
	}
	
    public toString(){
        return "X: "+ this.X +", Y: "+ this.Y;
    }

    public getPolarAngleInDegree(){
        var angleInRadian = Math.atan2(this.Y, this.X);
        var angleInDegree = angleInRadian * (180 / Math.PI);

        if (angleInDegree <= 0)
        { //is negative or zero. 
            if (Math.abs(angleInDegree) <= 5)
            { // in this case the angle can be in the range -5 to +5. We set it to 0, this test case captures when the vector angle is very 
                // close to 0. We need to set it to 0. 
                angleInDegree = 0;
            }
            else
            { 
                angleInDegree = 360 + angleInDegree;
            }
        }
        return angleInDegree;
    }

    public dotProduct(other){
        var dotProd = this.X*other.X + this.Y + other.Y;
    }

    public isVectical(){
        var polarAngle = this.getPolarAngleInDegree();
        return ( 
                (Math.abs(polarAngle - 90) <= 3) ||
                (Math.abs(polarAngle - 270) <= 3)
            );
    }

    public crossProduct = function(other){
        // cross product: we have two vectors, this and other. We need to find the cross product of this and other
        // it will be equal to 
        // this.x * other.y - this.y * other.x
        return this.X * other.Y - this.Y * other.X;
    }

    public getLength = function(){
        return Math.sqrt(
            Math.pow(this.X, 2) + Math.pow(this.Y, 2)
        );
    }

    public getUnitVector = function(){
        var length = this.getLength();
        var unitVector = this.divide(length);
        return unitVector;
    }
}