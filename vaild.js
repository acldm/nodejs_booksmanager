exports.StringLength = function (name, max_len) {
    return {
        vaild: s => s.length <= max_len,
        error: `${name}不得超过${max_len}个字符`,
        status_code: 1,
    }
}


Type = {
    Number: num => /[^0-9]/.test(num) == false
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

exports.vaild = function (body, vaildBody) {
    for (key in body) {
        if (key in vaildBody) {
            let vaildKey = vaildBody[key]
            let vaildVal = body[key]
            vaildKey = vaildKey instanceof Array ? vaildKey : [vaildKey]
            for (let v of vaildKey) {
                if (!v.vaild(vaildVal)) {
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