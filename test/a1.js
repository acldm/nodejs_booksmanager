async function a() {
    let a = await 1 + 2
    let b = await a + 20
    return b
}

a().then(d => console.log(d))