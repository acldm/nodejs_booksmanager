function* fib() {
    let [prev, curr] = [0, 1];
    for(;;) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

for (let n of fib()) {
    if (n > 1000) break
    console.log(n)
}