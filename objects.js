class Pet {
    constructor(name, age){
        // this means the object being constructed
        this.name = name;
        this.age = age;
    }

    introduceYourself() {
        console.log(`Hi my name is ${this.name}`);
    }
}

const kali = new Pet("kali", 8);
const khal = new Pet("khal", 7);


kali.introduceYourself();
khal.introduceYourself();



// const kaliName = ;
// const kaliAge = ;


// const kali = {
//     name:
// };