const db=require("../coSqlite3")
const HTM=require('../lib').html;

function VaildStringLength(name, max_len) {
    return {
        vaild: s => s.length <= max_len,
        error: `${name}不得超过${max_len}个字符`
    }
}

exports.Create = function * (req, res) {
    const body = req.body
    const vaildBookData = {
        bID: VaildStringLength("图书号", 30),
        bName: VaildStringLength("图书名", 30),
        bPub: VaildStringLength("出版社名称",30),
        bAuthor: VaildStringLength("作者名字",20),
        bMem: VaildStringLength("内容摘要",30),
    }
    for (key in vaildBookData) {
        console.log(vaildBookData[key].error)
    }
    for (key in body) {
        if (key in vaildBookData
            && !vaildBookData[key].vaild(body[key])) {
                return HTM(1, vaildBookData[key].error)
        }
    }
    return HTM(0, "注册成功!")
}