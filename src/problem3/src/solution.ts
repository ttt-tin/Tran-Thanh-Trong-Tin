// Implementation 1: Simply using iterative (O(n))
export function sum_to_n_a(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

// Implementation 2: Recursive approach (O(n))
export function sum_to_n_b(n: number): number {
    if (n <= 0) return 0; // Base case
    return n + sum_to_n_c(n - 1);
}

// Implementation 3: Optimal implementation using mathematical formula (O(1))
export function sum_to_n_c(n: number): number {
    return (n * (n + 1)) / 2;
}