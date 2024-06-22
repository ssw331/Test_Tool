// triangle0.0.2.ts
// 改进版本，解决了边长过大和输入限制的问题
export function triangleType(a: number, b: number, c: number): string {
    if (a < 1 || b < 1 || c < 1 || a > 256 || b > 256 || c > 256) {
        return '输入错误';
    }
    if (a + b <= c || a + c <= b || b + c <= a) {
        return '非三角形';
    }
    if (a === b && b === c) {
        return '等边三角形';
    }
    if (a === b || b === c || a === c) {
        return '等腰三角形';
    }
    return '普通三角形';
}