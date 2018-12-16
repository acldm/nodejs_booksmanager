function* f() {
    for (let i = 0; true; i++) {
        let s = yield i
        if (s) i = -1
    }
}

let g = f()
console.log(g.next())
console.log(g.next())
console.log(g.next(1))