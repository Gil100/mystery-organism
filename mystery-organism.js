// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// factory Fn return an object
const pAequorFactory = (organismNum, dna) => {
  return {
    organism: organismNum,
    dna,

    mutate () {
      let randomBase = returnRandBase();      
      let rIndex  = Math.floor(Math.random() * this.dna.length);
      while (this.dna[rIndex] === randomBase) {
        randomBase = returnRandBase();
      }
      this.dna[rIndex] = randomBase;
      return this.dna;
    },

    compareDNA (otherOr) {
      let counter = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === otherOr.dna[i]) {
          counter += 1;
        }
      }
      let percentage = (100 * 
        (counter / this.dna.length)).toFixed(1);
      return `organism #${this.organism} & organism #${otherOr.organism}
have ${percentage}% DNA in common`;
    },

    willLikelySurvive () {
      let counter = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === 'G' || this.dna[i] === 'C') {
          counter += 1;
        }
      }
      percentage = 100 * (counter / this.dna.length);
      return percentage >= 60 ? true : false;
    },
    
    complementStrand () {
      for (let i = 0; i < this.dna.length; i++) {
        switch (this.dna[i]) {
          case 'A':
            this.dna[i] = 'T';
            break;
          case 'T':
            this.dna[i] = 'A';
            break;
          case 'C':
            this.dna[i] = 'G';
            break;
          case 'G':
            this.dna[i] = 'C';
            break;
        }

      }
          return this.dna; 
    },


  };

};
/**create 30 instances of pAequor */
let surviveOrganism = [];
let counterId = 1; // start Organism ID
while (surviveOrganism.length < 30) { // limit to 30 Organism 
  let newOrg = pAequorFactory(counterId, mockUpStrand());
  if (newOrg.willLikelySurvive() === true) {
    surviveOrganism.push(newOrg); // push() only if true
  }
  else {
    counterId++; 
  }
} 
console.log(surviveOrganism);

/* testing pAequorFactory Fn create an object test No.1*/
/*
let org1 = pAequorFactory(1,mockUpStrand());
let org2 = pAequorFactory(2,mockUpStrand());
console.log(org1);// print organism No.1 
console.log(org2); // print organism No.2
 */


/*  test mutate() Fn basic job test No2 */

/*
let org1 = pAequorFactory(1, ['A', 'T', 'C', 'G']);
console.log(org1.mutate());  //  replace one random base in org1.dna
 */

/**testing compareDNA Fn test No3*/

/*
let org1 = pAequorFactory(1, [
  'T', 'T', 'C', 'C',
  'T', 'A', 'G', 'A',
  'T', 'A', 'A', 'C',
  'A', 'G', 'A'
])
let org2 = pAequorFactory(2, [
  'T', 'C', 'T', 'A',
  'G', 'G', 'T', 'C',
  'A', 'G', 'T', 'G',
  'T', 'C', 'A'
])
console.log(org1.compareDNA(org2));  // print organism #1 & organism #2
//have 13.3% DNA in common as in the test org1 & org2 have only 
2 common Base in same index (.dna[0] & .dna[14]), 
2/15 * 100 = 13.3 (I use .toFixed(1) so only one digits
 after the decimal)
*/
 
/*testing willLikelySurvive Fn  test No.4 */
/**
let org1 = pAequorFactory(1, ['C', 'C', 'G', 'A']); 
console.log(org1);
console.log(org1.willLikelySurvive()); // print true as org1.dna 
//have 3/4 string  'C' || 'G' in it
*/

/** test complementStrand Fn challenge  

let org1 = pAequorFactory(1, mockUpStrand());
console.log(org1.dna);
console.log(org1.complementStrand());

*/





