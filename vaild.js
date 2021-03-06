const db=require("./coSqlite3")
const co = require("co")

exports.StringLength = function (name, max_len) {
    return {
        vaild: s => s.length <= max_len,
        error: `${name}不得超过${max_len}个字符`,
        status_code: 1,
    }
}

exports.SQLCheckNotExists = function (sql, sql_args, error) {
    return {
        vaild: function* () {
            let rows = yield db.execSQL(sql,sql_args)
            return rows.length === 0
        },
        error: error,
        status_code: 2
    }
}

exports.SQLCheckExists = function (sql, sql_args, error) {
    return {
        vaild: function* () {
            let rows = yield db.execSQL(sql,sql_args)
            return rows.length > 0
        },
        error: error,
        status_code: 2
    }
}

Type = {
    Number: num => /[^-0-9]/.test(num) == false
}

exports.Type = Type

//类型限制
exports.TypeCons = function(name, Type) {
    return {
        vaild: s => Type(s),
        error: `${name}类型不符合,应当是${Type.name}类型`,
        status_code: 2,
    }
}

exports.PlusNumber = function (name) {
    return {
        vaild: s => parseInt(s) > 0,
        error: `${name}不得为负数`,
        status_code: 2,
    }
}

exports.vaild = function* (body, vaildBody) {
    for (key in body) {
        //递归式解决问题
        if (key in vaildBody) {
            let vaildKey = vaildBody[key]
            let vaildVal = body[key]
            vaildKey = vaildKey instanceof Array ? vaildKey : [vaildKey]
            for (let v of vaildKey) {
                let vaild_result = false
                if (v.vaild.constructor.name === 'GeneratorFunction') {
                    vaild_result = yield v.vaild(vaildVal)
                } else {
                    vaild_result = v.vaild(vaildVal)
                }
                //console.log(vaild_result)
                if (vaild_result == false) {
                    return {
                        error: v.error,
                        status_code: v.status_code,
                    }
                }
            }
        }
    }

    return {
        error: 0
    }
}