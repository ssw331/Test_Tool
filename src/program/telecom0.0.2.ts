export function telecom(monthlyMinutes: number, overduePayments: number): number {
    // 基本月租费
    const baseFee = 25;
    // 每分钟通话费
    const perMinuteFee = 0.15;

    // 通话时间段的最大容许不按时缴费次数和折扣率
    const discountRates = [
        { maxMinutes: 60, maxOverdue: 1, discount: 0.01 },
        { maxMinutes: 120, maxOverdue: 2, discount: 0.015 },
        { maxMinutes: 180, maxOverdue: 3, discount: 0.02 },
        { maxMinutes: 300, maxOverdue: 3, discount: 0.025 },
        { maxMinutes: 43000, maxOverdue: 6, discount: 0.03 }
    ];
    if(monthlyMinutes>43000||monthlyMinutes<0||overduePayments<0||overduePayments>11){
        return -1;
    }
    // 计算实际通话费
    const actualCallFee = monthlyMinutes * perMinuteFee;
    let discount = 0;

    // 确定折扣率
    for (const rate of discountRates) {
        if (monthlyMinutes <= rate.maxMinutes) {
            if (overduePayments <= rate.maxOverdue) {
                discount = rate.discount;
            }
            break;
        }
    }

    // 计算折扣后的通话费
    const discountedCallFee = actualCallFee * (1 - discount);

    // 总费用 = 基本月租费 + 折扣后的实际通话费
    const totalFee = baseFee + discountedCallFee;

    return totalFee;
}