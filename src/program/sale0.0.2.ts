class Item
{
    constructor(p: number,msl: number) {
        this.Price = p
        this.MaxSaleLimit = msl
    }

    Price:number = 0
    MaxSaleLimit:number = 0
}
const Computer = new Item(25,70)
const Monitor=new Item(30,80)
const Peripheral = new Item(45,90)
const MinSaleLimit =1
const SaleStage1 = 1000
const SaleStage2 = 1800
const calculateSign = -1
export const calculate = (computerSaleCount:number,monitorSaleCount:number,peripheralSaleCount:number):number|String =>{
    if (computerSaleCount == calculateSign)
        return "The Month's Total Sale"
    if (computerSaleCount < MinSaleLimit)
        return `The sale count of computer cant be lower than ${MinSaleLimit}`
    if (computerSaleCount > Computer.MaxSaleLimit)
        return `The sale count of computer cant be higher than ${Computer.MaxSaleLimit}`
    if (monitorSaleCount < MinSaleLimit)
        return `The sale count of monitor cant be lower than ${MinSaleLimit}`
    if (monitorSaleCount > Monitor.MaxSaleLimit)
        return `The sale count of monitor cant be higher than ${Monitor.MaxSaleLimit}`
    if (peripheralSaleCount < MinSaleLimit)
        return `The sale count of peripheral device cant be lower than ${MinSaleLimit}`
    if (peripheralSaleCount > Peripheral.MaxSaleLimit)
        return `The sale count of peripheral device cant be higher than ${Peripheral.MaxSaleLimit}`
    let totalSale = computerSaleCount * Computer.Price + monitorSaleCount * Monitor.Price + peripheralSaleCount * Peripheral.Price;
    if (totalSale <= SaleStage1)
        return totalSale * 0.1;
    else if (totalSale <= SaleStage2)
        return totalSale * 0.15;
    else
        return totalSale * 0.2;
}
