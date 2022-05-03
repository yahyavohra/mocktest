export const formatDate = (value) => {
    var split_var = value.split(' ')
    return split_var[0]
}

export const handleGetAllUnique = (posts, key) => {
    const uniqueData = posts.filter((e) => {
        return e[`${key}`] != null ? !(posts[e[`${key}`]] = e[`${key}`] in posts) : null
    })
    return uniqueData
}

export const cleanObj = (obj) => {
    for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '' || propName === 'page' || propName === 'page_size') {
            delete obj[propName];
        }
    }
    return obj
}

export const updateData = async (cleanValue, data) => {
    const filter_logger = data.filter((item) => {
        for (var key in cleanValue) {
            if (key == 'from_date' || key == 'to_date') {

                if (key == 'from_date' && key == 'to_date' && formatDate(item.creationTimestamp) < value.from_date || formatDate(item.creationTimestamp) > cleanValue.to_date) {
                    return false
                }
                else if (key == 'from_date') { return formatDate(item.creationTimestamp) >= cleanValue.from_date }
                else if (key == 'to_date') { return formatDate(item.creationTimestamp) <= cleanValue.to_date }

            } else {

                if (item[key] === undefined || item[key] != cleanValue[key]) {
                    return false
                }
            }
        }
        return true
    })
    return filter_logger
}