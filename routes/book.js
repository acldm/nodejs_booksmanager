const db=require("../coSqlite3")
const HTM=require('../lib').html;
const Vaild = require('../vaild')
const Type = require('../vaild').Type
const co = require("co")

function VaildStringLength(name, max_len) {
    return {
        vaild: s => s.length <= max_len,
        error: `${name}不得超过${max_len}个字符`
    }
}

exports.Create = function * (req, res) {
    const body = req.body
    const vaildBookData = {
        bID: [Vaild.StringLength("图书号", 30), Vaild.SQLCheckNotExists('select * from books where bID = ?', [body.bID],"图书号已存在!")],
        bName: Vaild.StringLength("图书名", 30),
        bPub: Vaild.StringLength("出版社名称",30),
        bAuthor: Vaild.StringLength("作者名字",20),
        bMem: Vaild.StringLength("内容摘要",30),
        bCnt: [Vaild.TypeCons("数量", Type.Number), Vaild.PlusNumber("数量")],
    }
    
    let data = yield Vaild.vaild(body, vaildBookData)

    if (data.error == 0) {
        //构建sql语句
        sql = "INSERT INTO books(bID, bName, bPub, bDate, bAuthor, bMem, bCnt) VALUES (?, ?, ?, ?, ?, ?, ?)"
        yield db.execSQL(sql, [body.bID, body.bName, body.bPub, body.bDate,  body.bAuthor, body.bMem, body.bCnt])
        return HTM(0, "新建书籍成功!")
    } else {
        return HTM(data.status_code, data.error)
    }
    //let rows = co(yield db.execSQL("select * from books",[]));
    //error==0:通过验证
}

exports.addBookCnt = function* (req, res) {
    const body = req.body
    const vailds = {
        bID: [Vaild.StringLength("图书号", 30), Vaild.SQLCheckExists('select * from books where bID = ?', [body.bID],"图书号不存在!")],
        bCnt: [Vaild.TypeCons("数量", Type.Number), Vaild.PlusNumber("数量")]
    }

    let data = yield Vaild.vaild(body, vailds)
    if (data.error == 0) {
        sql = "UPDATE books SET bCnt = bCnt + ? where bID = ?"
        let bCntVal = parseInt(body.bCnt)
        // console.log(bCntVal)
        yield db.execSQL(sql, [bCntVal, body.bID])
        return HTM(0, "更新数量成功!")
    } else {
        return HTM(data.status_code, data.error)
    }
}

exports.subBookCnt = function* (req, res) {
    const body = req.body
}