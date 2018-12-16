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
        bID: [Vaild.StringLength("图书号", 30), 
                Vaild.SQLCheckExists('select * from books where bID = ?', [body.bID],"图书号已存在!")],
        bName: Vaild.StringLength("图书名", 30),
        bPub: Vaild.StringLength("出版社名称",30),
        bAuthor: Vaild.StringLength("作者名字",20),
        bMem: Vaild.StringLength("内容摘要",30),
        bCnt: Vaild.TypeCons("数量", Type.Number)
    }
    data = Vaild.vaild(body, vaildBookData)
    //let rows = co(yield db.execSQL("select * from books",[]));
    //error==0:通过验证
    if (data.error == 0) {
        //构建sql语句
        return HTM(0, "注册成功!")
    } else {
        return HTM(data.status_code, data.error)
    }
}