export class XY {
    public static BasisX = new XY(1, 0);
    public static BasisY = new XY(0, 1);
    public static BasisXY = new XY(1, 1);

    public X: number;
    public Y: number;

    static getDistanceBetween(edgeStart: XY, edgeEnd: XY): number {
        const vec: XY = edgeStart.subtract(edgeEnd);
        return vec.getLength();
    }

    constructor(X: number, Y: number) {
        this.X = X;
        this.Y = Y;
    }

    public add(other: XY) {
        const newX = this.X + other.X;
        const newY = this.Y + other.Y;
        return new XY(newX, newY);
    }

    public subtract(other) {
        const newX = this.X - other.X;
        const newY = this.Y - other.Y;
        return new XY(newX, newY);
    }

    public multiply(scalar) {
        const newX = this.X * scalar;
        const newY = this.Y * scalar;
        return new XY(newX, newY);
    }

    public divide(scalar) {
        const newX = this.X / scalar;
        const newY = this.Y / scalar;
        return new XY(newX, newY);
    }

    public toString() {
        return 'X: ' + this.X + ', Y: ' + this.Y;
    }

    public getPolarAngleInDegree() {
        const angleInRadian = Math.atan2(this.Y, this.X);
        let angleInDegree = angleInRadian * (180 / Math.PI);

        if (angleInDegree <= 0) { // is negative or zero.
            if (Math.abs(angleInDegree) <= 5) { // in this case the angle can be in the range -5 to +5. We set it to 0, this test case captures when the vector angle is very 
                // close to 0. We need to set it to 0.
                angleInDegree = 0;
            } else {
                angleInDegree = 360 + angleInDegree;
            }
        }
        return angleInDegree;
    }

    public dotProduct(other: XY) {
        return this.X * other.X + this.Y + other.Y;
    }

    public isVectical() {
        const polarAngle = this.getPolarAngleInDegree();
        return (
                (Math.abs(polarAngle - 90) <= 3) ||
                (Math.abs(polarAngle - 270) <= 3)
            );
    }

    public crossProduct(other) {
        // cross product: we have two vectors, this and other. We need to find the cross product of this and other
        // it will be equal to
        // this.x * other.y - this.y * other.x
        return this.X * other.Y - this.Y * other.X;
    }

    public getLength() {
        return Math.sqrt(
            Math.pow(this.X, 2) + Math.pow(this.Y, 2)
        );
    }

    public getUnitVector() {
        const length = this.getLength();
        const unitVector = this.divide(length);
        return unitVector;
    }
}