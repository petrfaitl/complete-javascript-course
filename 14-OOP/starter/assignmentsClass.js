'use strict';
///////// FUNCTION CONSTRUCTOR /////////////////
const Car = function (make, speed) {
    this.make = make;
    this.speed = speed;
}
Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(`${this.make} is now going ${this.speed}km/h.`);
    return this;
}
Car.prototype.brake = function () {
    this.speed -= 5;
    console.log(`${this.make} has braked and is now going ${this.speed}km/h.`);
    return this;
}

const bmw = new Car('BMW', 120);
const merc = new Car('Mercedes', 95);
// bmw.accelerate();
// bmw.accelerate();
// bmw.accelerate();
// bmw.brake();
// merc.accelerate();
// merc.accelerate();
// merc.accelerate();
// bmw.accelerate().accelerate().accelerate().brake();

const EV = function (make, speed, charge) {
    Car.call(this, make, speed);
    this.charge = charge;

}
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
    if (chargeTo < 0) return this;
    this.speed = 0;
    chargeTo > 100 ? this.charge = 100 : this.charge = chargeTo;

    console.log(`${this.make} has stopped and been charged to ${this.charge}%.`);
    return this;
}
EV.prototype.brake = function () {
    this.speed -= 15;
    this.charge += 2;
    console.log(`${this.make} has braked to ${this.speed}km/h and its charge is now ${this.charge}%.`);
    return this;
}

EV.prototype.accelerate = function () {
    this.speed += 20;
    this.charge--;
    console.log(`${this.make} has accelerated to ${this.speed}km/h and its charge is now ${this.charge}%.`);
    return this;
}
const tesla = new EV("Tesla", 120, 23);
// tesla.accelerate().brake().chargeBattery(90).accelerate();

////////// CLASS /////////////

class Car2 {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }

    get speed() {
        console.log(`${this.make} is going ${this._speed}km/h`);
        return this;
    }

    set speed(speed) {
        this._speed = speed;
    }

    get speedUS() {
        const usSpeed = this._speed / 1.6;
        console.log(`${this.make} is going ${usSpeed}mi/h`)

        return this;
    }

    set speedUS(speed) {
        this.speed = speed * 1.6;
    }

    accelerate() {
        this._speed += 10;
        console.log(`${this.make} has accelerated and is now going ${this._speed}km/h`);
        return this;
    }

    brake() {
        this._speed -= 5;
        console.log(`${this.make} has braked and is now going ${this._speed}km/h`);
        return this;
    }

    stop() {
        this._speed = 0;
        console.log(`${this.make} has stopped.`)
        return this;
    }

}

// console.log("////////// Car2 Class //////////////");
//
// const porsche = new Car2("Porsche", 180);
// porsche.speed;
// porsche.speed = 10;
// porsche.speed;
// porsche.accelerate().accelerate().brake().speedUS;
// porsche.speedUS = 200;
// porsche.accelerate().stop().accelerate().speedUS;
// ES6 Inheritance

class Sportscar extends Car2 {
    constructor(make, speed, topSpeed) {
        super(make, speed);
        this._topSpeed = topSpeed;
    }

    get topSpeed() {
        console.log(`${this.make} can go maximum ${this._topSpeed}km/h`);
        return this._topSpeed;
    }

    accelerate() {
        const accelerateBy = 10;
        if (this._speed + accelerateBy <= this._topSpeed) {
            this._speed += accelerateBy;
            console.log(`${this.make} has accelerated and is now going ${this._speed}km/h`);
        } else {
            this._speed = this._topSpeed;
            console.log(`${this.make} is now going at top speed of ${this._speed}km/h`);
        }
        return this;
    }
}

const ferrari = new Sportscar("Ferrari", 305, 340);
// ferrari.topSpeed;
// ferrari.speed;
// ferrari.accelerate().accelerate().accelerate().accelerate().accelerate().brake().accelerate();

class EVCl extends Car2 {
    #charge;

    constructor(make, speed, charge) {
        super(make, speed);
        this.#charge = charge;
    }

    accelerate() {
        this.#charge -= 10;
        super.accelerate();
        console.log(`${this.make} battery charge has decreased. It is now ${this.#charge}%`);

        return this;
    }

    brake() {
        this.chargeBattery(20)
        super.brake();
        console.log(`${this.make} battery charge has increased. It is now ${this.#charge}%`);
        return this;
    }

    chargeBattery(amount) {
        this.#charge += (this.#charge + amount >= 100) ? 100 - this.#charge : amount;
        console.log(`${this.make} battery is now ${this.#charge}%`);

        return this;
    }

}

const rivian = new EVCl("Rivian", 80, 80);
rivian.accelerate().brake().chargeBattery(10).chargeBattery(204)

// class Pace {
//
//     MI = 1.6;
//
//     constructor(runTime, distance, units = "km") {
//         this._verifiedTimeStr = this._verifyTime(runTime);
//         this._milliseconds = this._getMilliseconds(this._verifiedTimeStr);
//         // runDistance converted to base  unit = 1km
//         this.runDistance = units === "km" ? distance : distance * this.MI;
//         this._getPace();
//         this._getPaceMile();
//     }
//
//     get runTime() {
//         return this._verifiedTimeStr;
//     }
//
//     get milliseconds() {
//         return this._milliseconds;
//     }
//
//     get paceKm() {
//
//         return String(this._paceKm);
//
//     }
//
//     get paceMile() {
//
//         return this._paceMile;
//     }
//
//     _getTime(millis) {
//         // const hours = Math.trunc(millis / (60 * 60 * 1000));
//         // let remaining = millis % (60 * 60 * 1000);
//         // // console.log(hours, remaining);
//         //
//         // const minutes = Math.trunc(remaining / (60 * 1000));
//         // remaining = remaining % (60 * 1000);
//         // // console.log(minutes, remaining);
//         //
//         // const seconds = Math.trunc(remaining / 1000);
//         // remaining = remaining % (1000);
//         let seconds = Math.round(millis / 1000);
//         let minutes = Math.round(seconds / 60);
//         let hours = Math.round(minutes / 60);
//
//         seconds = seconds % 60;
//         minutes = minutes % 60;
//
//         console.log(hours, minutes, seconds);
//         let str = `${String(seconds).padStart(2, "0")}`;
//         str = minutes ? `${String(minutes).padStart(2, "0")}:` + str : str;
//         str = hours ? `${String(hours).padStart(2, "0")}:` + str : str;
//
//         return str;
//     }
//
//     _verifyTime(enteredTime) {
//         const re = /\d?\d:\d?\d:\d?\d|\d?\d:\d?\d|\d?\d/;
//         return (enteredTime.match(re))[0] || ["00"];
//     }
//
//     _getMilliseconds(time) {
//         const paddedTime = time.padStart(8, "00:");
//         const [hours, minutes, seconds] = paddedTime.split(":");
//         return hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;
//     }
//
//     _getPace() {
//         this.paceInMilli = Math.round(this._milliseconds / this.runDistance);
//         this._paceKm = this._getTime(this.paceInMilli);
//
//     }
//
//     _getPaceMile() {
//         this._paceMile = this.distanceTimeCalc(1.6);
//
//     }
//
//     distanceTimeCalc(distance) {
//
//         return this._getTime(this.paceInMilli * distance);
//     }
//
// }
//
// class Distance {
//     distances =
//         [
//             { name: "300m", distance: 0.3, units: "km" },
//             { name: "400m", distance: 0.4, units: "km" },
//             { name: "600m", distance: 0.6, units: "km" },
//             { name: "800m", distance: 0.8, units: "km" },
//             { name: "1km", distance: 1, units: "km" },
//             { name: "1200m", distance: 1.2, units: "km" },
//             { name: "1500m", distance: 1.5, units: "km" },
//             { name: "1600m", distance: 1.6, units: "km" },
//             { name: "1mi", distance: 1.60934, units: "km" },
//             { name: "3000m", distance: 3, units: "km" },
//             { name: "5k", distance: 5, units: "km" },
//             { name: "7k", distance: 7, units: "km" },
//             { name: "10k", distance: 10, units: "km" },
//             { name: "Half Marathon", distance: 21.097, units: "km" },
//             { name: "Marathon", distance: 42.195, units: "km" },
//             { name: "100k", distance: 100, units: "km" },
//             { name: "Miler", distance: 160.934, units: "km" },
//         ];
//
//     constructor(Pace) {
//         this.setCalculatedTime(Pace);
//     }
//
//     getAllDistances() {
//         return this.distances.map(d => d.name);
//     }
//
//     getAllTimes() {
//         return (this.distances.map(d => [d.name, d.time]))
//     }
//
//     getDistanceByName(key) {
//         return (this.distances.find(d => d.name === key)).distance;
//     }
//
//     getTimeByName(key) {
//         return (this.distances.find(d => d.name === key))?.time ?? "Cannot" +
//             " find specified runDistance";
//     }
//
//     setCalculatedTime(Pace) {
//         this.distances.forEach(d => {
//
//             d["time"] = Pace.distanceTimeCalc(d.distance);
//
//         });
//     }
// }

// console.log("/////////// Pace Converter ///////////////");
//
// const myPace = new Pace("12:18", 3, "km");
// const myDist = new Distance(myPace);
// console.log(myPace.paceInMilli);
//
// const myDist2 = new Distance(new Pace("1:25:00", 21.097, "km"));
// console.log(myDist2.getAllTimes());
// console.log(new Date(241741).toISOString());

// console.log(myDist2.getAllDistances());
// console.log(myDist.getAllDistances());
// console.log(myDist.getDistanceByName("Half Marathon"));
// console.log("5k", myDist.getTimeByName("5k"));
// console.log("Half Mara", myDist.getTimeByName("Half Marathon"));
// console.log("Pace min/km", myPace.paceKm);
// console.log("Pace min/mi", myPace.paceMile);