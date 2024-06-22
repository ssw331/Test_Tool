// triangle0.0.1.ts
// 初始版本，存在问题：对于三角形判断逻辑未完全准确，未考虑边长过大导致非三角形的情况
export function triangleType(a: number, b: number, c: number): string {
    if (a <= 0 || b <= 0 || c <= 0) {
        return '非三角形';
    }
    if (a >= b + c || b >= a + c || c >= a + b) {
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