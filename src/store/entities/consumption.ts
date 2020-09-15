import Entity from './entity'

export default class Consumption extends Entity<number>{
    name:string;
    displayName:string;
    normalizedName:string;
    description:string;
    grantedPermissions:string[]
}