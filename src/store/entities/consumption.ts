import Entity from './entity'

export default class Consumption extends Entity<number>{
    petId:string;
    petName:string;
    cpaymentDetails: Object;
}