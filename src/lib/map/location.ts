import Decimal from "decimal.js";


export interface Location {
    latitude: Decimal;
    longitude: Decimal;
}


export const defaultLocation: Location = {
    latitude: new Decimal("16.71562636014437"),
    longitude: new Decimal("121.68327474089")
};